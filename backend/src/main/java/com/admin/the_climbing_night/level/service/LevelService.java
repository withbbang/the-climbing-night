package com.admin.the_climbing_night.level.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.the_climbing_night.level.mapper.LevelMapper;
import com.admin.the_climbing_night.level.vo.GetLevelVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LevelService {
    @Autowired
    LevelMapper levelMapper;

    public List<GetLevelVo> getLevels() {
        return levelMapper.getLevels();
    }
}
