package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InsertClimbingAreaRequest {
    private String id;

    @RequiredAnnotation
    private String name;

    @RequiredAnnotation
    private String price;

    private String winPrice;

    @RequiredAnnotation
    private String address;

    @RequiredAnnotation
    private String winwinYn;

    private String createDt;

    private String updateDt;

    private String description;
}
