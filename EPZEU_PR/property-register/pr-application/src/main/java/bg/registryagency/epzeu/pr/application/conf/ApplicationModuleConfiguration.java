package bg.registryagency.epzeu.pr.application.conf;

import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(IntegrationConfiguration.class)
@ComponentScan(value = "bg.registryagency.epzeu.pr.application")
public class ApplicationModuleConfiguration {
}
