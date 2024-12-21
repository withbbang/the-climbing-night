package com.admin.the_climbing_night.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.service.JoinService;
import com.admin.the_climbing_night.auth.vo.IsAdminVo;
import com.admin.the_climbing_night.auth.vo.IsMemberForAuthVo;
import com.admin.the_climbing_night.auth.vo.JoinVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;
import com.admin.the_climbing_night.utils.Crypto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class JoinRestController {
    @Autowired
    private JoinService joinService;

    /**
     * 회원가입
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "join")
    public SingleResponse join(@RequestBody JoinRequest req) {
        SingleResponse response = new SingleResponse();

        IsMemberForAuthVo isMemberVo = null;

        try {
            isMemberVo = joinService.isMember(req); // 회원 여부 확인
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(isMemberVo)) {
            log.error("No Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        IsAdminVo hasId = null;

        try {
            hasId = joinService.hasId(req.getMemberId()); // 동일 아이디 확인
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (!CommonUtil.isEmpty(hasId)) {
            log.error("Already has ID");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        IsAdminVo isAdminVo = null;

        try {
            isAdminVo = joinService.isAdmin(req.getId()); // 기가입 확인
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (!CommonUtil.isEmpty(isAdminVo)) {
            log.error("Already Admin");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        long getAdminCount = 0;

        try {
            getAdminCount = joinService.getAdminCount();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int join = 0;

        JoinVo joinVo = new JoinVo();

        joinVo.setId("TCNADM" + getAdminCount * 5);
        joinVo.setMemberFk(isMemberVo.getId());
        joinVo.setMemberId(req.getMemberId());
        joinVo.setPassword(Crypto.hash(req.getPassword()));
        joinVo.setGrade(50);

        try {
            join = joinService.join(joinVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (join < 1) {
            log.error("Join Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }
}
