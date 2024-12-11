package com.admin.the_climbing_night.meeting.vo;

import com.admin.the_climbing_night.annotations.SectionEncryptFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAdminsForInsertMeeting {
    private String id;

    private String memberFk;

    @SectionEncryptFieldAnnotation
    private String name;
}
