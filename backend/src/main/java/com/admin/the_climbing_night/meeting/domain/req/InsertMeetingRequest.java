package com.admin.the_climbing_night.meeting.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InsertMeetingRequest {
    private String id;

    @RequiredAnnotation
    private String name;

    @RequiredAnnotation
    private String adminFk;

    @RequiredAnnotation
    private String memberFk;

    @RequiredAnnotation
    private String climbingAreaFk;

    private String createDt;

    @RequiredAnnotation
    private String hostDt;

    @RequiredAnnotation
    private String startTime;

    @RequiredAnnotation
    private String endTime;

    @RequiredAnnotation
    private String criticalMeetingYn;

    @RequiredAnnotation
    private String meetingStatusFk;
}
