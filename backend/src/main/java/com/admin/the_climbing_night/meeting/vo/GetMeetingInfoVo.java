package com.admin.the_climbing_night.meeting.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingInfoVo {
    private String id;

    private String meetingName;

    private String hostName;

    private String climbingAreaName;

    private String address;

    private String price;

    private String winPrice;

    private String winwinYn;

    private String closeYn;

    private String description;

    private String hostDt;

    private String time;

    private String criticalMeetingYn;

    private String status;

    private String count;
}
