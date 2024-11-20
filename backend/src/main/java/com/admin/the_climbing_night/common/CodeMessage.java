package com.admin.the_climbing_night.common;

/**
 * 응답 코드 및 메세지 Enum
 */
public enum CodeMessage {
    SUCCESS("000000", "성공"),
    // 0000 ~ 0999: 가입 및 로그인 관련
    ER0001("ER0001", "실패"),
    // 1000 ~ 1999: 인가 관련
    ER1000("ER1000", "찾을 수 없는<br/>계정입니다."),
    ER1001("ER1001", "잘 못된<br/>토큰 정보입니다."),
    ER1002("ER1002", "잘 못 형성된<br/>토큰 정보입니다."),
    ER1003("ER1003", "로그인 만료"),
    ER1004("ER1004", "지원하지 않는<br/>토큰입니다."),

    // 서버 에러 500
    ER9999("ER9999", "실패");

    private String code;
    private String message;

    CodeMessage(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
