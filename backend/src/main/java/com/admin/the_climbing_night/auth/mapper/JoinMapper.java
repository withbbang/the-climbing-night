package com.admin.the_climbing_night.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.vo.IsAdminVo;
import com.admin.the_climbing_night.auth.vo.IsMemberVo;
import com.admin.the_climbing_night.auth.vo.JoinVo;

@Mapper
@Repository
public interface JoinMapper {
    @DatabaseCryptoAdviceAnnotation
    IsMemberVo isMember(JoinRequest req);

    IsAdminVo isAdmin(String memberId);

    int join(JoinVo vo);
}
