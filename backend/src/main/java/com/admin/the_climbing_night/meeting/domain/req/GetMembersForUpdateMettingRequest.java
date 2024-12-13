package com.admin.the_climbing_night.meeting.domain.req;

import com.admin.the_climbing_night.annotations.SectionDecryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMembersForUpdateMettingRequest {
    @SectionDecryptFieldAnnotation
    private String name;

    private String degreeFk;
}
