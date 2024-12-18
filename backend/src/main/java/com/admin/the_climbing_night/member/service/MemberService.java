package com.admin.the_climbing_night.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.the_climbing_night.member.domain.req.GetMeetingsOfMemberRequest;
import com.admin.the_climbing_night.member.domain.req.GetMemberInfoByJoinRequest;
import com.admin.the_climbing_night.member.domain.req.GetMembersForMemberRequest;
import com.admin.the_climbing_night.member.mapper.MemberMapper;
import com.admin.the_climbing_night.member.vo.GetDegreeForMemberVo;
import com.admin.the_climbing_night.member.vo.GetMeetingDetailVo;
import com.admin.the_climbing_night.member.vo.GetMeetingOfMemberVo;
import com.admin.the_climbing_night.member.vo.GetMemberDetailVo;
import com.admin.the_climbing_night.member.vo.GetMemberForMemberVo;
import com.admin.the_climbing_night.member.vo.GetMemberInfoByJoinVo;
import com.admin.the_climbing_night.member.vo.GetParticipantVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    MemberMapper memberMapper;

    public List<GetMemberInfoByJoinVo> getMemberInfoByJoin(GetMemberInfoByJoinRequest req) {
        return memberMapper.getMemberInfoByJoin(req);
    }

    public List<GetDegreeForMemberVo> getDegrees() {
        return memberMapper.getDegrees();
    }

    public List<GetMemberForMemberVo> getMembers(GetMembersForMemberRequest req) {
        return memberMapper.getMembers(req);
    }

    public GetMemberDetailVo getMemberDetail(String id) {
        return memberMapper.getMemberDetail(id);
    }

    public List<GetMeetingOfMemberVo> getMeetingsOfMember(GetMeetingsOfMemberRequest req) {
        return memberMapper.getMeetingsOfMember(req);
    }

    public GetMeetingDetailVo getMeetingDetail(String id) {
        return memberMapper.getMeetingDetail(id);
    }

    public List<GetParticipantVo> getParticipants(String id) {
        return memberMapper.getParticipants(id);
    }
}
