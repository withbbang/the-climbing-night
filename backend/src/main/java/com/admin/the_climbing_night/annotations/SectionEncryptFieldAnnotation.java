package com.admin.the_climbing_night.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 네트워크 구간 암호화 DTO/VO의 특정 필드 용 Annotation
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SectionEncryptFieldAnnotation {
}
