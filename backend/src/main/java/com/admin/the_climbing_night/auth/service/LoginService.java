package com.admin.the_climbing_night.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.auth.domain.req.LoginRequest;
import com.admin.the_climbing_night.auth.mapper.LoginMapper;
import com.admin.the_climbing_night.auth.vo.LoginVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    @Autowired
    LoginMapper loginMapper;

    public LoginVo login(LoginRequest req) {
        return loginMapper.login(req);
    }

    @Transactional
    public int updateAdminForLogin(LoginRequest req) {
        return loginMapper.updateAdminForLogin(req);
    }
}
