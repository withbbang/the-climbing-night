package com.admin.the_climbing_night.meeting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.domain.req.UpdateMeetingRequest;
import com.admin.the_climbing_night.meeting.mapper.MeetingMapper;
import com.admin.the_climbing_night.meeting.vo.GetAdminsForInsertMeeting;
import com.admin.the_climbing_night.meeting.vo.GetAttendVo;
import com.admin.the_climbing_night.meeting.vo.GetClimbingAreaForInsertMeeting;
import com.admin.the_climbing_night.meeting.vo.GetMeetingInfoVo;
import com.admin.the_climbing_night.meeting.vo.GetMeetingStatus;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;
import com.admin.the_climbing_night.meeting.vo.GetParticipantsVo;
import com.admin.the_climbing_night.meeting.vo.InsertAttendVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetingService {
    @Autowired
    MeetingMapper meetingMapper;

    public List<GetMeetingStatus> getMeetingStatuses() {
        return meetingMapper.getMeetingStatuses();
    }

    public List<GetAdminsForInsertMeeting> getAdminsForInsertMeeting(String name) {
        return meetingMapper.getAdminsForInsertMeeting(name);
    }

    public List<GetClimbingAreaForInsertMeeting> getClimbingAreasForInsertMeeting(String name) {
        return meetingMapper.getClimbingAreasForInsertMeeting(name);
    }

    public String hasMeeting(InsertMeetingRequest req) {
        return meetingMapper.hasMeeting(req);
    }

    public long getMeetingCount(String climbingAreaFk) {
        return meetingMapper.getMeetingCount(climbingAreaFk);
    }

    @Transactional
    public int insertMeeting(InsertMeetingRequest req, InsertAttendVo insertAttendVo) {
        meetingMapper.insertMeeting(req);
        return meetingMapper.insertAttend(insertAttendVo);
    }

    public List<GetMeetingVo> getMeetings(GetMeetingsRequest req) {
        return meetingMapper.getMeetings(req);
    }

    public List<GetMeetingInfoVo> getMeetingInfo(String id) {
        return meetingMapper.getMeetingInfo(id);
    }

    public List<GetParticipantsVo> getParticipants(String id) {
        return meetingMapper.getParticipants(id);
    }

    public List<GetAttendVo> getAttends(String meetingFk) {
        return meetingMapper.getAttends(meetingFk);
    }

    @Transactional
    public int updateMeeting(List<String> deleteAttends, List<InsertAttendVo> insertAttendsVo,
            UpdateMeetingRequest req) {
        meetingMapper.deleteAttends(deleteAttends);
        meetingMapper.insertAttends(insertAttendsVo);
        return meetingMapper.updateMeeting(req);
    }
}
