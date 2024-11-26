package com.admin.the_climbing_night.auth.vo;

import com.admin.the_climbing_night.annotations.DatabaseCryptoFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginVo {
    private String memberId;

    private String password;

    private String grade;

    private String name;
}
