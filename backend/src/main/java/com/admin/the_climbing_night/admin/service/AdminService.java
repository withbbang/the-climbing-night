package com.admin.the_climbing_night.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.admin.domain.req.EditMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.IsAdminMemberRequest;
import com.admin.the_climbing_night.admin.mapper.AdminMapper;

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
    public int editAuthority(IsAdminMemberRequest req) {
        return adminMapper.editAuthority(req);
    }

    public String isMember(EditMemberRequest req) {
        return adminMapper.isMember(req);
    }

    @Transactional
    public int editMember(EditMemberRequest req) {
        return adminMapper.editMember(req);
    }
}
