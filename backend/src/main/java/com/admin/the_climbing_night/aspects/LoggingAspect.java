package com.admin.the_climbing_night.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    // /**
    // * Before: 대상 “메서드”가 실행되기 전에 Advice를 실행합니다.
    // *
    // * @param joinPoint
    // */
    // @Before("execution(* com.tutorial.spring_boot_tutorial..controller.*.*(..))")
    // public void loggingBeforeController(JoinPoint joinPoint) {
    // Object[] args = joinPoint.getArgs();

    // String info = "Before: " + joinPoint.getSignature().getName();

    // if (args.length < 1) {
    // log.info(info + " args: []");
    // } else {
    // List<Object> params = Arrays.asList(args);
    // log.info(info + " args: " + params);
    // }
    // }

    // /**
    // * After : 대상 “메서드”가 실행된 후에 Advice를 실행합니다.
    // *
    // * @param joinPoint
    // */
    // @After("execution(* com.tutorial.spring_boot_tutorial..controller.*.*(..))")
    // public void loggingAfterController(JoinPoint joinPoint, Object result) {
    // log.info("After: " + joinPoint.getSignature().getName() + " result: " + result);
    // }

    // /**
    // * AfterReturning: 대상 “메서드”가 정상적으로 실행되고 반환된 후에 Advice를 실행합니다.
    // *
    // * @param joinPoint
    // * @param result
    // */
    // @AfterReturning(pointcut = "execution(*
    // com.tutorial.spring_boot_tutorial..controller.*.*(..))",
    // returning = "result")
    // public void loggingAfterReturningController(JoinPoint joinPoint, Object result) {
    // log.info("AfterReturning: " + joinPoint.getSignature().getName() + " result: " + result);
    // }

    /**
     * AfterThrowing: 대상 “메서드에서 예외가 발생”했을 때 발생하는 Advice.
     *
     * @param joinPoint
     * @param e
     */
    @AfterThrowing(
            pointcut = "execution(* com.tutorial.spring_boot_tutorial..controller.*RestController.*(..))",
            throwing = "e")
    public void loggingAfterThrowingController(JoinPoint joinPoint, Throwable e) {
        log.error("Exception: " + e.getMessage());
    }

    /**
     * Around: 대상 “메서드” 실행 전, 후에 발생하는 Advice.
     *
     * @param joinPoint
     * @return
     * @throws Throwable
     */
    @Around("execution(* com.tutorial.spring_boot_tutorial..controller.*RestController.*(..))")
    public Object loggingAroundController(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Object[] args = joinPoint.getArgs();

        String fullClassName = signature.getDeclaringTypeName();
        String className = fullClassName.substring(fullClassName.lastIndexOf('.') + 1);

        String info = "[ " + className + "." + joinPoint.getSignature().getName() + "]";

        if (args.length < 1) {
            log.info(
                    "\n############################################################################## START ##############################################################################");
            log.info(info + " args: []");
        } else {
            List<Object> params = Arrays.asList(args);
            log.info(
                    "\n############################################################################## START ##############################################################################");
            log.info(info + " args: " + params);
        }

        Object result = joinPoint.proceed();

        log.info("[ " + className + "." + joinPoint.getSignature().getName() + " ] result: "
                + result);
        log.info(
                "\n############################################################################### END ###############################################################################");

        return result;
    }
}
