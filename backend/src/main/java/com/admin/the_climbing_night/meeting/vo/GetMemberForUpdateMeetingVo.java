package com.admin.the_climbing_night.meeting.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberForUpdateMeetingVo {
    private String id;

    @SectionEncryptFieldAnnotation
    private String name;

    private String level;

    private String color;
}
