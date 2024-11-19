package com.admin.the_climbing_night.auth.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetIsLoggedInVo {
    private String memberId;

    private String password;

    private String grade;

    private String accessToken;

    private String name;
}
