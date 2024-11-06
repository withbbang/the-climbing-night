package com.admin.the_climbing_night.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.domain.res.JoinResponse;

@Mapper
@Repository
public interface JoinMapper {
    @DatabaseCryptoAdviceAnnotation
    JoinResponse isMember(JoinRequest req);
}
