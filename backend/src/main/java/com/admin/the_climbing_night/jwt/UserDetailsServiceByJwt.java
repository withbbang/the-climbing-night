package com.admin.the_climbing_night.jwt;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.admin.the_climbing_night.auth.mapper.LoginMapper;
import com.admin.the_climbing_night.auth.vo.GetIsLoggedInVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceByJwt implements UserDetailsService {
    private final LoginMapper loginMapper;
    private final ModelMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String accessToken) throws UsernameNotFoundException {
        GetIsLoggedInVo vo = loginMapper.getIsLoggedIn(accessToken);

        GetIsLoggedInVo newVo = mapper.map(vo, GetIsLoggedInVo.class);

        return new UserDetailsByJwt(newVo);
    }
}
