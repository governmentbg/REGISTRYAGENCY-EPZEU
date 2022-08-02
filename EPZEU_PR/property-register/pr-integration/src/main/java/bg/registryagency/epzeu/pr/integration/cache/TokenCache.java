package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.security.AccessToken;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Expiry;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class TokenCache implements Cache<String, AccessToken> {
    private final static String CACHE_NAME = "access-token";

    private final CaffeineCache caffeineCache;

    public TokenCache() {
        caffeineCache = new CaffeineCache(CACHE_NAME, Caffeine.newBuilder()
            .expireAfter(new Expiry<>() {
                @Override
                public long expireAfterCreate(
                    Object key, Object value, long currentTime) {
                    long expiresIn = ((AccessToken) value).getExpiresIn();
                    return TimeUnit.SECONDS.toNanos(expiresIn);
                }

                @Override
                public long expireAfterUpdate(
                    Object key, Object value, long currentTime, long currentDuration) {
                    return currentDuration;
                }

                @Override
                public long expireAfterRead(
                    Object key, Object value, long currentTime, long currentDuration) {
                    return currentDuration;
                }
            }).build());
    }


    @Override
    public AccessToken get(String key) {
        return caffeineCache.get(key, AccessToken.class);
    }

    @Override
    public void put(String key, AccessToken object) {
        caffeineCache.put(key, object);
    }
}
