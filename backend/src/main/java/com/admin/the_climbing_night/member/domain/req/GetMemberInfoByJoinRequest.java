package com.admin.the_climbing_night.member.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;
import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberInfoByJoinRequest {
    @RequiredAnnotation
    @SectionDecryptFieldAnnotation
    private String name;
}
