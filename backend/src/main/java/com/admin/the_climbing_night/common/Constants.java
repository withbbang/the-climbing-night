package com.admin.the_climbing_night.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public final class Constants {
    @Value("${spring.profiles.active}")
    private String profile;

    public static String[] AUTH_WHITELIST;

    @PostConstruct
    public void init() {
        AUTH_WHITELIST = "local".equals(profile)
                ? new String[] { "/**" }
                : new String[] { "/api/login", "/api/test", "/api/join",
                        "/api/get-member-info-by-join" };
    }

    public static String[] getAuthWhitelist() {
        return AUTH_WHITELIST;
    }

    // 개발 환경마다 JWT 인가 확인 분기 필요 없을 때 사용
    // public static final String[] AUTH_WHITELIST = new String[] { "/api/login",
    // "/api/test", "/api/join",
    // "/api/get-member-info-by-join" };
}
