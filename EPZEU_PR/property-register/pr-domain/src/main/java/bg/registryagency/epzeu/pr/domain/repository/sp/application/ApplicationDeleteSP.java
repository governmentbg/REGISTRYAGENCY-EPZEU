package bg.registryagency.epzeu.pr.domain.repository.sp.application;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationDeleteSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_applications_delete";

    public ApplicationDeleteSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_id", Types.BIGINT));

        compile();
    }

    public void execute(Long applicationId) {
        Map<String, Object> inParams = new HashMap<>(1);
        inParams.put("p_application_id", applicationId);

        super.execute(inParams);
    }
}
