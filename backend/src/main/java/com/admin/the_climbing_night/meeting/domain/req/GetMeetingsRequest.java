package com.admin.the_climbing_night.meeting.domain.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingsRequest {
    private String meetingName;

    private String hostName;

    private String climbingAreaName;

    private String winwinYn;

    private String startDt;

    private String endDt;
}
