package com.admin.the_climbing_night.auth.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JoinVo {
    private String id;

    private String memberFk;

    private String memberId;

    private String password;

    private int grade;
}
