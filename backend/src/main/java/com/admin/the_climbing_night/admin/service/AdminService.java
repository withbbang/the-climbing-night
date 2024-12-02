package com.admin.the_climbing_night.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.admin.domain.req.UpdateMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.GetAdminsRequest;
import com.admin.the_climbing_night.admin.domain.req.GetClimbingAreasRequest;
import com.admin.the_climbing_night.admin.domain.req.GetMembersRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertClimbingAreaRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertDegreeRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.UpdateAdminRequest;
import com.admin.the_climbing_night.admin.domain.req.UpdateClimbingAreaRequest;
import com.admin.the_climbing_night.admin.domain.req.UpdateDegreeRequest;
import com.admin.the_climbing_night.admin.mapper.AdminMapper;
import com.admin.the_climbing_night.admin.vo.GetAdminVo;
import com.admin.the_climbing_night.admin.vo.GetClimbingAreaInfoVo;
import com.admin.the_climbing_night.admin.vo.GetClimbingAreaVo;
import com.admin.the_climbing_night.admin.vo.GetDegreeForAdminVo;
import com.admin.the_climbing_night.admin.vo.GetMemberInfoVo;
import com.admin.the_climbing_night.admin.vo.GetMemberVo;
import com.admin.the_climbing_night.admin.vo.IsMemberForAdminVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    @Autowired
    AdminMapper adminMapper;

    public List<GetMemberVo> getMembers(GetMembersRequest req) {
        return adminMapper.getMembers(req);
    }

    public GetMemberInfoVo getMemberInfo(String id) {
        return adminMapper.getMemberInfo(id);
    }

    public List<GetAdminVo> getAdmins(GetAdminsRequest req) {
        return adminMapper.getAdmins(req);
    }

    public String isAdminMember(UpdateAdminRequest req) {
        return adminMapper.isAdminMember(req);
    }

    @Transactional
    public int updateAuthority(UpdateAdminRequest req) {
        return adminMapper.updateAuthority(req);
    }

    public String isMember(IsMemberForAdminVo req) {
        return adminMapper.isMember(req);
    }

    public long getMemberCount() {
        return adminMapper.getMemberCount();
    }

    @Transactional
    public int insertMember(InsertMemberRequest req) {
        return adminMapper.insertMember(req);
    }

    @Transactional
    public int updateMember(UpdateMemberRequest req) {
        return adminMapper.updateMember(req);
    }

    public List<GetClimbingAreaVo> getClimbingAreas(GetClimbingAreasRequest req) {
        return adminMapper.getClimbingAreas(req);
    }

    public GetClimbingAreaInfoVo getClimbingAreaInfo(String id) {
        return adminMapper.getClimbingAreaInfo(id);
    }

    public int getClimbingAreaCount() {
        return adminMapper.getClimbingAreaCount();
    }

    @Transactional
    public int insertClimbingArea(InsertClimbingAreaRequest req) {
        return adminMapper.insertClimbingArea(req);
    }

    @Transactional
    public int updateClimbingArea(UpdateClimbingAreaRequest req) {
        return adminMapper.updateClimbingArea(req);
    }

    public List<GetDegreeForAdminVo> getDegrees() {
        return adminMapper.getDegrees();
    }

    @Transactional
    public int insertDegree(InsertDegreeRequest req) {
        return adminMapper.insertDegree(req);
    }

    @Transactional
    public int updateDegree(UpdateDegreeRequest req) {
        return adminMapper.updateDegree(req);
    }
}
