package com.admin.the_climbing_night.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.admin.the_climbing_night.common.Constants;
import com.admin.the_climbing_night.utils.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserDetailsServiceByJwt userDetailsServiceByJwt;
    private final JwtTokenProvider jwtTokenProvider;
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

        String accessToken = request.getHeader("accessToken");

        // JWT가 있는 경우
        if (accessToken != null) {
            // JWT 유효성 검증
            if (jwtTokenProvider.validateToken(accessToken)) {
                // 유저와 토큰 일치 시 userDetails 생성
                UserDetails userDetails = userDetailsServiceByJwt.loadUserByUsername(accessToken);

                if (userDetails != null) {
                    // UserDetsils, Password, Role -> 접근권한 인증 Token 생성
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null,
                            userDetails.getAuthorities());

                    // 현재 Request의 Security Context에 접근권한 설정
                    SecurityContextHolder.getContext()
                            .setAuthentication(usernamePasswordAuthenticationToken);
                } else {
                    // TODO: access token 유효성 검사 성공, 실패시 로직 구현 필요
                    // 성공: token들 새로 생성 후 내려주기
                    // 실패: 토큰들 제거 (local storage, db)
                    response.addCookie(new Cookie("refreshToken", ""));
                }
            } else {
                // TODO: access token 유효성 검사 성공, 실패시 로직 구현 필요
                // 성공: token들 새로 생성 후 내려주기
                // 실패: 토큰들 제거 (local storage, db)
                response.addCookie(new Cookie("refreshToken", ""));
            }
        }

        filterChain.doFilter(request, response); // 다음 필터로 넘기기
    }
}
