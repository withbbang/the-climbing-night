package com.admin.the_climbing_night.jwt.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.jwt.vo.JwtTokenVo;

@Mapper
@Repository
public interface JwtMapper {
    @Transactional
    int updateAdminForRequest(JwtTokenVo vo);
}
