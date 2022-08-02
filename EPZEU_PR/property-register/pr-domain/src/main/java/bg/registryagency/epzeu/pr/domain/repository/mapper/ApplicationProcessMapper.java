package bg.registryagency.epzeu.pr.domain.repository.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.stream.Stream;

public class ApplicationProcessMapper extends BeanPropertyRowMapper<ApplicationProcess> {
    public ApplicationProcessMapper(Class mappedClass) {
        super(mappedClass);
    }

    @Override
    public ApplicationProcess mapRow(ResultSet rs, int rowNumber) throws SQLException {
        ApplicationProcess applicationProcess = super.mapRow(rs, rowNumber);
        applicationProcess.setUser(new User(rs.getInt("applicant_id")));

        long mainApplicationId = rs.getLong("main_application_id");
        int mainApplicationTypeId = rs.getInt("main_application_type_id");

        if(mainApplicationId > 0 && mainApplicationTypeId > 0) {
            Application application = new Application(mainApplicationId, ApplicationType.fromInteger(mainApplicationTypeId));
            applicationProcess.setMainApplication(application);
        }

        return applicationProcess;
    }
}
