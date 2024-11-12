package com.admin.the_climbing_night.meeting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.vo.HasMeetingVo;

@Mapper
@Repository
public interface MeetingMapper {
    String hasMeeting(InsertMeetingRequest req);

    @DatabaseCryptoAdviceAnnotation
    int insertMeeting(InsertMeetingRequest req);
}
