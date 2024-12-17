package com.admin.the_climbing_night.member.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingOfMemberVo {
    private String id;

    private String meetingName;

    private String hostDt;

    private String time;

    private String criticalMeetingYn;

    @SectionEncryptFieldAnnotation
    private String hostName;

    private String climbingAreaName;

    private String winwinYn;
}
