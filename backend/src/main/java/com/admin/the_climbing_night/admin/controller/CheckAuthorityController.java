package com.admin.the_climbing_night.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.jwt.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class CheckAuthorityController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * 관리자 페이지로 리다이렉트
     * 
     * @param response
     * @return
     */
    @GetMapping(value = "admin-page-redirect")
    public SingleResponse<Map<String, String>> adminPageRedirect(HttpServletRequest request) {
        SingleResponse<Map<String, String>> response = new SingleResponse<Map<String, String>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 20) {
            log.info("권한이 없습니다.");
            return response;
        }

        Map<String, String> path = new HashMap<>();

        path.put("path", "/admin");

        response.setData(path);

        return response;
    }

    /**
     * 벙관리 페이지로 리다이렉트
     * 
     * @param response
     * @return
     */
    @GetMapping(value = "meeting-page-redirect")
    public SingleResponse<Map<String, String>> meetingPageRedirect(HttpServletRequest request) {
        SingleResponse<Map<String, String>> response = new SingleResponse<Map<String, String>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 30) {
            log.info("권한이 없습니다.");
            return response;
        }

        Map<String, String> path = new HashMap<>();

        path.put("path", "/meeting");

        response.setData(path);

        return response;
    }
}
