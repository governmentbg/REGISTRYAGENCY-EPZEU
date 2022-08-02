package bg.registryagency.epzeu.pr.integration.conf;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.cache.CacheManager;
import bg.registryagency.epzeu.pr.integration.scheduler.EpzeuCacheRefreshTrigger;
import bg.registryagency.epzeu.pr.integration.scheduler.PropertyRegisterCacheRefreshTrigger;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class SchedulerConfiguration implements SchedulingConfigurer {
    private final AppParameterCache appParameterCache;
    private final CacheManager cacheManager;
    private final ApplicationIntegrationProperties properties;

    @Bean(destroyMethod = "shutdown")
    public Executor taskExecutor() {
        return Executors.newScheduledThreadPool(2);
    }

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.setScheduler(taskExecutor());
        taskRegistrar.addTriggerTask(
            () -> cacheManager.refreshEternalEpzeuCaches(),
            new EpzeuCacheRefreshTrigger(appParameterCache, properties)
        );
        taskRegistrar.addTriggerTask(
            () -> cacheManager.refreshEternalPrCaches(),
            new PropertyRegisterCacheRefreshTrigger(appParameterCache, cacheManager, properties)
        );
    }
}
