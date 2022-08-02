package bg.registryagency.epzeu.pr.domain.repository.mapper;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ApplicationProcessContentMapper extends BeanPropertyRowMapper<ApplicationProcessContent> {
    public ApplicationProcessContentMapper(Class mappedClass) {
        super(mappedClass);
    }

    @Override
    public ApplicationProcessContent mapRow(ResultSet rs, int rowNumber) throws SQLException {
        ApplicationProcessContent applicationProcessContent = super.mapRow(rs, rowNumber);

        applicationProcessContent.setApplicationProcess(new ApplicationProcess(rs.getLong("application_process_id")));

        return applicationProcessContent;
    }
}
