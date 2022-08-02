package bg.registryagency.epzeu.pr.domain.conf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Properties;

@Getter
@ConfigurationProperties(prefix = "application.domain", ignoreUnknownFields = false)
public class ApplicationDomainProperties {
    private final Epzeu epzeu = new Epzeu();
    private final Cache cache = new Cache();
    private final Queue queue = new Queue();

    public static class Epzeu {
        @Getter @Setter private int systemUser = ConfigDefaults.Epzeu.systemUser;
        @Getter DataSource dataSource = new DataSource();

        public static class DataSource {
            @Getter @Setter private int maxPoolSize = ConfigDefaults.Epzeu.DataSource.maxPoolSize;
            @Getter @Setter private int minimumIdle = ConfigDefaults.Epzeu.DataSource.minimumIdle;
            @Getter @Setter private int leakDetectionThreshold = ConfigDefaults.Epzeu.DataSource.leakDetectionThreshold;

            @Getter @Setter private int idleTimeout = ConfigDefaults.Epzeu.DataSource.idleTimeout;
            @Getter @Setter private int maxLifetime = ConfigDefaults.Epzeu.DataSource.maxLifetime;
            @Getter @Setter private int connectionTimeout = ConfigDefaults.Epzeu.DataSource.connectionTimeout;

            @Getter Properties dataSourceProperties = new Properties();
        }
    }

    public static class Cache {
        @Getter @Setter private int timeToLiveSeconds = ConfigDefaults.Cache.timeToLiveSeconds;

        @Getter @Setter private long maxEntries = ConfigDefaults.Cache.maxEntries;
    }

    public static class Queue {
        @Getter @Setter private String name;
        @Getter @Setter private boolean listener;
    }
}
