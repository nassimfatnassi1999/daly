package com.saccess.newsservice.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@Aspect
public class LoggingAspect {


    @AfterReturning("execution(void com.saccess.newsservice.services.ScheduledService.*(..))")
    public void logMethodAfterReturning(JoinPoint joinPoint) {
        String name = joinPoint.getSignature().getName();
        log.info("Out of method with success " + name + " : ");
    }
    @AfterThrowing("execution(void com.saccess.newsservice.services.ScheduledService.*(..))")
    public void logMethodAfterThrowing(JoinPoint joinPoint) {
        String name = joinPoint.getSignature().getName();
        log.info("Out of method without success " + name + " : ");
    }
}
