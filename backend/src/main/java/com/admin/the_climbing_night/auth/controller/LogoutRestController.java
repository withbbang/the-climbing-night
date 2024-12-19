package com.admin.the_climbing_night.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.service.LogoutService;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class LogoutRestController {
    @Autowired
    private LogoutService logoutService;

    /**
     * 로그아웃
     * 
     * @param response
     * @return
     */
    @PostMapping(value = "logout")
    public SingleResponse logout(HttpServletRequest request, HttpServletResponse response) {
        SingleResponse responseBody = new SingleResponse();

        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");

        if (CommonUtil.isEmpty(accessToken)) {
            log.error("No accessToken");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        int logout = 0;

        try {
            logout = logoutService.updateAdminForLogin(accessToken);
        } catch (Exception e) {
            log.error(e.getMessage());
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        if (logout < 1) {
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        Cookie refreshToken = new Cookie("refreshToken", null);

        refreshToken.setMaxAge(0);

        response.addCookie(refreshToken);

        return responseBody;
    }
}