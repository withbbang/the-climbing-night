package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.DatabaseCryptoFieldAnnotation;
import com.admin.the_climbing_night.annotations.RequiredAnnotation;
import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InsertMemberRequest {
    private String id;

    @RequiredAnnotation
    @SectionDecryptFieldAnnotation
    private String name;

    @SectionDecryptFieldAnnotation
    private String birthDt;

    @RequiredAnnotation
    private String levelFk;

    @RequiredAnnotation
    private String degreeFk;

    @SectionDecryptFieldAnnotation
    private String phoneNo;

    @RequiredAnnotation
    private String winwinYn;

    @RequiredAnnotation
    private String sex;

    @RequiredAnnotation
    private String blackCnt;

    @RequiredAnnotation
    private String dormancyYn;

    @RequiredAnnotation
    private String leaveYn;

    @RequiredAnnotation
    private String banYn;

    @RequiredAnnotation
    private String joinDt;

    private String createDt;

    private String updateDt;

    private String leaveDt;

    private String banDt;

    private String image;

    private String updateReason;

    private String dormancyReason;

    private String leaveReason;

    private String banReason;
}
