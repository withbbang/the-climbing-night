package com.admin.the_climbing_night.admin.domain.req;

import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAdminsRequest {
    @SectionDecryptFieldAnnotation
    private String name;

    private String degree;

    @SectionDecryptFieldAnnotation
    private String phoneNo;

    private String grade;
}
