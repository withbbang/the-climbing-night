package com.admin.the_climbing_night.member.domain.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMeetingsOfMemberRequest {
    private String id;

    private String hostDt;
}
