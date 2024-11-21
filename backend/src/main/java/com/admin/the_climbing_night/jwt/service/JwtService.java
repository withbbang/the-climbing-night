package com.admin.the_climbing_night.jwt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.jwt.mapper.JwtMapper;
import com.admin.the_climbing_night.jwt.vo.JwtTokenVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {
    @Autowired
    private JwtMapper jwtMapper;

    @Transactional
    public int updateAdminForRequest(JwtTokenVo vo) {
        return jwtMapper.updateAdminForRequest(vo);
    }
}
