package com.admin.the_climbing_night.configs;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.admin.the_climbing_night.common.Constants;
import com.admin.the_climbing_night.jwt.JwtAccessDeniedHandler;
import com.admin.the_climbing_night.jwt.JwtAuthFilter;
import com.admin.the_climbing_night.jwt.JwtAuthenticationEntryPoint;
import com.admin.the_climbing_night.jwt.JwtTokenProvider;
import com.admin.the_climbing_night.jwt.UserDetailsServiceByJwt;
import com.admin.the_climbing_night.utils.CookieUtil;
import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig {
        private final UserDetailsServiceByJwt userDetailsServiceByJwt;
        private final JwtTokenProvider jwtTokenProvider;
        private final ModelMapper modelMapper;
        private final CookieUtil cookieUtil;

        private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
        private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                // CSRF, CORS
                http.csrf((csrf) -> csrf.disable());
                http.cors(Customizer.withDefaults());

                // 세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 X
                http.sessionManagement(sessionManagement -> sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                // FormLogin, BasicHttp 비활성화
                http.formLogin((form) -> form.disable());
                http.httpBasic(AbstractHttpConfigurer::disable);

                // JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
                http.addFilterBefore(
                                new JwtAuthFilter(userDetailsServiceByJwt, jwtTokenProvider, modelMapper,
                                                cookieUtil),
                                UsernamePasswordAuthenticationFilter.class);

                http.exceptionHandling((exceptionHandling) -> exceptionHandling
                                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                                .accessDeniedHandler(jwtAccessDeniedHandler));

                // 권한 규칙 작성
                http.authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(Constants.AUTH_WHITELIST).permitAll()
                                // PreAuthrization 사용하여 특정 컨트롤러에 인증 로직을 통과하게끔 하고
                                // 나머지는 모두 패스하는 방식
                                // .anyRequest().permitAll()
                                // 화이트 리스트를 제와한 모든 요청들에 인증 로직을 거치는 방식
                                .anyRequest().authenticated());

                return http.build();
        }
}
