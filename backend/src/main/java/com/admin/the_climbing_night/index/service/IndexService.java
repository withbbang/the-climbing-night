package com.admin.the_climbing_night.index.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.the_climbing_night.index.domain.req.GetSchedulesRequest;
import com.admin.the_climbing_night.index.mapper.IndexMapper;
import com.admin.the_climbing_night.index.vo.GetScheduleVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IndexService {
    @Autowired
    IndexMapper indexMapper;

    public List<GetScheduleVo> getSchedules(GetSchedulesRequest request) {
        return indexMapper.getSchedules(request);
    }
}
