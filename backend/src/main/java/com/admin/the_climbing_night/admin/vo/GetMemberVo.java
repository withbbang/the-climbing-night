package com.admin.the_climbing_night.admin.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberVo {
    private String id;

    @SectionEncryptFieldAnnotation
    private String name;

    @SectionEncryptFieldAnnotation
    private String birthDt;

    private String level;

    private String color;

    private String degree;

    @SectionEncryptFieldAnnotation
    private String phoneNo;

    private String winwinYn;

    private String sex;

    private String blackCnt;

    private String dormancyYn;

    private String leaveYn;

    private String banYn;
}
