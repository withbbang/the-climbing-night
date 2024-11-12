package com.admin.the_climbing_night.meeting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.mapper.MeetingMapper;
import com.admin.the_climbing_night.meeting.vo.HasMeetingVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetingService {
    @Autowired
    MeetingMapper meetingMapper;

    public String hasMeeting(HasMeetingVo req) {
        return meetingMapper.hasMeeting(req);
    }

    @Transactional
    public int insertMeeting(InsertMeetingRequest req) {
        return meetingMapper.insertMeeting(req);
    }
}
