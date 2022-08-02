package bg.registryagency.epzeu.pr.domain.repository.mapper;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ApplicationDocumentMapper extends BeanPropertyRowMapper<ApplicationDocument> {
    public ApplicationDocumentMapper(Class mappedClass) {
        super(mappedClass);
    }

    @Override
    public ApplicationDocument mapRow(ResultSet rs, int rowNumber) throws SQLException {
        ApplicationDocument applicationDocument = super.mapRow(rs, rowNumber);

        applicationDocument.setApplication(new Application(rs.getLong("application_id")));

        return applicationDocument;
    }
}
