package com.admin.the_climbing_night.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.admin.the_climbing_night.utils.Crypto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class SectionCryptoAspect {
    @Autowired
    private Crypto crypto;

    /**
     * 네트워크 구간 파라미터 암복호화
     * 
     * @param joinPoint
     * @throws Throwable
     */
    @Around("execution(* com.admin.the_climbing_night..controller.*RestController.*(..))")
    public Object sectionCryptoAspect(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            crypto.decryptDataForSection(arg);
        }

        Object result;

        try {
            result = joinPoint.proceed(args);
        } catch (Exception e) {
            log.error("Error: ", e);
            throw e;
        }

        crypto.encryptDataForSection(result);

        return result;
    }
}
