package com.admin.the_climbing_night.auth.service;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.auth.domain.req.LoginRequest;
import com.admin.the_climbing_night.auth.mapper.LoginMapper;
import com.admin.the_climbing_night.auth.vo.LoginVo;
import com.admin.the_climbing_night.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    @Autowired
    LoginMapper loginMapper;

    private final JwtTokenProvider jwtTokenProvider;

    private final ModelMapper modelMapper;

    public LoginVo login(LoginRequest req) {
        return loginMapper.login(req);
    }

    public Map<String, String> makeToken(LoginVo loginVo) {
        LoginVo newLoginVo = modelMapper.map(loginVo, LoginVo.class);

        Map<String, String> token = jwtTokenProvider.createToken(newLoginVo);

        return token;
    }

    @Transactional
    public int updateAdminForLogin(LoginRequest req) {
        return loginMapper.updateAdminForLogin(req);
    }
}
