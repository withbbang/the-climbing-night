package com.admin.the_climbing_night.admin.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.admin.domain.req.IsAdminMemberRequest;
import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;

@Mapper
@Repository
public interface AdminMapper {
    @DatabaseCryptoAdviceAnnotation
    String isAdminMember(IsAdminMemberRequest req);

    @DatabaseCryptoAdviceAnnotation
    int editAuthority(IsAdminMemberRequest req);
}
