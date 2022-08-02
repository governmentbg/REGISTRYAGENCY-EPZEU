package bg.registryagency.epzeu.pr.web.common.annotation;

import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;

import java.lang.annotation.*;

/**
 * Annotation used for marking of method to be rate limited.
 * Rate limits are configured by Administrator from Admin Module.
 *
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RateLimit {
    RateLimitServiceCode[] serviceCodes() default {};
}
