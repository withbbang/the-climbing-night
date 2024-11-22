package com.admin.the_climbing_night.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.SingleResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class LogoutRestController {

    /**
     * 로그아웃
     * 
     * @param response
     * @return
     */
    @PostMapping(value = "logout")
    public SingleResponse logout(HttpServletResponse response) {
        SingleResponse responseBody = new SingleResponse();

        Cookie refreshToken = new Cookie("refreshToken", null);

        refreshToken.setMaxAge(0);

        response.addCookie(refreshToken);

        return responseBody;
    }
}