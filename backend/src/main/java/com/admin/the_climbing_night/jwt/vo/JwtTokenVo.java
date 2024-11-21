package com.admin.the_climbing_night.jwt.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JwtTokenVo {
    private String memberId;

    private String grade;

    private String name;

    private String accessToken;
}
