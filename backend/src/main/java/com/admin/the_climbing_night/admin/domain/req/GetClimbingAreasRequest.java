package com.admin.the_climbing_night.admin.domain.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetClimbingAreasRequest {
    private String name;

    private String price;

    private String winPrice;

    private String address;

    private String winwinYn;

    private String closeYn;
}
