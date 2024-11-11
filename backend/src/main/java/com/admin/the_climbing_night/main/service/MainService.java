package com.admin.the_climbing_night.main.service;

import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.CustomException;
import com.admin.the_climbing_night.jwt.JwtTokenProvider;
import com.admin.the_climbing_night.main.domain.req.MainRequest;
import com.admin.the_climbing_night.main.mapper.MainMapper;
import com.admin.the_climbing_night.main.vo.MainVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainService {
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    MainMapper mainMapper;

    private final ModelMapper modelMapper;

    public MainVo mainService(MainRequest req) {
        return mainMapper.mainMapper(req);
    }

    @Transactional
    public void mainUpdate(MainRequest req) {
        mainMapper.mainUpdate1(req);
        mainMapper.mainUpdate2(req);

        throw new RuntimeException("트랜잭션 테스트 에러발생");
    }

    public Map<String, String> login(MainRequest req) throws Exception {
        MainVo vo = mainMapper.getSingleTest(req.getName());

        if (vo == null) {
            throw new CustomException(CodeMessage.ER0001);
        }

        MainVo newVo = modelMapper.map(vo, MainVo.class);

        // Map<String, String> token = jwtTokenProvider.createToken(newVo);
        Map<String, String> token = null;

        return token;
    }
}
