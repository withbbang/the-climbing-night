package com.admin.the_climbing_night.jwt;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Constants;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;
import com.admin.the_climbing_night.utils.CookieUtil;
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

    /**
     * JWT 토큰 검증 필터 수행
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        // Skip filter for whitelisted URIs
        for (String uri : Constants.AUTH_WHITELIST) {
            if (requestURI.equals(uri)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        GetIsLoggedInVo vo = null;

        try {
            String accessToken = request.getHeader("Authorization").replace("Bearer ", "");

            // JWT가 있는 경우
            if (!CommonUtil.isEmpty(accessToken)) {
                // JWT 유효성 검증
                if (jwtTokenProvider.validateToken(accessToken)) {
                    vo = userDetailsServiceByJwt.getIsLoggedIn(accessToken);

                    if (CommonUtil.isEmpty(vo)) {
                        throw new UsernameNotFoundException("Admin Not Found");
                    }

                    UserDetailsByJwt useDetailsByJwt = new UserDetailsByJwt(modelMapper.map(vo, GetIsLoggedInVo.class));

                    // Create authentication token and set it in SecurityContext
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            useDetailsByJwt, null, useDetailsByJwt.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } else {
                    throw new IllegalArgumentException("Invalid Access Token");
                }
            } else {
                throw new IllegalArgumentException("Invalid Access Token");
            }
        } catch (UsernameNotFoundException e) {
            // TODO: access token 유효성 검사 성공시 로직 구현 필요
            // 실패: 토큰들 제거 (local storage, db)
            sendErrorCustomResponse(response, CodeMessage.ER1000, HttpServletResponse.SC_OK);
            return; // Stop the filter chain here
        } catch (IllegalArgumentException e) {
            // TODO: access token 유효성 검사 성공시 로직 구현 필요
            // 실패: 토큰들 제거 (local storage, db)
            sendErrorCustomResponse(response, CodeMessage.ER1001, HttpServletResponse.SC_OK);
            return; // Stop the filter chain here
        } catch (MalformedJwtException e) {
            // TODO: access token 유효성 검사 성공시 로직 구현 필요
            // 실패: 토큰들 제거 (local storage, db)
            sendErrorCustomResponse(response, CodeMessage.ER1002, HttpServletResponse.SC_OK);
            return; // Stop the filter chain here
        } catch (ExpiredJwtException e) {
            // TODO: access token 유효성 검사 성공시 로직 구현 필요
            // 실패: 토큰들 제거 (local storage, db)
            sendErrorCustomResponse(response, CodeMessage.ER1003, HttpServletResponse.SC_OK);
            return; // Stop the filter chain here
        } catch (UnsupportedJwtException e) {
            // TODO: access token 유효성 검사 성공시 로직 구현 필요
            // 실패: 토큰들 제거 (local storage, db)
            sendErrorCustomResponse(response, CodeMessage.ER1004, HttpServletResponse.SC_OK);
            return; // Stop the filter chain here
        } catch (Exception e) {
            // TODO: access token 유효성 검사 성공시 로직 구현 필요
            sendErrorCustomResponse(response, CodeMessage.ER9999, HttpServletResponse.SC_OK);
            return; // Stop the filter chain here
        }

        filterChain.doFilter(request, response); // 다음 필터로 넘기기
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
}
