package bg.registryagency.epzeu.pr.integration.ratelimit;

import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;

public interface RateLimitService {
    boolean isReachedLimit(Integer cin, String ip, RateLimitServiceCode... serviceCode);
}
