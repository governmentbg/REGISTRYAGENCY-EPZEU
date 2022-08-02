package bg.registryagency.epzeu.pr.web.common.aop.ratelimiting;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.integration.ratelimit.RateLimitService;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.web.common.annotation.RateLimit;
import bg.registryagency.epzeu.pr.web.common.exception.TooManyRequestsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Arrays;

@Aspect
@Slf4j
@RequiredArgsConstructor
public class RateLimitingAspect {
    private final RateLimitService rateLimitService;

    /**
     * Pointcut that matches all Spring beans in the application's main packages.
     */
    @Pointcut("@within(bg.registryagency.epzeu.pr.web.common.annotation.RateLimit) || @annotation(bg.registryagency.epzeu.pr.web.common.annotation.RateLimit)")
    public void rateLimitAnnotationPointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advices.
    }

    @Before("rateLimitAnnotationPointcut()")
    public void limitBefore(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();

        RateLimit rateLimitMethod = signature.getMethod().getAnnotation(RateLimit.class);
        RateLimit rateLimitClass = (RateLimit)signature.getDeclaringType().getAnnotation(RateLimit.class);

        RateLimitServiceCode[] serviceCodes = null;

        if(rateLimitClass != null && rateLimitMethod == null) {
            serviceCodes = rateLimitClass.serviceCodes();
        } else if(rateLimitMethod != null && rateLimitClass == null) {
            serviceCodes = rateLimitMethod.serviceCodes();
        } else if(rateLimitMethod != null && rateLimitClass != null){
            RateLimitServiceCode[] classServiceCodes = rateLimitClass.serviceCodes();
            RateLimitServiceCode[] methodServiceCodes = rateLimitMethod.serviceCodes();

            serviceCodes = Arrays.copyOf(classServiceCodes, classServiceCodes.length + methodServiceCodes.length);
            System.arraycopy(methodServiceCodes, 0, serviceCodes, classServiceCodes.length, methodServiceCodes.length);
        }

        if(serviceCodes == null || serviceCodes.length == 0) {
            serviceCodes = new RateLimitServiceCode[] {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT};
        }

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        User user = null;
        if(!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken) ) {
            user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }

        if(rateLimitService.isReachedLimit(user != null ? user.getCin() : null, request.getRemoteAddr(), serviceCodes)) {
            String message = "Too many requests reached for ip: " + request.getRemoteAddr() + (user != null ? ", cin: " + user.getCin() : "");

            throw new TooManyRequestsException(message);
        }
    }
}
