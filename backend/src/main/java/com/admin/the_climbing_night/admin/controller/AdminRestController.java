package com.admin.the_climbing_night.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.admin.domain.req.IsAdminMemberRequest;
import com.admin.the_climbing_night.admin.service.AdminService;
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

    @PostMapping(value = "edit-authority")
    public SingleResponse editAuthority(@RequestBody IsAdminMemberRequest req) {
        SingleResponse response = new SingleResponse();

        String isAdminMember = null;

        try {
            isAdminMember = adminService.isAdminMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));
        }

        if (CommonUtil.isEmpty(isAdminMember)) {
            log.error("No Admin Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int editAuthority = 0;

        try {
            editAuthority = adminService.editAuthority(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));
        }

        if (editAuthority < 1) {
            log.error("Edit Authority Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }
}
