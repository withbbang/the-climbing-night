package com.admin.the_climbing_night.admin.domain.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMembersRequest {
    private String name;

    private String birthDt;

    private String levelFk;

    private String degreeFk;

    private String phoneNo;

    private String winwinYn;

    private String sex;

    private int blackCnt;

    private String dormancyYn;

    private String leaveYn;

    private String banYn;
}
