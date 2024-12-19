package com.admin.the_climbing_night.member.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingDetailVo {
    private String meetingName;

    private String hostDt;

    private String startTime;

    private String endTime;

    private String criticalMeetingYn;

    private String status;

    private String winwinYn;

    private String climbingAreaName;

    @SectionEncryptFieldAnnotation
    private String hostName;
}
