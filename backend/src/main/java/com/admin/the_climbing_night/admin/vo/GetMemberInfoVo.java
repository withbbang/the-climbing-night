package com.admin.the_climbing_night.admin.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberInfoVo {
    private String id;

    @SectionEncryptFieldAnnotation
    private String name;

    @SectionEncryptFieldAnnotation
    private String birthDt;

    private String levelFk;

    private String degreeFk;

    @SectionEncryptFieldAnnotation
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

    private String updateReason;

    private String dormancyReason;

    private String leaveReason;

    private String banReason;
}
