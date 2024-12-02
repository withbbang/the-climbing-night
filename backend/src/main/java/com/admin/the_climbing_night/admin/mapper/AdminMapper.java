package com.admin.the_climbing_night.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.admin.domain.req.UpdateMemberRequest;
import com.admin.the_climbing_night.admin.vo.GetAdminVo;
import com.admin.the_climbing_night.admin.vo.GetClimbingAreaInfoVo;
import com.admin.the_climbing_night.admin.vo.GetClimbingAreaVo;
import com.admin.the_climbing_night.admin.vo.GetDegreeForAdminVo;
import com.admin.the_climbing_night.admin.vo.GetMemberInfoVo;
import com.admin.the_climbing_night.admin.vo.GetMemberVo;
import com.admin.the_climbing_night.admin.vo.IsMemberForAdminVo;
import com.admin.the_climbing_night.admin.domain.req.GetAdminsRequest;
import com.admin.the_climbing_night.admin.domain.req.GetClimbingAreasRequest;
import com.admin.the_climbing_night.admin.domain.req.GetMembersRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertClimbingAreaRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertDegreeRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.UpdateAdminRequest;
import com.admin.the_climbing_night.admin.domain.req.UpdateClimbingAreaRequest;
import com.admin.the_climbing_night.admin.domain.req.UpdateDegreeRequest;
import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;

@Mapper
@Repository
public interface AdminMapper {
    @DatabaseCryptoAdviceAnnotation
    List<GetMemberVo> getMembers(GetMembersRequest req);

    @DatabaseCryptoAdviceAnnotation
    GetMemberInfoVo getMemberInfo(String id);

    @DatabaseCryptoAdviceAnnotation
    List<GetAdminVo> getAdmins(GetAdminsRequest req);

    @DatabaseCryptoAdviceAnnotation
    String isAdminMember(UpdateAdminRequest req);

    @DatabaseCryptoAdviceAnnotation
    int updateAuthority(UpdateAdminRequest req);

    @DatabaseCryptoAdviceAnnotation
    String isMember(IsMemberForAdminVo req);

    long getMemberCount();

    @DatabaseCryptoAdviceAnnotation
    int insertMember(InsertMemberRequest req);

    @DatabaseCryptoAdviceAnnotation
    int updateMember(UpdateMemberRequest req);

    List<GetClimbingAreaVo> getClimbingAreas(GetClimbingAreasRequest req);

    GetClimbingAreaInfoVo getClimbingAreaInfo(String id);

    int getClimbingAreaCount();

    int insertClimbingArea(InsertClimbingAreaRequest req);

    int updateClimbingArea(UpdateClimbingAreaRequest req);

    List<GetDegreeForAdminVo> getDegrees();

    int insertDegree(InsertDegreeRequest req);

    int updateDegree(UpdateDegreeRequest req);
}
