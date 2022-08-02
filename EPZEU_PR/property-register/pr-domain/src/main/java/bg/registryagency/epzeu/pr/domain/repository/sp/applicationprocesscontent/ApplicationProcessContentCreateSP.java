package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import lombok.NonNull;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationProcessContentCreateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_process_contents_create";
    private static final String OUTPUT_ID = "p_application_process_content_id";

    public ApplicationProcessContentCreateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_type", Types.OTHER));

        declareParameter(new SqlOutParameter(OUTPUT_ID, Types.BIGINT)); //declaring sql out parameter
        compile();
    }

    public Long execute(Long applicationProcessId, ApplicationProcessContent.Type type) {
        if(applicationProcessId == null
            || type == null) {
            throw new IllegalArgumentException("Application process id and application content type cannot be null");
        }

        Map inParams = new HashMap(2);
        inParams.put("p_application_process_id", applicationProcessId);
        inParams.put("p_type", type);

        return (Long) super.execute(inParams).get(OUTPUT_ID);
    }

    public Long execute(@NonNull ApplicationProcessContent applicationProcessContent) {
        if(applicationProcessContent.getApplicationProcess() == null
            || applicationProcessContent.getApplicationProcess().getApplicationProcessId() == null
            || applicationProcessContent.getType() == null) {
            throw new IllegalArgumentException("Application process id and application content type cannot be null");
        }

        Map inParams = new HashMap(2);
        inParams.put("p_application_process_id", applicationProcessContent.getApplicationProcess().getApplicationProcessId());
        inParams.put("p_type", applicationProcessContent.getType());

        return (Long) super.execute(inParams).get(OUTPUT_ID);
    }
}
