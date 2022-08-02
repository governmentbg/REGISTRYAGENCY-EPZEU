package bg.registryagency.epzeu.pr.integration.conf;

public class ConfigDefaults {
    public interface Cache {
        int timeToLiveSeconds = 1200;//20 min
        long maxEntries = 10000;
        long refreshInterval = 20;//20 sec
    }

    public interface Retry {
        //Seconds
        int duration = 1;
        int retryCount = 4;
    }
}
