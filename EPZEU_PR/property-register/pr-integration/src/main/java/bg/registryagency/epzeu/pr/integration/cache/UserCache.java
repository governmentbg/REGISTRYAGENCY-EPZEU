package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.security.Client;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class UserCache extends BaseCache<Integer, Client> {

    public UserCache(ApplicationIntegrationProperties properties) {
        super(Caffeine.newBuilder()
            .expireAfterWrite(properties.getCache().getTimeToLiveSeconds(), TimeUnit.SECONDS)
            .maximumSize(properties.getCache().getMaxEntries())
            .build());
    }
}
