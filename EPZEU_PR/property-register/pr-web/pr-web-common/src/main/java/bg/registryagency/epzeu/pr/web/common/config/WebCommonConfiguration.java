package bg.registryagency.epzeu.pr.web.common.config;

import bg.registryagency.epzeu.pr.domain.conf.DomainConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(value = "bg.registryagency.epzeu.pr.web.common")
@Import(DomainConfiguration.class)
public class WebCommonConfiguration {

}
