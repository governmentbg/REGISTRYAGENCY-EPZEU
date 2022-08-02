package bg.registryagency.epzeu.pr.web.common.config;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.ratelimit.RateLimitService;
import bg.registryagency.epzeu.pr.web.common.aop.logging.LoggingAspect;
import bg.registryagency.epzeu.pr.web.common.aop.ratelimiting.RateLimitingAspect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

@Configuration
@EnableAspectJAutoProxy
public class AspectConfiguration {

    @Bean
    @Profile(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)
    public LoggingAspect loggingAspect(Environment env) {
        return new LoggingAspect(env);
    }

    @Bean
    public RateLimitingAspect rateLimitingAspect(RateLimitService rateLimitService) {
        return new RateLimitingAspect(rateLimitService);
    }
}
