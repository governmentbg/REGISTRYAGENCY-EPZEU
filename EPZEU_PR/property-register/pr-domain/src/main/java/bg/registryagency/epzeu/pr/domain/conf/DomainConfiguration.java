package bg.registryagency.epzeu.pr.domain.conf;

import bg.registryagency.epzeu.pr.application.conf.ApplicationModuleConfiguration;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.*;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.format.FormatterRegistry;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(value = "bg.registryagency.epzeu.pr.domain")
@EnableConfigurationProperties({ApplicationDomainProperties.class})
@EnableTransactionManagement
@Import(ApplicationModuleConfiguration.class)
public class DomainConfiguration {

    /* Note ${…} placeholder has value ${key:default}. This declaration instruct Spring to find a property with key named ‘key’ and assign it’s value. In case property ‘key’ not found, assign value ‘default’ */
    @Configuration
    @Profile(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)
    @PropertySource("classpath:/config/application-domain-${spring.profiles.active:dev}.properties")
    static class LocalDevelopmentPropertySource
    {}

    /* Note ${…} placeholder has value ${key:default}. This declaration instruct Spring to find a property with key named ‘key’ and assign it’s value. In case property ‘key’ not found, assign value ‘default’ */
    @Configuration
    @Profile("!" + ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)
    @PropertySource({"file:./config/application-domain-${spring.profiles.active:dev-vm}.properties"})
    static class ProductionPropertySource
    {}
}
