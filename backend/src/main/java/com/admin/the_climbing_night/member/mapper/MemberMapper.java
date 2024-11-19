package com.admin.the_climbing_night.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.member.domain.req.GetMemberInfoByJoinRequest;
import com.admin.the_climbing_night.member.vo.GetMemberInfoByJoinVo;

@Mapper
@Repository
public interface MemberMapper {
    @DatabaseCryptoAdviceAnnotation
    List<GetMemberInfoByJoinVo> getMemberInfoByJoin(GetMemberInfoByJoinRequest req);
}
