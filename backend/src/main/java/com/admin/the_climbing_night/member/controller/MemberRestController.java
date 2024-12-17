package com.admin.the_climbing_night.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.member.domain.req.GetMeetingsOfMemberRequest;
import com.admin.the_climbing_night.member.domain.req.GetMemberInfoByJoinRequest;
import com.admin.the_climbing_night.member.domain.req.GetMembersForMemberRequest;
import com.admin.the_climbing_night.member.service.MemberService;
import com.admin.the_climbing_night.member.vo.GetDegreeForMemberVo;
import com.admin.the_climbing_night.member.vo.GetMeetingOfMemberVo;
import com.admin.the_climbing_night.member.vo.GetMemberDetailVo;
import com.admin.the_climbing_night.member.vo.GetMemberForMemberVo;
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

    /**
     * 기수 조회
     * 
     * @return
     */
    @GetMapping(value = "get-degrees-for-member")
    public SingleResponse<List<GetDegreeForMemberVo>> getDegrees() {
        SingleResponse<List<GetDegreeForMemberVo>> response = new SingleResponse<List<GetDegreeForMemberVo>>();

        List<GetDegreeForMemberVo> getDegrees = null;

        try {
            getDegrees = memberService.getDegrees();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getDegrees);

        return response;
    }

    /**
     * 회원 리스트 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-members-for-member")
    public SingleResponse<List<GetMemberForMemberVo>> getMembers(@RequestBody GetMembersForMemberRequest req) {
        SingleResponse<List<GetMemberForMemberVo>> response = new SingleResponse<List<GetMemberForMemberVo>>();

        List<GetMemberForMemberVo> getMembers = null;

        try {
            getMembers = memberService.getMembers(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMembers);

        return response;
    }

    /**
     * 회원 정보 조회
     * 
     * @param id
     * @return
     */
    @GetMapping(value = "get-member-detail/{id}")
    public SingleResponse<GetMemberDetailVo> getMemberDetail(@PathVariable String id) {
        SingleResponse<GetMemberDetailVo> response = new SingleResponse<GetMemberDetailVo>();

        GetMemberDetailVo getMemberDetail = null;

        try {
            getMemberDetail = memberService.getMemberDetail(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMemberDetail);

        return response;
    }

    /**
     * 회원 연간 참여 벙 리스트 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-meetings-of-member")
    public SingleResponse<List<GetMeetingOfMemberVo>> getMeetingsOfMember(@RequestBody GetMeetingsOfMemberRequest req) {
        SingleResponse<List<GetMeetingOfMemberVo>> response = new SingleResponse<List<GetMeetingOfMemberVo>>();

        List<GetMeetingOfMemberVo> getMeetingsOfMember = null;

        try {
            getMeetingsOfMember = memberService.getMeetingsOfMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMeetingsOfMember);

        return response;
    }
}
