package com.admin.the_climbing_night.index.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.index.domain.req.GetSchedulesRequest;
import com.admin.the_climbing_night.index.service.IndexService;
import com.admin.the_climbing_night.index.vo.GetScheduleVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class IndexRestController {
    @Autowired
    private IndexService indexService;

    /**
     * 벙 스케쥴 조회
     * 
     * @param request
     * @return
     */
    @PostMapping(value = "get-schedules")
    public SingleResponse<List<GetScheduleVo>> getSchedules(@RequestBody GetSchedulesRequest request) {
        SingleResponse<List<GetScheduleVo>> response = new SingleResponse<List<GetScheduleVo>>();

        List<GetScheduleVo> getSchedules = null;

        try {
            getSchedules = indexService.getSchedules(request);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getSchedules);

        return response;
    }
}
