package com.admin.the_climbing_night.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.the_climbing_night.member.domain.req.GetMemberInfoByJoinRequest;
import com.admin.the_climbing_night.member.mapper.MemberMapper;
import com.admin.the_climbing_night.member.vo.GetMemberInfoByJoinVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    MemberMapper memberMapper;

    public List<GetMemberInfoByJoinVo> getMemberInfoByJoin(GetMemberInfoByJoinRequest req) {
        return memberMapper.getMemberInfoByJoin(req);
    }
}
