package com.admin.the_climbing_night.utils;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.admin.the_climbing_night.jwt.JwtTokenProvider;
import com.admin.the_climbing_night.jwt.vo.JwtTokenVo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenUtil {
    private final JwtTokenProvider jwtTokenProvider;
    private final ModelMapper modelMapper;

    public Map<String, String> makeToken(JwtTokenVo vo) {
        JwtTokenVo newVo = modelMapper.map(vo, JwtTokenVo.class);

        Map<String, String> token = jwtTokenProvider.createToken(newVo);

        return token;
    }
}
