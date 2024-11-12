package com.admin.the_climbing_night.meeting.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;

@Mapper
@Repository
public interface MeetingMapper {
    @DatabaseCryptoAdviceAnnotation
    List<GetMeetingVo> getMeetings(GetMeetingsRequest req);

    String hasMeeting(InsertMeetingRequest req);

    @DatabaseCryptoAdviceAnnotation
    int insertMeeting(InsertMeetingRequest req);
}
