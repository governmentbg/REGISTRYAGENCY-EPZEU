package bg.registryagency.epzeu.pr.integration.conf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "application.integration", ignoreUnknownFields = false)
public class ApplicationIntegrationProperties {
    @Getter private final EPZEU epzeu = new EPZEU();
    @Getter private final PropertyRegister pr = new PropertyRegister();
    @Getter private final Security security = new Security();
    @Getter private final Cache cache = new Cache();
    @Getter private final REAU reau = new REAU();
    @Getter private final OIDC oidc = new OIDC();
    @Getter private final Project project = new Project();
    @Getter private final CommercialRegister cr = new CommercialRegister();

    public static class EPZEU {
        @Getter @Setter private String apiBaseUrl;
        @Getter @Setter private String portalBaseUrl;
    }

    public static class CommercialRegister {
        @Getter @Setter private String baseUrl;
    }

    public static class REAU {
        @Getter private final Webapi webapi = new Webapi();

        public static class Webapi {
            @Getter @Setter private String baseUrl;
        }
    }

    public static class PropertyRegister {
        @Getter private final Webapi webapi = new Webapi();
        @Getter private final Portal portal = new Portal();

        public static class Webapi {
            @Getter @Setter private String baseUrl;
        }

        public static class Portal {
            @Getter private final Webapi webapi = new Webapi();
        }
    }

    public static class Security {
        /**
         * Configurations for JSON Web Tokens
         */
        @Getter private final Jwt jwt = new Jwt();
        /**
         * Configurations for Identity Server
         */
        @Getter private final Is is = new Is();

        /**
         * Configuration for JSON Web Token
         */
        public static class Jwt {
            @Getter @Setter private String clientId;
            @Getter @Setter private String clientSecret;
            @Getter @Setter private String scope;
        }

        /**
         * Configuration for Identity Server
         */
        public static class Is {
            /**
             * Url to JSON Web Keys which consists keys for verifying jws(signatures of JSON Web Tokens)
             */
            @Getter @Setter private String jwkUrl;
            /**
             * Base url to Identity Server
             */
            @Getter @Setter private String baseUrl;
            /**
             * Username (used for getting of claims by reference token)
             */
            @Getter @Setter private String username;
            /**
             * Api secret (used for getting of claims by reference token)
             */
            @Getter @Setter private String secret;
        }
    }

    public static class Cache {
        @Getter @Setter private int timeToLiveSeconds = ConfigDefaults.Cache.timeToLiveSeconds;

        @Getter @Setter private long maxEntries = ConfigDefaults.Cache.maxEntries;

        @Getter @Setter private long refreshInterval = ConfigDefaults.Cache.refreshInterval;
    }

    public static class OIDC {
        @Getter @Setter private String autority;
        @Getter @Setter private String clientId;
        @Getter @Setter private String redirectUri;
        @Getter @Setter private String responseType;
        @Getter @Setter private String scope;
        @Getter @Setter private String postLogoutRedirectUri;
        @Getter @Setter private String silentRedirectUri;
    }

    @Getter
    @Setter
    public static class Project {
        /**
         * Project's version
         */
        private String version;
    }
}
