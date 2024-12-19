package com.admin.the_climbing_night.meeting.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingInfoVo {
    private String meetingId;

    private String meetingName;

    @SectionEncryptFieldAnnotation
    private String hostName;

    private String hostDt;

    private String startTime;

    private String endTime;

    private String criticalMeetingYn;

    private String meetingStatusFk;

    private String climbingAreaFk;

    private String adminId;

    private String climbingAreaName;
}
