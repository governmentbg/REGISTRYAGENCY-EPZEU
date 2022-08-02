package bg.registryagency.epzeu.pr.domain.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(value = "bg.registryagency.epzeu.pr.domain.repository")
@Import({PersistenceConfiguration.class, ConversionConfiguration.class})
public class DomainRepositoryTestConfiguration {

    @Bean
    public ApplicationDomainProperties applicationDomainProperties() {
        return new ApplicationDomainProperties();
    }
}
