package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationProcessContentReadSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_process_contents_read";
    private static final String OUTPUT_CONTENT = "content";

    public ApplicationProcessContentReadSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_process_content_id", Types.BIGINT));

        declareParameter(new SqlOutParameter(OUTPUT_CONTENT, Types.BINARY)); //declaring sql out parameter
        compile();
    }

    public byte[] execute(Long applicationProcessContentId) {
        Map inParams = new HashMap(1);
        inParams.put("p_application_process_content_id", applicationProcessContentId);

        return (byte[]) super.execute(inParams).get(OUTPUT_CONTENT);
    }
}
