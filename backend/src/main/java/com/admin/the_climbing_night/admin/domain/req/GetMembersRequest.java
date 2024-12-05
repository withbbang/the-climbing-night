package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMembersRequest {
    @SectionDecryptFieldAnnotation
    private String name;

    private String startBirthDt;

    private String endBirthDt;

    private String levelFk;

    private String degreeFk;

    @SectionDecryptFieldAnnotation
    private String phoneNo;

    private String winwinYn;

    private String sex;

    private int blackCnt;

    private String dormancyYn;

    private String leaveYn;

    private String banYn;

    private String startJoinDt;

    private String endJoinDt;

    private String startLeaveDt;

    private String endLeaveDt;

    private String startBanDt;

    private String endBanDt;
}
