package com.admin.the_climbing_night.meeting.domain.req;

import java.util.List;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateMeetingRequest {
    @RequiredAnnotation
    private String id;

    private String name;

    private String adminFk;

    private String climbingAreaFk;

    private String hostDt;

    private String startTime;

    private String endTime;

    private String updateDt;

    private String criticalMeetingYn;

    private String meetingStatusFk;

    private String updaterId;

    private List<String> memberFks;
}
