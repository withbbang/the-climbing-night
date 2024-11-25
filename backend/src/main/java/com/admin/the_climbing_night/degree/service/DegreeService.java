package com.admin.the_climbing_night.degree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.the_climbing_night.degree.mapper.DegreeMapper;
import com.admin.the_climbing_night.degree.vo.GetDegreeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DegreeService {
    @Autowired
    DegreeMapper degreeMapper;

    public List<GetDegreeVo> getDegrees() {
        return degreeMapper.getDegrees();
    }
}
