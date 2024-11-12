package com.admin.the_climbing_night.meeting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.service.MeetingService;
import com.admin.the_climbing_night.meeting.vo.HasMeetingVo;
import com.admin.the_climbing_night.utils.CommonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class MeetingRestController {
    @Autowired
    private MeetingService meetingService;

    @PostMapping(value = "insert-meeting")
    public SingleResponse insertMeeting(@RequestBody InsertMeetingRequest req) {
        SingleResponse response = new SingleResponse();

        String hasMeeting = null;

        HasMeetingVo hasMeetingVo = new HasMeetingVo();

        hasMeetingVo.setHostDt(req.getHostDt());
        hasMeetingVo.setClimbingAreaFk(req.getClimbingAreaFk());

        try {
            hasMeeting = meetingService.hasMeeting(hasMeetingVo);
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

        req.setId("TCNM" + "_" + CommonUtil.getCurrentTimestamp("yyyyMMddHHmmss"));
        req.setCreateDt(CommonUtil.getCurrentTimestamp("yyyy-MM-dd HH:mm:ss"));

        try {
            insertmeeting = meetingService.insertMeeting(req);
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
