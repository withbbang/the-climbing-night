package com.admin.the_climbing_night.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.member.domain.req.GetMemberInfoByJoinRequest;
import com.admin.the_climbing_night.member.service.MemberService;
import com.admin.the_climbing_night.member.vo.GetMemberInfoByJoinVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class MemberRestController {
    @Autowired
    private MemberService memberService;

    /**
     * admin 등록 용 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-member-info-by-join")
    public SingleResponse<List<GetMemberInfoByJoinVo>> getMemberInfoByJoin(
            @RequestBody GetMemberInfoByJoinRequest req) {
        SingleResponse<List<GetMemberInfoByJoinVo>> response = new SingleResponse<List<GetMemberInfoByJoinVo>>();

        List<GetMemberInfoByJoinVo> getMemberInfoByJoin = null;

        try {
            getMemberInfoByJoin = memberService.getMemberInfoByJoin(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMemberInfoByJoin);

        return response;
    }
}
