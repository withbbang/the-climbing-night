package com.admin.the_climbing_night.meeting.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.jwt.JwtTokenProvider;
import com.admin.the_climbing_night.meeting.domain.req.GetAdminsForInsertMeetingRequest;
import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.GetMembersForUpdateMettingRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.domain.req.UpdateMeetingRequest;
import com.admin.the_climbing_night.meeting.service.MeetingService;
import com.admin.the_climbing_night.meeting.vo.GetAdminForInsertMeeting;
import com.admin.the_climbing_night.meeting.vo.GetAttendVo;
import com.admin.the_climbing_night.meeting.vo.GetClimbingAreaForInsertMeeting;
import com.admin.the_climbing_night.meeting.vo.GetMeetingInfoVo;
import com.admin.the_climbing_night.meeting.vo.GetMeetingStatus;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;
import com.admin.the_climbing_night.meeting.vo.GetMemberForUpdateMeetingVo;
import com.admin.the_climbing_night.meeting.vo.GetParticipantsVo;
import com.admin.the_climbing_night.meeting.vo.InsertAttendVo;
import com.admin.the_climbing_night.utils.CommonUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class MeetingRestController {
    @Autowired
    private MeetingService meetingService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * 벙 상태 조회
     * 
     * @return
     */
    @GetMapping(value = "get-meeting-statuses")
    public SingleResponse<List<GetMeetingStatus>> getMeetingStatus(HttpServletRequest request) {
        SingleResponse<List<GetMeetingStatus>> response = new SingleResponse<List<GetMeetingStatus>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetMeetingStatus> getMeetingStatuses = null;

        try {
            getMeetingStatuses = meetingService.getMeetingStatuses();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(getMeetingStatuses)) {
            log.error("No Meeting Status");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMeetingStatuses);

        return response;
    }

    /**
     * 벙 주최자 리스트 조회
     * 
     * @param name
     * @return
     */
    @PostMapping(value = "get-admins-for-meeting")
    public SingleResponse<List<GetAdminForInsertMeeting>> getAdminsForInsertMeeting(
            @RequestBody GetAdminsForInsertMeetingRequest req, HttpServletRequest request) {
        SingleResponse<List<GetAdminForInsertMeeting>> response = new SingleResponse<List<GetAdminForInsertMeeting>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetAdminForInsertMeeting> getAdminsForInsertMeeting = null;

        try {
            getAdminsForInsertMeeting = meetingService.getAdminsForInsertMeeting(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getAdminsForInsertMeeting);

        return response;
    }

    /**
     * 암장 조회
     * 
     * @param name
     * @return
     */
    @PostMapping(value = "get-climbing-areas-for-meeting")
    public SingleResponse<List<GetClimbingAreaForInsertMeeting>> getClimbingAreasForInsertMeeting(
            @RequestBody Map<String, String> req, HttpServletRequest request) {
        SingleResponse<List<GetClimbingAreaForInsertMeeting>> response = new SingleResponse<List<GetClimbingAreaForInsertMeeting>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetClimbingAreaForInsertMeeting> getClimbingAreasForInsertMeeting = null;

        try {
            getClimbingAreasForInsertMeeting = meetingService.getClimbingAreasForInsertMeeting(req.get("name"));
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getClimbingAreasForInsertMeeting);

        return response;
    }

    /**
     * 벙 만들기
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "insert-meeting")
    public SingleResponse insertMeeting(@RequestBody InsertMeetingRequest req, HttpServletRequest request) {
        SingleResponse response = new SingleResponse();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        String hasMeeting = null;

        try {
            hasMeeting = meetingService.hasMeeting(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (!CommonUtil.isEmpty(hasMeeting)) {
            log.error("Already Has Meeting");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        long getMeetingCount = 0;

        try {
            getMeetingCount = meetingService.getMeetingCount(req.getClimbingAreaFk());
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        int insertmeeting = 0;

        String meetingId = req.getClimbingAreaFk() + "_" + getMeetingCount;

        req.setId(meetingId);
        req.setCreateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        InsertAttendVo insertAttendVo = new InsertAttendVo();

        insertAttendVo.setId(meetingId + "_" + req.getAdminFk());
        insertAttendVo.setMeetingFk(meetingId);
        insertAttendVo.setMemberFk(req.getMemberFk());

        try {
            insertmeeting = meetingService.insertMeeting(req, insertAttendVo);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (insertmeeting < 1) {
            log.error("Insert Meeting Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }

    /**
     * 벙 리스트 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-meetings")
    public SingleResponse<List<GetMeetingVo>> getMeetings(@RequestBody GetMeetingsRequest req,
            HttpServletRequest request) {
        SingleResponse<List<GetMeetingVo>> response = new SingleResponse<List<GetMeetingVo>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetMeetingVo> getMeetings = null;

        try {
            getMeetings = meetingService.getMeetings(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMeetings);

        return response;
    }

    /**
     * 벙 정보 가져오기
     * 
     * @param id
     * @return
     */
    @GetMapping(value = "get-meeting-info/{id}")
    public SingleResponse<GetMeetingInfoVo> getMeetingInfo(@PathVariable String id, HttpServletRequest request) {
        SingleResponse<GetMeetingInfoVo> response = new SingleResponse<GetMeetingInfoVo>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        GetMeetingInfoVo getMeetingInfo = null;

        try {
            getMeetingInfo = meetingService.getMeetingInfo(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(getMeetingInfo)) {
            log.error("No Meeting");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMeetingInfo);

        return response;
    }

    /**
     * 참가자 리스트 가져오기
     * 
     * @param id
     * @return
     */
    @GetMapping(value = "get-participants/{id}")
    public SingleResponse<List<GetParticipantsVo>> getParticipants(@PathVariable String id,
            HttpServletRequest request) {
        SingleResponse<List<GetParticipantsVo>> response = new SingleResponse<List<GetParticipantsVo>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetParticipantsVo> getParticipants = null;

        try {
            getParticipants = meetingService.getParticipants(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getParticipants);

        return response;
    }

    /**
     * 참가자 찾기 리스트 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-members-for-update-meeting")
    public SingleResponse<List<GetMemberForUpdateMeetingVo>> getMembersForUpdateMeeting(
            @RequestBody GetMembersForUpdateMettingRequest req, HttpServletRequest request) {
        SingleResponse<List<GetMemberForUpdateMeetingVo>> response = new SingleResponse<List<GetMemberForUpdateMeetingVo>>();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetMemberForUpdateMeetingVo> getMembersForUpdateMeeting = null;

        try {
            getMembersForUpdateMeeting = meetingService.getMembers(req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getMembersForUpdateMeeting);

        return response;
    }

    /**
     * 벙 수정
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "update-meeting")
    public SingleResponse updateMeeting(@RequestBody UpdateMeetingRequest req, HttpServletRequest request) {
        SingleResponse response = new SingleResponse();

        GetIsLoggedInVo adminVo = jwtTokenProvider
                .getAdminInfo(request.getHeader("Authorization").replace("Bearer ", ""));

        if (Integer.parseInt(adminVo.getGrade()) > 40) {
            log.info("권한이 없습니다.");
            return response;
        }

        List<GetAttendVo> getAttends = null;

        try {
            getAttends = meetingService.getAttends(req.getId());
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (CommonUtil.isEmpty(getAttends)) {
            log.error("No Meeting");
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        List<String> deleteAttends = getAttends.stream()
                .filter(vo -> !req.getMemberFks().contains(vo.getMemberFk()))
                .map(vo -> vo.getId())
                .collect(Collectors.toList());

        List<InsertAttendVo> insertAttendsVo = new ArrayList<InsertAttendVo>();

        for (String memberFk : req.getMemberFks()) {
            boolean isExist = true;

            for (GetAttendVo vo : getAttends) {
                if (vo.getMemberFk().equals(memberFk)) {
                    isExist = false;
                    break;
                }
            }

            if (isExist) {
                InsertAttendVo insertAttendVo = new InsertAttendVo();

                insertAttendVo.setId(req.getId() + "_" + memberFk);
                insertAttendVo.setMeetingFk(req.getId());
                insertAttendVo.setMemberFk(memberFk);

                insertAttendsVo.add(insertAttendVo);
            }
        }

        int updateMeeting = 0;

        req.setUpdateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));
        req.setUpdaterId(adminVo.getMemberId());

        try {
            updateMeeting = meetingService.updateMeeting(deleteAttends, insertAttendsVo, req);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        if (updateMeeting < 1) {
            log.error("Update Meeting Failed");
            response.setResult(new Result(CodeMessage.ER0001));
        }

        return response;
    }
}
