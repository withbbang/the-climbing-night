package com.admin.the_climbing_night.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetClimbingAreaVo {
    private String id;

    private String name;

    private String price;

    private String winwinYn;

    private String winPrice;

    private String address;

    private String closeYn;
}
