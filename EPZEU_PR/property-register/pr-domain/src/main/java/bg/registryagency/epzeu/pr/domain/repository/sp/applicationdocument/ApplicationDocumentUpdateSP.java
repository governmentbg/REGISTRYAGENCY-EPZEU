package bg.registryagency.epzeu.pr.domain.repository.sp.applicationdocument;

import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class ApplicationDocumentUpdateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_documents_update";

    public ApplicationDocumentUpdateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_application_document_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_name", Types.VARCHAR));
        declareParameter(new SqlParameter("p_application_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_document_type_id", Types.VARCHAR));
        declareParameter(new SqlParameter("p_file_size", Types.INTEGER));
        declareParameter(new SqlParameter("p_html_template_content", Types.VARCHAR));
        declareParameter(new SqlParameter("p_incoming_number", Types.VARCHAR));
        declareParameter(new SqlParameter("p_backoffice_guid", Types.OTHER));
        declareParameter(new SqlParameter("p_signing_guid", Types.OTHER));

        compile();
    }

    public void execute(ApplicationDocument applicationDocument) {
        Map inParams = new HashMap(9);
        inParams.put("p_application_document_id", applicationDocument.getApplicationDocumentId());
        inParams.put("p_name", applicationDocument.getName());
        inParams.put("p_backoffice_guid", applicationDocument.getBackofficeGuid());
        inParams.put("p_application_id", applicationDocument.getApplication().getApplicationId());
        inParams.put("p_document_type_id", applicationDocument.getDocumentTypeId());
        inParams.put("p_file_size", applicationDocument.getFileSize());
        inParams.put("p_html_template_content", applicationDocument.getHtmlTemplateContent());
        inParams.put("p_incoming_number", applicationDocument.getIncomingNumber());
        inParams.put("p_signing_guid", applicationDocument.getSigningGuid());

        super.execute(inParams);
    }
}
