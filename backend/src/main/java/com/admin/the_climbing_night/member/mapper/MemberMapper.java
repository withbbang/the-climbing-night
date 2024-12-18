package com.admin.the_climbing_night.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.member.domain.req.GetMeetingsOfMemberRequest;
import com.admin.the_climbing_night.member.domain.req.GetMemberInfoByJoinRequest;
import com.admin.the_climbing_night.member.domain.req.GetMembersForMemberRequest;
import com.admin.the_climbing_night.member.vo.GetDegreeForMemberVo;
import com.admin.the_climbing_night.member.vo.GetMeetingDetailVo;
import com.admin.the_climbing_night.member.vo.GetMemberDetailVo;
import com.admin.the_climbing_night.member.vo.GetMemberForMemberVo;
import com.admin.the_climbing_night.member.vo.GetMemberInfoByJoinVo;
import com.admin.the_climbing_night.member.vo.GetParticipantVo;
import com.admin.the_climbing_night.member.vo.GetMeetingOfMemberVo;

@Mapper
@Repository
public interface MemberMapper {
    @DatabaseCryptoAdviceAnnotation
    List<GetMemberInfoByJoinVo> getMemberInfoByJoin(GetMemberInfoByJoinRequest req);

    List<GetDegreeForMemberVo> getDegrees();

    List<GetMemberForMemberVo> getMembers(GetMembersForMemberRequest req);

    GetMemberDetailVo getMemberDetail(String id);

    List<GetMeetingOfMemberVo> getMeetingsOfMember(GetMeetingsOfMemberRequest req);

    GetMeetingDetailVo getMeetingDetail(String id);

    List<GetParticipantVo> getParticipants(String id);
}
