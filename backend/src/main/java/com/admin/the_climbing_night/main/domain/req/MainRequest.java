package com.admin.the_climbing_night.main.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;
import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MainRequest {
    @RequiredAnnotation
    private String name;

    @RequiredAnnotation
    private String birthDt;

    @RequiredAnnotation
    private String phoneNo;
}
