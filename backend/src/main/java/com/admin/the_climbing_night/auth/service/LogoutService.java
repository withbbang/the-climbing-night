package com.admin.the_climbing_night.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.auth.mapper.LogoutMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService {
    @Autowired
    LogoutMapper logoutMapper;

    @Transactional
    public int updateAdminForLogin(String accessToken) {
        return logoutMapper.logout(accessToken);
    }
}
