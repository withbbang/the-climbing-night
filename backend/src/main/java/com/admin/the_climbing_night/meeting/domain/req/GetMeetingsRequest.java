package com.admin.the_climbing_night.meeting.domain.req;

import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingsRequest {
    private String meetingName;

    @SectionDecryptFieldAnnotation
    private String hostName;

    private String climbingAreaName;

    private String winwinYn;

    private String criticalMeetingYn;

    private String meetingStatusFk;

    private String startHostDt;

    private String endHostDt;
}
