package com.admin.the_climbing_night.index.domain.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetSchedulesRequest {
    private String year;

    private String month;
}
