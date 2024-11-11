package com.admin.the_climbing_night.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Map;

/**
 * 공통 유틸 메서드 담는 클래스
 */
public class CommonUtil {

    /**
     * Empty 확인 메서드
     * 
     * @param values
     * @return boolean
     */
    public static boolean isEmpty(Object... values) {
        for (Object value : values) {
            if (value == null) {
                continue;
            }
            if (value instanceof String && !((String) value).isEmpty()) {
                return false;
            }
            if (value instanceof Collection && !((Collection<?>) value).isEmpty()) {
                return false;
            }
            if (value instanceof Map && !((Map<?, ?>) value).isEmpty()) {
                return false;
            }
            if (value instanceof Object[] && ((Object[]) value).length > 0) {
                return false;
            }
            if (!(value instanceof String || value instanceof Collection || value instanceof Map
                    || value instanceof Object[])) {
                return false;
            }
        }

        return true;
    }

    /**
     * 현재 날짜 yyyyMMddHHmmss로 변환
     * 
     * @return String
     */
    public static String getCurrentTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime now = LocalDateTime.now();
        return now.format(formatter);
    }
}
