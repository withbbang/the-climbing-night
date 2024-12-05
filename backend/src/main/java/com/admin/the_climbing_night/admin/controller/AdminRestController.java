package com.admin.the_climbing_night.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.admin.the_climbing_night.admin.service.AdminService;
import com.admin.the_climbing_night.admin.vo.GetAdminVo;
import com.admin.the_climbing_night.admin.vo.GetClimbingAreaInfoVo;
import com.admin.the_climbing_night.admin.vo.GetClimbingAreaVo;
import com.admin.the_climbing_night.admin.vo.GetDegreeForAdminVo;
import com.admin.the_climbing_night.admin.vo.GetMemberInfoVo;
import com.admin.the_climbing_night.admin.vo.GetMemberVo;
import com.admin.the_climbing_night.admin.vo.IsMemberForAdminVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.utils.CommonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class AdminRestController {
    @Autowired
    private AdminService adminService;

    /**
     * 회원 리스트 가져오기
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-members")
    public SingleResponse<List<GetMemberVo>> getMembers(@RequestBody GetMembersRequest req) {
        SingleResponse<List<GetMemberVo>> response = new SingleResponse<List<GetMemberVo>>();

        List<GetMemberVo> getMembers = null;

        try {
            getMembers = adminService.getMembers(req);
        } catch (Exception e) {
            log.error("No Admin Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMembers);

        return response;
    }

    /**
     * 회원 정보 가져오기
     * 
     * @param id
     * @return
     */
    @PostMapping(value = "get-member-info")
    public SingleResponse<GetMemberInfoVo> getMemberInfo(@RequestBody Map<String, String> req) {
        SingleResponse<GetMemberInfoVo> response = new SingleResponse<GetMemberInfoVo>();

        GetMemberInfoVo getMemberInfo = null;

        try {
            getMemberInfo = adminService.getMemberInfo(req.get("id"));
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(getMemberInfo)) {
            log.error("No Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMemberInfo);

        return response;
    }

    /**
     * 어드민 리스트 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-admins")
    public SingleResponse<List<GetAdminVo>> getAdmins(@RequestBody GetAdminsRequest req) {
        SingleResponse<List<GetAdminVo>> response = new SingleResponse<List<GetAdminVo>>();

        List<GetAdminVo> getAdmins = null;

        try {
            getAdmins = adminService.getAdmins(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getAdmins);

        return response;
    }

    /**
     * admin 권한 변경
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "update-authority")
    public SingleResponse updateAuthority(@RequestBody UpdateAdminRequest req) {
        SingleResponse response = new SingleResponse();

        String isAdminMember = null;

        try {
            isAdminMember = adminService.isAdminMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(isAdminMember)) {
            log.error("No Admin Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int updateAuthority = 0;

        try {
            updateAuthority = adminService.updateAuthority(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateAuthority < 1) {
            log.error("Update Authority Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 회원 추가
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "insert-member")
    public SingleResponse insertMember(@RequestBody InsertMemberRequest req) {
        SingleResponse response = new SingleResponse();

        String isMember = null;

        IsMemberForAdminVo isMemberVo = new IsMemberForAdminVo();

        isMemberVo.setName(req.getName());
        isMemberVo.setLevelFk(req.getLevelFk());
        isMemberVo.setDegreeFk(req.getDegreeFk());
        isMemberVo.setBirthDt(req.getBirthDt());
        isMemberVo.setPhoneNo(req.getPhoneNo());

        try {
            isMember = adminService.isMember(isMemberVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (!CommonUtil.isEmpty(isMember)) {
            log.error("Already Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        long getMemberCount = 0;

        try {
            getMemberCount = adminService.getMemberCount();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int insertMember = 0;

        req.setId("TCN" + getMemberCount * 5);
        req.setCreateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        try {
            insertMember = adminService.insertMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (insertMember < 1) {
            log.error("Insert Member Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 회원 정보 변경
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "update-member")
    public SingleResponse updateMember(@RequestBody UpdateMemberRequest req) {
        SingleResponse response = new SingleResponse();

        String isMember = null;

        IsMemberForAdminVo isMemberVo = new IsMemberForAdminVo();

        isMemberVo.setId(req.getId());
        isMemberVo.setName(req.getName());
        isMemberVo.setBirthDt(req.getBirthDt());

        try {
            isMember = adminService.isMember(isMemberVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(isMember)) {
            log.error("No Member");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int updateMember = 0;

        req.setUpdateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        try {
            updateMember = adminService.updateMember(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateMember < 1) {
            log.error("Update Member Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 암장 리스트 가져오기
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-climbing-areas")
    public SingleResponse<List<GetClimbingAreaVo>> getClimbingAreas(@RequestBody GetClimbingAreasRequest req) {
        SingleResponse response = new SingleResponse();

        List<GetClimbingAreaVo> getClimbingAreas = null;

        try {
            getClimbingAreas = adminService.getClimbingAreas(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getClimbingAreas);

        return response;
    }

    /**
     * 암장 정보 가져오기
     * 
     * @param id
     * @return
     */
    @GetMapping(value = "get-climbing-area-info/{id}")
    public SingleResponse<GetClimbingAreaInfoVo> getClimbingAreaInfo(@PathVariable String id) {
        SingleResponse response = new SingleResponse();

        GetClimbingAreaInfoVo getClimbingAreaInfo = null;

        try {
            getClimbingAreaInfo = adminService.getClimbingAreaInfo(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(getClimbingAreaInfo)) {
            log.error("No Climbing Area Info");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getClimbingAreaInfo);

        return response;
    }

    /**
     * 암장 추가
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "insert-climbing-area")
    public SingleResponse insertClimbingArea(@RequestBody InsertClimbingAreaRequest req) {
        SingleResponse response = new SingleResponse();

        int getClimbingAreaCount = 0;

        try {
            getClimbingAreaCount = adminService.getClimbingAreaCount();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int insertClimbingArea = 0;

        req.setId("TCNCA" + getClimbingAreaCount * 5);
        req.setCreateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        try {
            insertClimbingArea = adminService.insertClimbingArea(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (insertClimbingArea < 1) {
            log.error("Insert Climbing Area Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 암장 정보 수정
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "update-climbing-area")
    public SingleResponse updateClimbingArea(@RequestBody UpdateClimbingAreaRequest req) {
        SingleResponse response = new SingleResponse();

        int updateClimbingArea = 0;

        req.setUpdateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        try {
            updateClimbingArea = adminService.updateClimbingArea(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateClimbingArea < 1) {
            log.error("Update Climbing Area Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 관리자용 기수 조회
     * 
     * @return
     */
    @GetMapping(value = "get-degrees-for-admin")
    public SingleResponse<List<GetDegreeForAdminVo>> getDegrees() {
        SingleResponse<List<GetDegreeForAdminVo>> response = new SingleResponse<>();

        List<GetDegreeForAdminVo> getDegrees = null;

        try {
            getDegrees = adminService.getDegrees();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getDegrees);

        return response;
    }

    /**
     * 기수 추가
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "insert-degree")
    public SingleResponse insertDegree(@RequestBody InsertDegreeRequest req) {
        SingleResponse response = new SingleResponse();

        int insertDegree = 0;

        try {
            insertDegree = adminService.insertDegree(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (insertDegree < 1) {
            log.error("Insert Degree Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    @PostMapping(value = "update-degree")
    public SingleResponse updateDegree(@RequestBody UpdateDegreeRequest req) {
        SingleResponse response = new SingleResponse();

        int updateDegree = 0;

        try {
            updateDegree = adminService.updateDegree(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateDegree < 1) {
            log.error("Update Degree Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }
}
