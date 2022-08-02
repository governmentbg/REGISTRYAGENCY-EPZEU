package bg.registryagency.epzeu.pr.domain;

import bg.registryagency.epzeu.pr.domain.conf.ApplicationDomainProperties;
import bg.registryagency.epzeu.pr.domain.model.User;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Slf4j
public class PrDataSource extends HikariDataSource {

    private ApplicationDomainProperties properties;

    public PrDataSource(ApplicationDomainProperties properties) {
        super();

        this.properties = properties;

        setDataSourceProperties(properties.getEpzeu().getDataSource().getDataSourceProperties());
    }

    @Override
    public Connection getConnection() throws SQLException {
        Connection connection = super.getConnection();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = null;

        //Check whether type of principal is User, when there is no authenticated UserSecurityContext returns anonymous user who is not of type User
        if(authentication != null && authentication.getPrincipal() instanceof User) {
            user = (User) authentication.getPrincipal();
        } else {
            user = new User(properties.getEpzeu().getSystemUser());
        }

        try (PreparedStatement preparedStatement = connection.prepareStatement("select sys.f_currentuser_set(?)")) {
            preparedStatement.setInt(1, user.getUserId());
            preparedStatement.executeQuery();
        }

        return connection;
    }
}
