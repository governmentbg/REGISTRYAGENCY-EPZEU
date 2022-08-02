package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationProcessContentDeleteSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_process_contents_delete";

    public ApplicationProcessContentDeleteSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_process_content_id", Types.BIGINT));

        compile();
    }

    public void execute(Long applicationProcessContentId) {
        Map inParams = new HashMap(1);
        inParams.put("p_application_process_content_id", applicationProcessContentId);

        super.execute(inParams);
    }
}
