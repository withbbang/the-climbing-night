package com.admin.the_climbing_night.admin.vo;

import com.admin.the_climbing_night.annotations.DatabaseCryptoFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IsMemberForAdminVo {
    private String id;

    private String name;

    private String birthDt;

    private String levelFk;

    private String degreeFk;
}
