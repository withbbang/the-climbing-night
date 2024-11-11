package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EditMemberRequest {
    @RequiredAnnotation
    private String id;

    @RequiredAnnotation
    private String name;

    @RequiredAnnotation
    private String birthDt;

    private String level;

    private String degree;

    private String phoneNo;

    private String winwinYn;

    private String sex;

    private String blackCnt;

    private String dormancyYn;

    private String leaveYn;

    private String banYn;

    private String joinDt;

    private String updateDt;

    private String leaveDt;

    private String banDt;

    private String image;

    @RequiredAnnotation
    private String updateReason;

    private String dormancyReason;

    private String leaveReason;

    private String banReason;
}
