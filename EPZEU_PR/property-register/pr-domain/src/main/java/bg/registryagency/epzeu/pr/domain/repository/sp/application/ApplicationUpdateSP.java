package bg.registryagency.epzeu.pr.domain.repository.sp.application;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationUpdateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_applications_update";

    public ApplicationUpdateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_application_content_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_order", Types.SMALLINT));
        declareParameter(new SqlParameter("p_application_type_id", Types.SMALLINT));
        declareParameter(new SqlParameter("p_additional_data", Types.OTHER));

        compile();
    }

    public void execute(Application application) {
        Map inParams = new HashMap(6);
        inParams.put("p_application_id", application.getApplicationId());
        inParams.put("p_application_process_id", application.getApplicationProcess().getApplicationProcessId());
        inParams.put("p_application_content_id", application.getApplicationProcessContent().getApplicationProcessContentId());
        inParams.put("p_order", application.getOrder());
        inParams.put("p_application_type_id", application.getType().getCode());
        inParams.put("p_additional_data", application.getAdditionalData());

        super.execute(inParams);
    }
}
