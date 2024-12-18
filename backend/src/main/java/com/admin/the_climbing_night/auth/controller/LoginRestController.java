package com.admin.the_climbing_night.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.domain.req.LoginRequest;
import com.admin.the_climbing_night.auth.service.LoginService;
import com.admin.the_climbing_night.auth.vo.AccessTokenVo;
import com.admin.the_climbing_night.auth.vo.LoginVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.jwt.vo.JwtTokenVo;
import com.admin.the_climbing_night.utils.CommonUtil;
import com.admin.the_climbing_night.utils.CookieUtil;
import com.admin.the_climbing_night.utils.Crypto;
import com.admin.the_climbing_night.utils.TokenUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginRestController {
    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private LoginService loginService;

    @Autowired
    private CookieUtil cookieUtil;

    /**
     * 로그인
     * 
     * @param req
     * @param response
     * @return
     */
    @PostMapping(value = "login")
    public SingleResponse<AccessTokenVo> login(@RequestBody LoginRequest req, HttpServletResponse response) {
        SingleResponse<AccessTokenVo> responseBody = new SingleResponse<AccessTokenVo>();

        LoginVo loginVo = null;

        try {
            loginVo = loginService.login(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        if (CommonUtil.isEmpty(loginVo)) {
            log.error("No Admin");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        // 비밀번호 일치 여부
        if (!Crypto.match(req.getPassword(), loginVo.getPassword())) {
            log.error("비밀번호 불일치");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        // 권한 확인
        if (loginVo.getGrade() == "50") {
            log.info("등록 요청 중");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        if (loginVo.getGrade() == "60") {
            log.info("권한 만료");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        JwtTokenVo tokenUtilVo = new JwtTokenVo();
        tokenUtilVo.setMemberId(loginVo.getMemberId());
        tokenUtilVo.setGrade(loginVo.getGrade());
        tokenUtilVo.setName(loginVo.getName());

        Map<String, String> token = tokenUtil.makeToken(tokenUtilVo);

        int updateAdminForLogin = 0;

        req.setAccessToken(token.get("accessToken"));

        try {
            updateAdminForLogin = loginService.updateAdminForLogin(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        if (updateAdminForLogin < 1) {
            log.error("No Admin");
            responseBody.setResult(new Result(CodeMessage.ER0001));

            return responseBody;
        }

        response.addCookie(cookieUtil.setCookie("refreshToken", token.get("refreshToken")));

        AccessTokenVo accessToken = new AccessTokenVo();
        accessToken.setAccessToken(token.get("accessToken"));

        responseBody.setData(accessToken);

        return responseBody;
    }
}
