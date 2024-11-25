package com.admin.the_climbing_night.degree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.Result;
import com.admin.the_climbing_night.common.SingleResponse;
import com.admin.the_climbing_night.degree.service.DegreeService;
import com.admin.the_climbing_night.degree.vo.GetDegreeVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class DegreeRestController {
    @Autowired
    private DegreeService degreeService;

    /**
     * 레벨 리스트 가져오기
     * 
     * @return
     */
    @GetMapping(value = "get-degrees")
    public SingleResponse<List<GetDegreeVo>> getDegrees() {
        SingleResponse<List<GetDegreeVo>> response = new SingleResponse<>();

        List<GetDegreeVo> getDegrees = null;

        try {
            getDegrees = degreeService.getDegrees();
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setResult(new Result(CodeMessage.ER0001));

            return response;
        }

        response.setData(getDegrees);

        return response;
    }
}
