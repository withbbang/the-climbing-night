package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateClimbingAreaRequest {
    @RequiredAnnotation
    private String id;

    private String name;

    private String price;

    private String winPrice;

    private String address;

    private String winwinYn;

    private String closeYn;

    private String createDt;

    private String updateDt;

    private String description;
}
