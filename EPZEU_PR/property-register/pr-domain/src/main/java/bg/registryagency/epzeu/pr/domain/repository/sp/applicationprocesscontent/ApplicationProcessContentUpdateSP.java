package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationProcessContentUpdateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_process_contents_update";

    public ApplicationProcessContentUpdateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_process_content_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_type", Types.OTHER));

        compile();
    }

    public void execute(ApplicationProcessContent applicationProcessContent) {
        Map inParams = new HashMap(3);
        inParams.put("p_application_process_content_id", applicationProcessContent.getApplicationProcessContentId());
        inParams.put("p_application_process_id", applicationProcessContent.getApplicationProcess().getApplicationProcessId());
        inParams.put("p_type", applicationProcessContent.getType());

        super.execute(inParams);
    }
}
