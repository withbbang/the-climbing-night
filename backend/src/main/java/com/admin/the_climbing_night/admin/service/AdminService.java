package com.admin.the_climbing_night.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.admin.domain.req.UpdateMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.IsAdminMemberRequest;
import com.admin.the_climbing_night.admin.mapper.AdminMapper;
import com.admin.the_climbing_night.admin.vo.IsMemberForAdminVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    @Autowired
    AdminMapper adminMapper;

    public String isAdminMember(IsAdminMemberRequest req) {
        return adminMapper.isAdminMember(req);
    }

    @Transactional
    public int updateAuthority(IsAdminMemberRequest req) {
        return adminMapper.updateAuthority(req);
    }

    public String isMember(IsMemberForAdminVo req) {
        return adminMapper.isMember(req);
    }

    @Transactional
    public int insertMember(InsertMemberRequest req) {
        return adminMapper.insertMember(req);
    }

    @Transactional
    public int updateMember(UpdateMemberRequest req) {
        return adminMapper.updateMember(req);
    }
}
