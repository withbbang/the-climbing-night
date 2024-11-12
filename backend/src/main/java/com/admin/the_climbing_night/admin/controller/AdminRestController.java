package com.admin.the_climbing_night.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.admin.domain.req.UpdateMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.GetMembersRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.IsAdminMemberRequest;
import com.admin.the_climbing_night.admin.service.AdminService;
import com.admin.the_climbing_night.admin.vo.GetMemberVo;
import com.admin.the_climbing_night.admin.vo.IsMemberForAdminVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class AdminRestController {
    @Autowired
    private AdminService adminService;

    @PostMapping(value = "get-members")
    public SingleResponse<List<GetMemberVo>> getMembers(@RequestBody GetMembersRequest req) {
        SingleResponse response = new SingleResponse();

        List<GetMemberVo> getMembers = null;

        try {
            getMembers = adminService.getMembers(req);
        } catch (Exception e) {
            log.error("No Admin Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMembers);

        return response;
    }

    /**
     * admin 권한 변경
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "update-authority")
    public SingleResponse updateAuthority(@RequestBody IsAdminMemberRequest req) {
        SingleResponse response = new SingleResponse();

        String isAdminMember = null;

        try {
            isAdminMember = adminService.isAdminMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(isAdminMember)) {
            log.error("No Admin Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int updateAuthority = 0;

        try {
            updateAuthority = adminService.updateAuthority(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateAuthority < 1) {
            log.error("Update Authority Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 회원 추가
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "insert-member")
    public SingleResponse insertMember(@RequestBody InsertMemberRequest req) {
        SingleResponse response = new SingleResponse();

        String isMember = null;

        IsMemberForAdminVo isMemberVo = new IsMemberForAdminVo();

        isMemberVo.setId(req.getId());
        isMemberVo.setName(req.getName());
        isMemberVo.setBirthDt(req.getBirthDt());

        try {
            isMember = adminService.isMember(isMemberVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (!CommonUtil.isEmpty(isMember)) {
            log.error("Already Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int insertMember = 0;

        req.setId("TCN" + "_" + CommonUtil.getCurrentTimestamp("yyyyMMddHHmmss"));
        req.setCreateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        try {
            insertMember = adminService.insertMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (insertMember < 1) {
            log.error("Insert Member Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 회원 정보 변경
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "update-member")
    public SingleResponse updateMember(@RequestBody UpdateMemberRequest req) {
        SingleResponse response = new SingleResponse();

        String isMember = null;

        IsMemberForAdminVo isMemberVo = new IsMemberForAdminVo();

        isMemberVo.setId(req.getId());
        isMemberVo.setName(req.getName());
        isMemberVo.setBirthDt(req.getBirthDt());

        try {
            isMember = adminService.isMember(isMemberVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(isMember)) {
            log.error("No Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int updateMember = 0;

        try {
            updateMember = adminService.updateMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateMember < 1) {
            log.error("Update Member Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }
}
