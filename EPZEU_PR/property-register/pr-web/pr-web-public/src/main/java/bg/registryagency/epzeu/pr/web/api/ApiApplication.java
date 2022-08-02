package bg.registryagency.epzeu.pr.web.api;

import bg.registryagency.epzeu.pr.integration.cache.CacheManager;
import bg.registryagency.epzeu.pr.web.api.config.ApplicationApiProperties;
import bg.registryagency.epzeu.pr.web.api.config.DefaultProfileUtil;
import bg.registryagency.epzeu.pr.web.common.config.WebCommonConfiguration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration;
import org.springframework.boot.autoconfigure.transaction.jta.JtaAutoConfiguration;
import org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;

@ComponentScan
//@EnableAutoConfiguration
@EnableAutoConfiguration(exclude = {
    WebSocketServletAutoConfiguration.class,
    RestTemplateAutoConfiguration.class,
    ErrorMvcAutoConfiguration.class,
    JdbcTemplateAutoConfiguration.class,
    ReactiveSecurityAutoConfiguration.class,
    TransactionAutoConfiguration.class,
    UserDetailsServiceAutoConfiguration.class,
    JtaAutoConfiguration.class,
    JmxAutoConfiguration.class
})
//excludeName = {"CaffeineCacheConfiguration",
//    "GenericCacheConfiguration",
//    "NoOpCacheConfiguration",
//    "SimpleCacheConfiguration"})
@EnableConfigurationProperties({ApplicationApiProperties.class})
@Import(WebCommonConfiguration.class)
@Slf4j
@RequiredArgsConstructor
public class ApiApplication {
    private final Environment env;

    private final ApplicationContext appContext;

    /**
     * Initializes ApiApplication.
     * <p>
     * Spring profiles can be configured with a program arguments --spring.profiles.active=your-active-profile
     * <p>
     */
    @PostConstruct
    public void initApplication() {
//        System.setProperty("com.zaxxer.hikari.housekeeping.periodMs", "5000");

        String[] activeProfiles = env.getActiveProfiles();
        if (activeProfiles.length > 1) {
            log.error("You have misconfigured your application! It should run with one active profile (dev, dev-vm, qa, staging, prod).");
            throw new RuntimeException("Profiles misconfiguration! There are more than one active profiles:" + Arrays.toString(activeProfiles));
        }

        try {
            CacheManager cacheManager = appContext.getBean(CacheManager.class);
            cacheManager.refreshAllEternalCaches();
        } catch (Exception e) {
            log.error("There is error during loading of nomenclatures", e);
            //If there is issue during refreshing of nomenclatures do not interrupt app initialization it will refresh them on next scheduled time
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     * @throws UnknownHostException if the local host name could not be resolved into an address
     */
    public static void main(String[] args) throws UnknownHostException {
        SpringApplication app = new SpringApplication(ApiApplication.class);
//        app.setWebApplicationType(WebApplicationType.REACTIVE);

        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        MDC.put("processPid", Long.toString(ManagementFactory.getRuntimeMXBean().getPid()));
//        MDC.put("processName", ManagementFactory.getRuntimeMXBean().getName());

        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        if(log.isInfoEnabled()) {
            log.info("\n----------------------------------------------------------\n\t" +
                    "Application '{}' is running! Access URLs:\n\t" +
                    "Local: \t\t{}://localhost:{}\n\t" +
                    "External: \t{}://{}:{}\n\t" +
                    "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol,
                env.getProperty("server.port"),
                protocol,
                InetAddress.getLocalHost().getHostAddress(),
                env.getProperty("server.port"),
                env.getActiveProfiles());
        }
    }
}
