package com.admin.the_climbing_night.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.admin.the_climbing_night.utils.Crypto;
import lombok.extern.slf4j.Slf4j;

/**
 * 데이터베이스 암복호화 Aspect
 */
@Aspect
@Component
@Slf4j
public class DatabaseCryptAspect {
    @Autowired
    private Crypto crypto;

    /**
     * Mapper 전 후로 DTO/VO 의 특정 필드를 암호화
     * 
     * @param joinPoint
     * @return
     * @throws Throwable
     */
    @Around("execution(* com.tutorial.spring_boot_tutorial..mapper.*.*(..))")
    public Object databaseCryptoAspect(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        // Mapper로 전달되는 DTO의 특정 필드를 암호화
        for (Object arg : args) {
            crypto.encryptData(arg);
        }

        // Mapper 호출
        Object result;
        try {
            result = joinPoint.proceed(args);
        } catch (Exception e) {
            log.error("Error: ", e);
            throw e;
        }

        // Mapper에서 반환된 VO의 특정 필드를 복호화
        crypto.decryptData(result);

        return result;
    }
}
