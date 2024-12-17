package com.admin.the_climbing_night.member.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberDetailVo {
    private String id;

    @SectionEncryptFieldAnnotation
    private String name;

    private String level;

    private String color;

    private String degree;

    private String grade;
}
