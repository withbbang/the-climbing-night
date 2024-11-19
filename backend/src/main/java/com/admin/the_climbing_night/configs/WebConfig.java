package com.admin.the_climbing_night.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${spring.profiles.active}")
    private String profile;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if ("local".equals(profile)) {
            registry.addMapping("/**")
                    .allowedOriginPatterns("*") // “*“같은 와일드카드를 사용
                    .allowedMethods("GET", "POST") // 허용할 HTTP method
                    .allowCredentials(true); // 쿠키 인증 요청 허용
        }
    }
}