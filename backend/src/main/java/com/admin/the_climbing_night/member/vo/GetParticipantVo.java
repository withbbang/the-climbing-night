package com.admin.the_climbing_night.member.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetParticipantVo {
    private String id;

    private String host;

    @SectionEncryptFieldAnnotation
    private String name;

    private String degree;

    private String level;

    private String color;
}
