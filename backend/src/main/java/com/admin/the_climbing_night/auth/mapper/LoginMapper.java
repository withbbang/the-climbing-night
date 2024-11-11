package com.admin.the_climbing_night.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.auth.domain.req.LoginRequest;
import com.admin.the_climbing_night.auth.vo.LoginVo;

@Mapper
@Repository
public interface LoginMapper {
    @DatabaseCryptoAdviceAnnotation
    LoginVo login(LoginRequest req);
}
