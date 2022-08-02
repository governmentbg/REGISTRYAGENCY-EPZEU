package bg.registryagency.epzeu.pr.domain.conf;

public class ConfigDefaults {
    interface Epzeu {
        int systemUser = 1;

        interface DataSource {
            int maxPoolSize = 10;
            int minimumIdle = 5;

            int leakDetectionThreshold = 60000;//1 min
            int idleTimeout = 600000;//10 min
            int maxLifetime = 1800000;//30 min
            int connectionTimeout = 30000;//30 sec
        }
    }

    interface Cache {
        int timeToLiveSeconds = 1200;//20 min
        long maxEntries = 10000;
    }
}
