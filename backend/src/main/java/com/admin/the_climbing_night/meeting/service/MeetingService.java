package com.admin.the_climbing_night.meeting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.mapper.MeetingMapper;
import com.admin.the_climbing_night.meeting.vo.GetMeetingInfoVo;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;
import com.admin.the_climbing_night.meeting.vo.InsertAttendVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetingService {
    @Autowired
    MeetingMapper meetingMapper;

    public List<GetMeetingVo> getMeetings(GetMeetingsRequest req) {
        return meetingMapper.getMeetings(req);
    }

    public GetMeetingInfoVo getMeetingInfo(String id) {
        return meetingMapper.getMeetingInfo(id);
    }

    public String hasMeeting(InsertMeetingRequest req) {
        return meetingMapper.hasMeeting(req);
    }

    @Transactional
    public int insertMeeting(InsertMeetingRequest req, InsertAttendVo insertAttendVo) {
        meetingMapper.insertMeeting(req);
        return meetingMapper.insertAttend(insertAttendVo);
    }
}
