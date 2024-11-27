package com.admin.the_climbing_night.admin.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAdminVo {
    private String id;

    @SectionEncryptFieldAnnotation
    private String name;

    private String memberId;

    @SectionEncryptFieldAnnotation
    private String birthDt;

    private String level;

    private String color;

    private String degree;

    @SectionEncryptFieldAnnotation
    private String phoneNo;

    private String grade;
}
