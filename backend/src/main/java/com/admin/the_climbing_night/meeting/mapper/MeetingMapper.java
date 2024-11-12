package com.admin.the_climbing_night.meeting.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.vo.GetMeetingInfoVo;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;
import com.admin.the_climbing_night.meeting.vo.InsertAttendVo;

@Mapper
@Repository
public interface MeetingMapper {
    @DatabaseCryptoAdviceAnnotation
    List<GetMeetingVo> getMeetings(GetMeetingsRequest req);

    @DatabaseCryptoAdviceAnnotation
    GetMeetingInfoVo getMeetingInfo(String id);

    String hasMeeting(InsertMeetingRequest req);

    int insertMeeting(InsertMeetingRequest req);

    int insertAttend(InsertAttendVo vo);
}
