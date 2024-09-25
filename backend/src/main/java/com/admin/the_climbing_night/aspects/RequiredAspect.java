package com.admin.the_climbing_night.aspects;

import java.lang.reflect.Field;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import com.admin.the_climbing_night.annotations.RequiredAnnotation;
import com.admin.the_climbing_night.common.CodeMessage;
import com.admin.the_climbing_night.common.CustomException;
import lombok.extern.slf4j.Slf4j;

/**
 * 필수 파라미터 검증 Aspect
 */
@Aspect
@Component
@Slf4j
public class RequiredAspect {
    @Before("execution(* com.tutorial.spring_boot_tutorial..controller.*.*(..))")
    public void checkRequired(JoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            Field[] fields = arg.getClass().getDeclaredFields();

            for (Field field : fields) {
                if (field.isAnnotationPresent(RequiredAnnotation.class)) {
                    field.setAccessible(true);
                    String originalValue = (String) field.get(arg);
                    if (originalValue == null || originalValue.isEmpty()) {
                        log.error("[{}] is empty", field.getName());
                        throw new CustomException(CodeMessage.ER0001);
                    }
                }
            }
        }
    }
}
