package com.admin.the_climbing_night.meeting.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAttendVo {
    private String id;

    private String meetingFk;

    private String memberFk;
}
