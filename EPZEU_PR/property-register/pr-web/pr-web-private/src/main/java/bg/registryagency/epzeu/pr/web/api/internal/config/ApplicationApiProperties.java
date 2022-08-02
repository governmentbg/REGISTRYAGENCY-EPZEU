package bg.registryagency.epzeu.pr.web.api.internal.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

@ConfigurationProperties(prefix = "application.api", ignoreUnknownFields = false)
public class ApplicationApiProperties {
    @Getter private final Http http = new Http();
    @Getter private final Cors cors = new Cors();
    @Getter private final IpFilter ipFilter = new IpFilter();

    public static class Http {

        public enum Version {V_1_1, V_2_0}

        @Getter private final Http.Cache cache = new Http.Cache();

        /**
         * HTTP version, must be "V_1_1" (for HTTP/1.1) or V_2_0 (for (HTTP/2)
         */
        @Getter @Setter private Version version = ConfigDefaults.Http.version;

        public static class Cache {
            @Getter @Setter private int timeToLiveInDays = ConfigDefaults.Http.Cache.timeToLiveInDays;
        }
    }

    @Getter
    @Setter
    public static class Cors extends CorsConfiguration {
        /**
         * URL path for applying CORS configurations.
         */
        private String path;
    }

    @Getter
    @Setter
    public static class IpFilter {
        /**
         * IP Filter will be applyed to all address which contains restrictedUrlPaths.
         */
        private String[] restrictedUrlPaths;
        /**
         * Allowed IP Addresses.
         */
        private String[] allowedIpAddresses;
    }
}
