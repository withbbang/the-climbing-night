package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InsertDegreeRequest {
    @RequiredAnnotation
    private String id;

    @RequiredAnnotation
    private String degree;

    private String description;
}
