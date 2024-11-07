package com.admin.the_climbing_night.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.service.JoinService;
import com.admin.the_climbing_night.auth.vo.IsAdminVo;
import com.admin.the_climbing_night.auth.vo.IsMemberVo;
import com.admin.the_climbing_night.auth.vo.JoinVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class JoinController {
    @Autowired
    private JoinService joinService;

    @PostMapping(value = "join")
    public SingleResponse join(@RequestBody JoinRequest req) {
        SingleResponse response = new SingleResponse();

        IsMemberVo isMemberVo = null;

        try {
            isMemberVo = joinService.isMember(req); // 회원 여부 확인
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));
        }

        if (CommonUtil.isEmpty(isMemberVo.getId())) {
            log.error("No Member");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        IsAdminVo isAdminVo = null;

        try {
            isAdminVo = joinService.isAdmin(req.getMemberId()); // 기가입 확인
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));
        }

        if (!CommonUtil.isEmpty(isAdminVo.getId())) {
            log.error("Already Admin");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        int join = 0;

        JoinVo joinVo = null;

        // TODO: insert 값 설정 필요
        joinVo.setId(null);
        joinVo.setMemberFk(null);
        joinVo.setMemberId(null);
        joinVo.setPassword(null);
        joinVo.setGrade(0);

        try {
            join = joinService.join(joinVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));
        }

        if (join < 1) {
            log.error("Join Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }
}
