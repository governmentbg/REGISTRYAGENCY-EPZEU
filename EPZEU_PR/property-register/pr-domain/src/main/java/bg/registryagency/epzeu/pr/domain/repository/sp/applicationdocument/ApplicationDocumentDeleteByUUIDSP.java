package bg.registryagency.epzeu.pr.domain.repository.sp.applicationdocument;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ApplicationDocumentDeleteByUUIDSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_documents_delete";

    public ApplicationDocumentDeleteByUUIDSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_document_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_backoffice_guid", Types.OTHER));

        compile();
    }

    public void execute(UUID uuid) {
        Map inParams = new HashMap(2);
        inParams.put("p_application_document_id", null);
        inParams.put("p_backoffice_guid", uuid);

        super.execute(inParams);
    }
}
