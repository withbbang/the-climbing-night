package com.admin.the_climbing_night.utils;

import org.springframework.stereotype.Component;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class CookieUtil {
    /**
     * Cookie 생성하기
     * 
     * @param name
     * @param value
     * @return
     */
    public Cookie setCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);

        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        return cookie;
    }

    /**
     * Cookie 가져오기
     * 
     * @param req
     * @param name
     * @return
     */
    public String getCookie(HttpServletRequest req, String name) {
        Cookie[] cookies = req.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
