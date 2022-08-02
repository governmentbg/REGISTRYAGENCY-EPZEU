package bg.registryagency.epzeu.pr.integration.scheduler;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Slf4j
public abstract class BaseCacheRefreshTrigger implements Trigger {
    protected final ApplicationIntegrationProperties properties;
    protected final AppParameterCache appParameterCache;
    protected final DatatypeFactory datatypeFactory;

    public BaseCacheRefreshTrigger(ApplicationIntegrationProperties properties, AppParameterCache appParameterCache) {
        this.properties = properties;
        this.appParameterCache = appParameterCache;
        this.datatypeFactory = DatatypeFactory.newDefaultInstance();
    }

    protected int failCount = 0;

    public abstract Duration getPollingInterval();

    @Override
    public Date nextExecutionTime(TriggerContext triggerContext) {

        Calendar nextExecutionTime =  new GregorianCalendar();
        Date lastActualExecutionTime = triggerContext.lastActualExecutionTime();
        nextExecutionTime.setTime(lastActualExecutionTime != null ? lastActualExecutionTime : new Date());

        Duration pollingInterval = getPollingInterval();

        if(failCount > 3) {
            log.warn("Fails count during refreshing of caches is " + failCount + ", next refreshing will be after 1 minute");
            nextExecutionTime.add(Calendar.MINUTE, 1);

            return nextExecutionTime.getTime();
        } else if(failCount > 30) {
            log.warn("Fails count during refreshing of caches is " + failCount + ", next refreshing will be after 1 hour");
            nextExecutionTime.add(Calendar.HOUR_OF_DAY, 1);

            return nextExecutionTime.getTime();
        }

        int years = pollingInterval.getYears();
        int months = pollingInterval.getMonths();
        int days = pollingInterval.getDays();
        int hours = pollingInterval.getHours();
        int minutes = pollingInterval.getMinutes();
        int seconds = pollingInterval.getSeconds();

        if(years > 0) {
            nextExecutionTime.add(Calendar.YEAR, years);
        }
        if(months>0) {
            nextExecutionTime.add(Calendar.MONTH, months);
        }
        if(days>0) {
            nextExecutionTime.add(Calendar.DAY_OF_MONTH, days);
        }
        if(hours>0) {
            nextExecutionTime.add(Calendar.HOUR_OF_DAY, hours);
        }
        if(minutes>0) {
            nextExecutionTime.add(Calendar.MINUTE, minutes);
        }
        if(seconds>0) {
            nextExecutionTime.add(Calendar.SECOND, seconds);
        }

        return nextExecutionTime.getTime();
    }
}
