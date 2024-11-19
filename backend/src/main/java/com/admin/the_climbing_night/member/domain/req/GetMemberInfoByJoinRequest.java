package com.admin.the_climbing_night.member.domain.req;

import com.admin.the_climbing_night.annotations.RequiredAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberInfoByJoinRequest {
    @RequiredAnnotation
    private String name;
}
