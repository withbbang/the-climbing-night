package com.admin.the_climbing_night.meeting.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.meeting.domain.req.GetAdminsForInsertMeetingRequest;
import com.admin.the_climbing_night.meeting.domain.req.GetMeetingsRequest;
import com.admin.the_climbing_night.meeting.domain.req.GetMembersForUpdateMettingRequest;
import com.admin.the_climbing_night.meeting.domain.req.InsertMeetingRequest;
import com.admin.the_climbing_night.meeting.domain.req.UpdateMeetingRequest;
import com.admin.the_climbing_night.meeting.vo.GetAdminForInsertMeeting;
import com.admin.the_climbing_night.meeting.vo.GetAttendVo;
import com.admin.the_climbing_night.meeting.vo.GetClimbingAreaForInsertMeeting;
import com.admin.the_climbing_night.meeting.vo.GetMeetingInfoVo;
import com.admin.the_climbing_night.meeting.vo.GetMeetingStatus;
import com.admin.the_climbing_night.meeting.vo.GetMeetingVo;
import com.admin.the_climbing_night.meeting.vo.GetMemberForUpdateMeetingVo;
import com.admin.the_climbing_night.meeting.vo.GetParticipantsVo;
import com.admin.the_climbing_night.meeting.vo.InsertAttendVo;

@Mapper
@Repository
public interface MeetingMapper {
    List<GetMeetingStatus> getMeetingStatuses();

    List<GetAdminForInsertMeeting> getAdminsForInsertMeeting(GetAdminsForInsertMeetingRequest req);

    List<GetClimbingAreaForInsertMeeting> getClimbingAreasForInsertMeeting(String name);

    String hasMeeting(InsertMeetingRequest req);

    long getMeetingCount(String climbingAreaFk);

    int insertMeeting(InsertMeetingRequest req);

    @DatabaseCryptoAdviceAnnotation
    List<GetMeetingVo> getMeetings(GetMeetingsRequest req);

    @DatabaseCryptoAdviceAnnotation
    GetMeetingInfoVo getMeetingInfo(String id);

    List<GetParticipantsVo> getParticipants(String id);

    List<GetMemberForUpdateMeetingVo> getMembers(GetMembersForUpdateMettingRequest req);

    int insertAttend(InsertAttendVo vo);

    List<GetAttendVo> getAttends(String meetingFk);

    void deleteAttends(List<String> deleteAttends);

    void insertAttends(List<InsertAttendVo> insertAttendsVo);

    int updateMeeting(UpdateMeetingRequest req);
}
