package bg.registryagency.epzeu.pr.domain.conf;

import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import lombok.RequiredArgsConstructor;
import oracle.jdbc.pool.OracleDataSource;
import oracle.jms.AQjmsFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.jms.JMSException;
import javax.jms.QueueConnectionFactory;
import javax.sql.DataSource;
import java.sql.SQLException;

@Configuration
@RequiredArgsConstructor
public class OracleAQConfiguration {

    @Bean(name = "oracleDataSource")
    public DataSource oracleDataSource(@Value(value = "${" + AppParameterKey.GL_EPZEU_QUEUES_CONN_STRING_JAVA + "}") String connectionUrl) throws SQLException {
        OracleDataSource oracleDataSource = new OracleDataSource();
        oracleDataSource.setURL(connectionUrl);

        return oracleDataSource;
    }

    @Bean
    public DataSourceTransactionManager oracleTransactionManager(@Qualifier(value = "oracleDataSource") DataSource oracleDataSource) {
        DataSourceTransactionManager manager = new DataSourceTransactionManager();
        manager.setDataSource(oracleDataSource);
        return manager;
    }

    @Bean
    public QueueConnectionFactory connectionFactory(@Qualifier(value = "oracleDataSource") DataSource oracleDataSource) throws JMSException {
        return AQjmsFactory.getQueueConnectionFactory(oracleDataSource);
    }
}
