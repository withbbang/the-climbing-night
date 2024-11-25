package com.admin.the_climbing_night.main.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MainVo {
    @SectionEncryptFieldAnnotation
    private String name;

    @SectionEncryptFieldAnnotation
    private String password;

    private int grade;
}
