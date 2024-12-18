package com.admin.the_climbing_night.index.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetScheduleVo {
    private String id;

    private String meetingName;

    private String hostDt;

    private String time;

    private String criticalMeetingYn;

    private String meetingStatusFk;

    private String winwinYn;

    private String climbingAreaName;

    @SectionEncryptFieldAnnotation
    private String hostName;
}
