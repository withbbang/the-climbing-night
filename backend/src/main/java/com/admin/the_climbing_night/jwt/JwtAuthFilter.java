package com.admin.the_climbing_night.jwt;

import java.io.IOException;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Constants;
import com.admin.the_climbing_night.common.CustomException;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.jwt.service.JwtService;
import com.admin.the_climbing_night.jwt.vo.JwtTokenVo;
import com.admin.the_climbing_night.utils.CommonUtil;
import com.admin.the_climbing_night.utils.CookieUtil;
import com.admin.the_climbing_night.utils.TokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserDetailsServiceByJwt userDetailsServiceByJwt;
    private final JwtTokenProvider jwtTokenProvider;
    private final ModelMapper modelMapper;
    private final CookieUtil cookieUtil;
    private final TokenUtil tokenUtil;
    private final JwtService jwtService;

    /**
     * JWT 토큰 검증 필터 수행
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        boolean shouldCheckRefreshToken = false; // Refresh Token 검증 플래그
        boolean shouldRegenerateToken = false; // Token 재생성 플래그

        // 화이트리스트 스킵
        for (String uri : Constants.AUTH_WHITELIST) {
            if (requestURI.equals(uri)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        GetIsLoggedInVo vo = null;
        String accessToken = null;

        try {
            accessToken = request.getHeader("Authorization").replace("Bearer", "").strip();

            log.info("[JwtAuthFilter doFilterInternal] accessToken : {}", accessToken);

            // JWT가 있는 경우
            if (!CommonUtil.isEmpty(accessToken)) {
                // JWT 유효성 검증
                if (jwtTokenProvider.validateToken(accessToken)) {
                    vo = userDetailsServiceByJwt.getIsLoggedIn(accessToken);

                    if (CommonUtil.isEmpty(vo)) {
                        log.error("[JwtAuthFilter doFilterInternal] No Admin");
                        throw new UsernameNotFoundException("Admin Not Found");
                    }

                    UserDetailsByJwt useDetailsByJwt = new UserDetailsByJwt(modelMapper.map(vo, GetIsLoggedInVo.class));

                    // 토큰 생성 및 SecurityContext 설정
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            useDetailsByJwt, null, useDetailsByJwt.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } else {
                throw new CustomException(CodeMessage.ER0030);
            }
        } catch (UsernameNotFoundException e) {
            log.error("[JwtAuthFilter doFilterInternal] UsernameNotFoundException: {}",
                    CodeMessage.ER1000.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER1000, HttpServletResponse.SC_OK);
            return;
        } catch (IllegalArgumentException e) {
            log.error("[JwtAuthFilter doFilterInternal] IllegalArgumentException: {}",
                    CodeMessage.ER1001.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER1001, HttpServletResponse.SC_OK);
            return;
        } catch (MalformedJwtException e) {
            log.error("[JwtAuthFilter doFilterInternal] MalformedJwtException: {}",
                    CodeMessage.ER1002.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER1002, HttpServletResponse.SC_OK);
            return;
        } catch (ExpiredJwtException e) {
            // Refresh Token 유효성 검증을 위한 플래그 변경
            shouldCheckRefreshToken = true;
        } catch (UnsupportedJwtException e) {
            log.error("[JwtAuthFilter doFilterInternal] UnsupportedJwtException: {}",
                    CodeMessage.ER1004.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER1004, HttpServletResponse.SC_OK);
            return;
        } catch (CustomException e) {
            log.error("[JwtAuthFilter doFilterInternal] accessToken is Empty");
            sendErrorCustomResponse(response, CodeMessage.ER0030, HttpServletResponse.SC_OK);
            return;
        } catch (Exception e) {
            log.error("[JwtAuthFilter doFilterInternal] Exception: {}",
                    e.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER9999, HttpServletResponse.SC_OK);
            return;
        }

        // Access Token 만료, Refresh Token 검증
        if (shouldCheckRefreshToken) {
            try {
                jwtTokenProvider.validateToken(cookieUtil.getCookie(request, "refreshToken"));
                shouldRegenerateToken = true;
            } catch (IllegalArgumentException e) {
                log.error("[JwtAuthFilter doFilterInternal] IllegalArgumentException: {}",
                        CodeMessage.ER1001.getMessage());
                sendErrorCustomResponse(response, CodeMessage.ER1001, HttpServletResponse.SC_OK);
                return;
            } catch (MalformedJwtException e) {
                log.error("[JwtAuthFilter doFilterInternal] MalformedJwtException: {}",
                        CodeMessage.ER1002.getMessage());
                sendErrorCustomResponse(response, CodeMessage.ER1002, HttpServletResponse.SC_OK);
                return;
            } catch (ExpiredJwtException e) {
                log.error("[JwtAuthFilter doFilterInternal] ExpiredJwtException: {}",
                        CodeMessage.ER1003.getMessage());
                sendErrorCustomResponse(response, CodeMessage.ER1003, HttpServletResponse.SC_OK);
                return;
            } catch (UnsupportedJwtException e) {
                log.error("[JwtAuthFilter doFilterInternal] UnsupportedJwtException: {}",
                        CodeMessage.ER1004.getMessage());
                sendErrorCustomResponse(response, CodeMessage.ER1004, HttpServletResponse.SC_OK);
                return;
            } catch (Exception e) {
                log.error("[JwtAuthFilter doFilterInternal] Exception: {}",
                        e.getMessage());
                sendErrorCustomResponse(response, CodeMessage.ER9999, HttpServletResponse.SC_OK);
                return;
            } finally {
                if (shouldRegenerateToken) {
                    vo = userDetailsServiceByJwt.getIsLoggedIn(accessToken);

                    if (CommonUtil.isEmpty(vo)) {
                        log.error("[JwtAuthFilter doFilterInternal] No Admin");
                        throw new UsernameNotFoundException("Admin Not Found");
                    }

                    UserDetailsByJwt useDetailsByJwt = new UserDetailsByJwt(modelMapper.map(vo, GetIsLoggedInVo.class));

                    // 토큰 생성 및 SecurityContext 설정
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            useDetailsByJwt, null, useDetailsByJwt.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } else {
                    return;
                }
            }
        }

        JwtTokenVo tokenUtilVo = new JwtTokenVo();
        tokenUtilVo.setMemberId(vo.getMemberId());
        tokenUtilVo.setGrade(vo.getGrade());
        tokenUtilVo.setName(vo.getName());

        Map<String, String> token = tokenUtil.makeToken(tokenUtilVo);
        String newAccessToken = token.get("accessToken");

        tokenUtilVo.setAccessToken(newAccessToken);

        int updateAdminForRequest = 0;

        try {
            updateAdminForRequest = jwtService.updateAdminForRequest(tokenUtilVo);
        } catch (Exception e) {
            log.error("[JwtAuthFilter doFilterInternal] Access Token Update Error: {}",
                    e.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER9999,
                    HttpServletResponse.SC_OK);
            return;
        }

        if (updateAdminForRequest < 1) {
            log.error("[JwtAuthFilter doFilterInternal] UsernameNotFoundException: {}",
                    CodeMessage.ER1000.getMessage());
            sendErrorCustomResponse(response, CodeMessage.ER1000,
                    HttpServletResponse.SC_OK);
            return;
        }

        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

        try {
            filterChain.doFilter(request, responseWrapper);
            sendSuccessCustomResponse(responseWrapper, newAccessToken);
        } finally {
            response.addCookie(cookieUtil.setCookie("refreshToken", token.get("refreshToken")));
            responseWrapper.copyBodyToResponse();
        }
    }

    /**
     * 인가 확인 실패 시 커스텀 응답 만들기
     * 
     * @param response
     * @param codeMessage
     * @param statusCode
     * @throws IOException
     */
    private void sendErrorCustomResponse(HttpServletResponse response, CodeMessage codeMessage, int statusCode)
            throws IOException {
        // 커스텀 응답 만들기
        SingleResponse responseBody = new SingleResponse<>();
        responseBody.setResult(new Result(codeMessage));
        responseBody.setData(null);

        // TODO: admin accessToken update 설정 할까 말까 필요

        // 응답값 설정
        response.addCookie(cookieUtil.setCookie("refreshToken", null));
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
        response.getWriter().flush();
    }

    /**
     * 인가 확인 성공 시 커스텀 응답 만들기
     * 
     * @param responseWrapper
     * @param newAccessToken
     * @throws IOException
     */
    private void sendSuccessCustomResponse(ContentCachingResponseWrapper responseWrapper, String newAccessToken)
            throws IOException {
        byte[] responseContent = responseWrapper.getContentAsByteArray();
        String originalResponseBody = new String(responseContent, responseWrapper.getCharacterEncoding());

        // 기존 응답 본문을 SingleResponse 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        SingleResponse<?> existingResponse = objectMapper.readValue(originalResponseBody, SingleResponse.class);

        // 새로운 accessToken 설정
        existingResponse.setAccessToken(newAccessToken);

        // 수정된 응답 본문을 JSON으로 변환
        String jsonResponse = objectMapper.writeValueAsString(existingResponse);

        // 응답 버퍼 초기화
        responseWrapper.resetBuffer();
        responseWrapper.setContentType("application/json");
        responseWrapper.getWriter().write(jsonResponse);
        responseWrapper.getWriter().flush();

        log.info("Real Response Body: {}", jsonResponse);
    }
}
