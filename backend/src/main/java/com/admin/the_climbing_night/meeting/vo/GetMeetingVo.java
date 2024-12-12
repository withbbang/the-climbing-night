package com.admin.the_climbing_night.meeting.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingVo {
    private String id;

    private String meetingName;

    @SectionEncryptFieldAnnotation
    private String hostName;

    private String climbingAreaName;

    private String address;

    private String price;

    private String winPrice;

    private String winwinYn;

    private String hostDt;

    private String time;

    private String criticalMeetingYn;

    private String status;

    @SectionEncryptFieldAnnotation
    private String updater;
}
