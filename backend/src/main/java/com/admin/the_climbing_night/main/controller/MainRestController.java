package com.admin.the_climbing_night.main.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.main.domain.req.MainRequest;
import com.admin.the_climbing_night.main.service.MainService;
import com.admin.the_climbing_night.main.vo.MainVo;
import com.admin.the_climbing_night.utils.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MainRestController {
    @Autowired
    private MainService mainService;

    @Autowired
    private CookieUtil cookieUtil;

    @PostMapping(value = "test")
    public SingleResponse<MainVo> main(@RequestBody MainRequest req) {
        MainVo vo = mainService.mainService(req);

        SingleResponse response = new SingleResponse();
        response.setData(vo);

        return response;
    }

    @PostMapping(value = "update")
    public SingleResponse<MainVo> mainUpdate(@RequestBody MainRequest req) {
        SingleResponse response = new SingleResponse();

        try {
            mainService.mainUpdate(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    @PostMapping(value = "login")
    public SingleResponse<Map<String, String>> login(@RequestBody MainRequest req,
            HttpServletResponse response) {
        SingleResponse responseBody = new SingleResponse();

        Map<String, String> token = new HashMap<>();

        try {
            token = mainService.login(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            responseBody.setResult(new Result(CodeMessage.ER0001));
        }

        response.addCookie(cookieUtil.setCookie("accessToken", token.get("accessToken")));
        response.addCookie(cookieUtil.setCookie("refreshToken", token.get("refreshToken")));

        return responseBody;
    }
}
