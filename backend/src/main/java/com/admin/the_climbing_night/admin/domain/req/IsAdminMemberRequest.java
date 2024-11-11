package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IsAdminMemberRequest {
    @RequiredAnnotation
    private String memberId;

    @RequiredAnnotation
    private String name;

    @RequiredAnnotation
    private String birthDt;

    @RequiredAnnotation
    private String grade;
}
