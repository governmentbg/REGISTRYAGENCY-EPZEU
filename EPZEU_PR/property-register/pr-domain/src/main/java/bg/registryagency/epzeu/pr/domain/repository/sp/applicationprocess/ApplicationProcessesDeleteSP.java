package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationProcessesDeleteSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_processes_delete";

    public ApplicationProcessesDeleteSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));

        compile();
    }

    public void execute(Long applicationProcessId) {
        Map inParams = new HashMap(1);
        inParams.put("p_application_process_id", applicationProcessId);

        super.execute(inParams);
    }
}
