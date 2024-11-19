package com.admin.the_climbing_night.member.vo;

import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.annotations.DatabaseCryptoFieldAnnotation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetMemberInfoByJoinVo {
    private String id;

    // @DatabaseCryptoFieldAnnotation
    private String name;

    // @DatabaseCryptoFieldAnnotation
    private String birthDt;

    private String degree;
}
