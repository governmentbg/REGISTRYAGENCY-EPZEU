package bg.registryagency.epzeu.pr.integration.scheduler;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;

import javax.xml.datatype.Duration;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@RequiredArgsConstructor
public class CacheRefreshTrigger implements Trigger {
    private final AppParameterCache appParameterCache;

    @Override
    public Date nextExecutionTime(TriggerContext triggerContext) {
        AppParameter pollingIntervalParameter = appParameterCache.get(AppParameterKey.PR_POLLING_INTERVAL);

        Calendar nextExecutionTime =  new GregorianCalendar();
        Date lastActualExecutionTime = triggerContext.lastActualExecutionTime();
        nextExecutionTime.setTime(lastActualExecutionTime != null ? lastActualExecutionTime : new Date());

        if(pollingIntervalParameter != null) {
            Duration pollingInterval = pollingIntervalParameter.getValueInterval();

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
        }

        return nextExecutionTime.getTime();
    }
}
