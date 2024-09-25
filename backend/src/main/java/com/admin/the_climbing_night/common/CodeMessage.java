package com.admin.the_climbing_night.common;

/**
 * 응답 코드 및 메세지 Enum
 */
public enum CodeMessage {
    SUCCESS("000000", "성공"), ER0001("ER0001", "실패");

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
