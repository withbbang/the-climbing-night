package com.admin.the_climbing_night.auth.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.mapper.JoinMapper;
import com.admin.the_climbing_night.auth.vo.IsAdminVo;
import com.admin.the_climbing_night.auth.vo.IsMemberVo;
import com.admin.the_climbing_night.auth.vo.JoinVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinService {
    @Autowired
    JoinMapper joinMapper;

    private final ModelMapper modelMapper;

    public IsMemberVo isMember(JoinRequest req) {
        return joinMapper.isMember(req);
    }

    public IsAdminVo isAdmin(String memberId) {
        return joinMapper.isAdmin(memberId);
    }

    @Transactional
    public int join(JoinVo vo) {
        return joinMapper.join(vo);
    }
}
