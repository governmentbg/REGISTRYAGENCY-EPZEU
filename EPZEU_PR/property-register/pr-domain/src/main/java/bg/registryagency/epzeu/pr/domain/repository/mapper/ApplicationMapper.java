package bg.registryagency.epzeu.pr.domain.repository.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ApplicationMapper extends BeanPropertyRowMapper<Application> {
    public ApplicationMapper(Class mappedClass) {
        super(mappedClass);
    }

    @Override
    public Application mapRow(ResultSet rs, int rowNumber) throws SQLException {
        Application application = super.mapRow(rs, rowNumber);

        application.setApplicationProcess(new ApplicationProcess(rs.getLong("application_process_id")));
        application.setApplicationProcessContent(new ApplicationProcessContent(rs.getLong("application_content_id")));
        application.setType(ApplicationType.fromInteger(rs.getInt("application_type_id")));

        return application;
    }
}
