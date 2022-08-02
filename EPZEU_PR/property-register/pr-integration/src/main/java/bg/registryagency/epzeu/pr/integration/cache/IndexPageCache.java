package bg.registryagency.epzeu.pr.integration.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class IndexPageCache extends BaseCache<String, String> {

    public IndexPageCache() {
        super(Caffeine.newBuilder().expireAfterWrite(30L, TimeUnit.SECONDS).build());
    }
}
