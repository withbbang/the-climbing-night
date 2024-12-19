package com.admin.the_climbing_night.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Mapper
@Repository
public interface LogoutMapper {
    @Transactional
    int logout(String accessToken);
}
