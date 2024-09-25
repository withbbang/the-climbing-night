package com.admin.the_climbing_night.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.admin.the_climbing_night.main.vo.MainVo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class UserDetailsByJwt implements UserDetails {

    private final MainVo vo;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> grades = new ArrayList<>();
        grades.add("GRADE_" + vo.getGrade());

        return grades.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return vo.getPassword();
    }

    @Override
    public String getUsername() {
        return vo.getName().toString();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
