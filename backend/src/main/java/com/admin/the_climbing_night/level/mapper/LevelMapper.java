package com.admin.the_climbing_night.level.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.level.vo.GetLevelVo;

@Mapper
@Repository
public interface LevelMapper {
    List<GetLevelVo> getLevels();
}
