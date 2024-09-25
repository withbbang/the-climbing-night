package com.admin.the_climbing_night.main.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;
import com.admin.the_climbing_night.main.domain.req.MainRequest;
import com.admin.the_climbing_night.main.vo.MainVo;

@Mapper
@Repository
public interface MainMapper {
    @DatabaseCryptoAdviceAnnotation
    MainVo mainMapper(MainRequest req);

    void mainUpdate1(MainRequest req);

    void mainUpdate2(MainRequest req);

    MainVo getSingleTest(String name);
}
