package com.admin.the_climbing_night.degree.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.degree.vo.GetDegreeVo;

@Mapper
@Repository
public interface DegreeMapper {
    List<GetDegreeVo> getDegrees();
}
