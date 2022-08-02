package bg.registryagency.epzeu.pr.domain.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.DefaultConversionService;

@Configuration
public class ConversionConfiguration {
    static {
        DefaultConversionService sharedInstance = (DefaultConversionService)DefaultConversionService.getSharedInstance();
        sharedInstance.addConverter(new PGobjectToObjectNodeConverter());
        sharedInstance.addConverter(new PgArrayToJavaStringArrayConverter());
    }
}
