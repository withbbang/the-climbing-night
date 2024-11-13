package com.admin.the_climbing_night.meeting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.service.MeetingService;
import com.admin.the_climbing_night.meeting.vo.GetMeetingInfoVo;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;
import com.admin.the_climbing_night.meeting.vo.InsertAttendVo;
import com.admin.the_climbing_night.utils.CommonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class MeetingRestController {
    @Autowired
    private MeetingService meetingService;

    /**
     * 벙 리스트 조회
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "get-meetings")
    public SingleResponse<List<GetMeetingVo>> getMeetings(@RequestBody GetMeetingsRequest req) {
        SingleResponse response = new SingleResponse();

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
    public SingleResponse<GetMeetingInfoVo> getMeetingInfo(@PathVariable String id) {
        SingleResponse response = new SingleResponse();

        List<GetMeetingInfoVo> getMeetingInfo = null;

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
     * 벙 만들기
     * 
     * @param req
     * @return
     */
    @PostMapping(value = "insert-meeting")
    public SingleResponse insertMeeting(@RequestBody InsertMeetingRequest req) {
        SingleResponse response = new SingleResponse();

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

        int insertmeeting = 0;

        String meetingId = "TCNM" + "_" + CommonUtil.getCurrentTimestamp("yyyyMMddHHmmss");

        req.setId(meetingId);
        req.setCreateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        InsertAttendVo insertAttendVo = new InsertAttendVo();

        insertAttendVo.setId("TCNMA" + "_" + CommonUtil.getCurrentTimestamp("yyyyMMddHHmmss"));
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
}
