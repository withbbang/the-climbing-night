package com.admin.the_climbing_night.member.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberForMemberVo {
    private String id;

    @SectionEncryptFieldAnnotation
    private String name;

    private String grade;

    private String degree;

    private String level;

    private String color;

    private String count_this_year;

    private String count_last_1_year;

    private String count_last_3_months;
}
