package com.admin.the_climbing_night.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.vo.IsAdminVo;
import com.admin.the_climbing_night.auth.vo.IsMemberForAuthVo;
import com.admin.the_climbing_night.auth.vo.JoinVo;

@Mapper
@Repository
public interface JoinMapper {
    @DatabaseCryptoAdviceAnnotation
    IsMemberForAuthVo isMember(JoinRequest req);

    IsAdminVo hasId(String memberId);

    IsAdminVo isAdmin(String id);

    long getAdminCount();

    int join(JoinVo vo);
}
