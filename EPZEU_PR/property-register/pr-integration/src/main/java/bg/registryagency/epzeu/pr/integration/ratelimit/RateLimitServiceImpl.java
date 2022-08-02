package bg.registryagency.epzeu.pr.integration.ratelimit;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pb.lyft.ratelimit.RateLimitServiceGrpc;
import pb.lyft.ratelimit.Ratelimit;

import java.util.ArrayList;

@Service
@Slf4j
public class RateLimitServiceImpl implements RateLimitService {
    private final AppParameterCache appParameterCache;
    private RateLimitServiceGrpc.RateLimitServiceBlockingStub rateLimitStub;
    private String rateLimitServiceServer;

    public RateLimitServiceImpl(AppParameterCache appParameterCache) {
        this.appParameterCache = appParameterCache;

        AppParameter appParameter = appParameterCache.get(AppParameterKey.GL_SERVICE_LIMIT_SERVER);
        if(appParameter != null) {
            rateLimitServiceServer = appParameter.getValueString();
            refreshRateLimitStub();
        }
    }

    private void refreshRateLimitStub() {
        ManagedChannel channel = ManagedChannelBuilder
            .forTarget(appParameterCache.get(AppParameterKey.GL_SERVICE_LIMIT_SERVER).getValueString())
            .usePlaintext()
            .build();

        this.rateLimitStub = RateLimitServiceGrpc.newBlockingStub(channel);
    }

    @Override
    public boolean isReachedLimit(Integer cin, String ip, RateLimitServiceCode... serviceCodes) {
        if(appParameterCache.get(AppParameterKey.GL_SERVICE_LIMIT_DISABLED).getValueInt() != 0) {
            return false;
        }

        if(!appParameterCache.get(AppParameterKey.GL_SERVICE_LIMIT_SERVER).getValueString()
            .equals(this.rateLimitServiceServer)) {
            this.rateLimitServiceServer = appParameterCache.get(AppParameterKey.GL_SERVICE_LIMIT_SERVER).getValueString();
            refreshRateLimitStub();
        }

        try {
            var descriptors = new ArrayList<Ratelimit.RateLimitDescriptor>();

            for (RateLimitServiceCode serviceCode : serviceCodes) {
                Ratelimit.RateLimitDescriptor.Entry entry = Ratelimit.RateLimitDescriptor
                    .Entry.newBuilder()
                    .setKey(serviceCode.name())
                    .setValue(cin != null ? String.format("CIN:%s", cin) : String.format("IP:%s", ip))
                    .build();

                descriptors.add(Ratelimit.RateLimitDescriptor.newBuilder().addEntries(entry).build());
            }

            Ratelimit.RateLimitRequest rateLimitRequest = Ratelimit.RateLimitRequest.newBuilder()
                .setDomain(appParameterCache.get(AppParameterKey.GL_SERVICE_LIMIT_DOMAIN).getValueString())
                .addAllDescriptors(descriptors)
                .build();

            Ratelimit.RateLimitResponse rateLimitResponse = rateLimitStub.shouldRateLimit(rateLimitRequest);
            return rateLimitResponse.getOverallCode().equals(Ratelimit.RateLimitResponse.Code.OVER_LIMIT);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            //Do not restrict, if there is some issue with RateLimiter
            return false;
        }
    }
}
