package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;
import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateMemberRequest {
    @RequiredAnnotation
    private String id;

    @RequiredAnnotation
    @SectionDecryptFieldAnnotation
    private String name;

    @RequiredAnnotation
    @SectionDecryptFieldAnnotation
    private String birthDt;

    private String levelFk;

    private String degreeFk;

    @SectionDecryptFieldAnnotation
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
