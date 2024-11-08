package com.admin.the_climbing_night.auth.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JoinRequest {
    private String id;

    @RequiredAnnotation
    private String memberId;

    @RequiredAnnotation
    private String password;

    @RequiredAnnotation
    private String name;

    @RequiredAnnotation
    private String birthDt;

    @RequiredAnnotation
    private String phoneNo;
}
