package com.admin.the_climbing_night.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberVo {
    private String id;

    private String name;

    private String birthDt;

    private String level;

    private String degree;

    private String color;
}
