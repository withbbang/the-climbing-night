package com.admin.the_climbing_night.admin.vo;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IsMemberForAdminVo {
    private String id;

    @RequiredAnnotation
    private String name;

    private String birthDt;

    private String levelFk;

    private String degreeFk;
}
