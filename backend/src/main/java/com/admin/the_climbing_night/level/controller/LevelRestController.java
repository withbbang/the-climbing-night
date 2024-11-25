package com.admin.the_climbing_night.level.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.level.service.LevelService;
import com.admin.the_climbing_night.level.vo.GetLevelVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class LevelRestController {
    @Autowired
    private LevelService levelService;

    /**
     * 레벨 리스트 가져오기
     * 
     * @return
     */
    @GetMapping(value = "get-levels")
    public SingleResponse<List<GetLevelVo>> getLevels() {
        SingleResponse<List<GetLevelVo>> response = new SingleResponse<>();

        List<GetLevelVo> getLevels = null;

        try {
            getLevels = levelService.getLevels();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getLevels);

        return response;
    }
}
