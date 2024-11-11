package com.admin.the_climbing_night.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.domain.req.LoginRequest;
import com.admin.the_climbing_night.auth.service.LoginService;
import com.admin.the_climbing_night.auth.vo.LoginVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;
import com.admin.the_climbing_night.utils.CookieUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginRestController {
    @Autowired
    private LoginService loginService;

    @Autowired
    private CookieUtil cookieUtil;

    @PostMapping(value = "login")
    public SingleResponse login(@RequestBody LoginRequest req, HttpServletResponse response) {
        SingleResponse responseBody = new SingleResponse();

        LoginVo loginVo = null;

        try {
            loginVo = loginService.login(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            responseBody.setResult(new Result(CodeMessage.ER0001));
        }

        if (CommonUtil.isEmpty(loginVo)) {
            log.error("No Admin");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        Map<String, String> token = loginService.makeToken(loginVo);

        response.addCookie(cookieUtil.setCookie("accessToken", token.get("accessToken")));
        response.addCookie(cookieUtil.setCookie("refreshToken", token.get("refreshToken")));

        return responseBody;
    }
}
