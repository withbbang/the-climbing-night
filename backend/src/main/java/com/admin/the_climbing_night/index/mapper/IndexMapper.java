package com.admin.the_climbing_night.index.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.index.domain.req.GetSchedulesRequest;
import com.admin.the_climbing_night.index.vo.GetScheduleVo;

@Mapper
@Repository
public interface IndexMapper {
    List<GetScheduleVo> getSchedules(GetSchedulesRequest request);
}
