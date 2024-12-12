package com.admin.the_climbing_night.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.admin.vo.CheckAuthorityVo;
import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.jwt.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class CheckAuthorityRestController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * 관리자 페이지로 리다이렉트
     * 
     * @param response
     * @return
     */
    @GetMapping(value = "admin-page-redirect")
    public SingleResponse<CheckAuthorityVo> adminPageRedirect(HttpServletRequest request) {
        SingleResponse<CheckAuthorityVo> response = new SingleResponse<CheckAuthorityVo>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 20) {
            log.info("권한이 없습니다.");
            return response;
        }

        CheckAuthorityVo path = new CheckAuthorityVo();

        path.setPath("/admin");

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
    public SingleResponse<CheckAuthorityVo> meetingPageRedirect(HttpServletRequest request) {
        SingleResponse<CheckAuthorityVo> response = new SingleResponse<CheckAuthorityVo>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        CheckAuthorityVo path = new CheckAuthorityVo();

        path.setPath("/meeting");

        response.setData(path);

        return response;
    }

    /**
     * 벙 수정 상세 페이지로 리다이렉트
     * 
     * @param request
     * @return
     */
    @PostMapping(value = "meeting-detail-page-redirect")
    public SingleResponse<CheckAuthorityVo> meetingDetailPageRedirect(@RequestBody Map<String, String> req,
            HttpServletRequest request) {
        SingleResponse<CheckAuthorityVo> response = new SingleResponse<CheckAuthorityVo>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        CheckAuthorityVo path = new CheckAuthorityVo();

        path.setPath("/meeting/" + req.get("id"));

        response.setData(path);

        return response;
    }
}
