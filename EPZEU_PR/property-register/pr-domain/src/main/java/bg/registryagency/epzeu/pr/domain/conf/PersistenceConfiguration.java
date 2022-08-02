package bg.registryagency.epzeu.pr.domain.conf;

import bg.registryagency.epzeu.pr.domain.PrDataSource;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;
import java.util.concurrent.TimeUnit;

@Configuration
public class PersistenceConfiguration {

    @Primary
    @Bean
    public DataSource dataSource(@Value("${" + AppParameterKey.PR_DB_CONNECTION_STRING + "}") String connectionUrl, ApplicationDomainProperties domainProperties) {
        PrDataSource prDataSource = new PrDataSource(domainProperties);
        prDataSource.setJdbcUrl(connectionUrl);
        prDataSource.setDriverClassName("org.postgresql.Driver");

        prDataSource.setMaximumPoolSize(domainProperties.getEpzeu().getDataSource().getMaxPoolSize());
        prDataSource.setMinimumIdle(domainProperties.getEpzeu().getDataSource().getMinimumIdle());

        prDataSource.setIdleTimeout(domainProperties.getEpzeu().getDataSource().getIdleTimeout());
        prDataSource.setMaxLifetime(domainProperties.getEpzeu().getDataSource().getMaxLifetime());
        prDataSource.setConnectionTimeout(domainProperties.getEpzeu().getDataSource().getConnectionTimeout());
        prDataSource.setLeakDetectionThreshold(domainProperties.getEpzeu().getDataSource().getLeakDetectionThreshold());

        return prDataSource;
    }

    @Primary
    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        DataSourceTransactionManager manager = new DataSourceTransactionManager();
        manager.setDataSource(dataSource);
        return manager;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
