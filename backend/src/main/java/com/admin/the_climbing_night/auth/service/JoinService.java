package com.admin.the_climbing_night.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.auth.domain.req.JoinRequest;
import com.admin.the_climbing_night.auth.mapper.JoinMapper;
import com.admin.the_climbing_night.auth.vo.IsAdminVo;
import com.admin.the_climbing_night.auth.vo.IsMemberForAuthVo;
import com.admin.the_climbing_night.auth.vo.JoinVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinService {
    @Autowired
    JoinMapper joinMapper;

    public IsMemberForAuthVo isMember(JoinRequest req) {
        return joinMapper.isMember(req);
    }

    public IsAdminVo hasId(String memberId) {
        return joinMapper.isAdmin(memberId);
    }

    public IsAdminVo isAdmin(String id) {
        return joinMapper.isAdmin(id);
    }

    public long getAdminCount() {
        return joinMapper.getAdminCount();
    }

    @Transactional
    public int join(JoinVo vo) {
        return joinMapper.join(vo);
    }
}
