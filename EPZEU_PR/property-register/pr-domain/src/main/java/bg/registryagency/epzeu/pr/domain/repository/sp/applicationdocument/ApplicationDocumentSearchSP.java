package bg.registryagency.epzeu.pr.domain.repository.sp.applicationdocument;

import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationDocumentMapper;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import net.jodah.failsafe.Failsafe;
import net.jodah.failsafe.RetryPolicy;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class ApplicationDocumentSearchSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_documents_search";
    private static final String REF_APPLICATION_DOCUMENTS = "ref_application_documents";

    private final DataSource dataSource;

    public ApplicationDocumentSearchSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        this.dataSource = dataSource;

        declareParameter(new SqlParameter("p_application_ids", Types.ARRAY));
        declareParameter(new SqlParameter("p_application_document_ids", Types.ARRAY));

        declareParameter(new SqlOutParameter(REF_APPLICATION_DOCUMENTS, Types.REF_CURSOR, new ApplicationDocumentMapper(ApplicationDocument.class)));

        compile();
    }

    public Result<ApplicationDocument> execute(SearchCriteria.ApplicationDocumentSearchCriteria applicationDocumentSearchCriteria) {
        //Define retry policy which will retry if SQLException is thrown.
        //It can occur if cannot establish connection to database or connection is closed
        Array applicationIdsArray = null;
        Array applicationDocumentIdsArray = null;

        Long[] applicationIds = applicationDocumentSearchCriteria.getApplicationIds();
        Long[] applicationDocumentIds = applicationDocumentSearchCriteria.getApplicationDocumentIds();
        if((applicationIds != null && applicationIds.length > 0) || (applicationDocumentIds != null && applicationDocumentIds.length > 0)) {
            RetryPolicy<Object> retryPolicy = new RetryPolicy<>()
                .handle(SQLException.class)
                .withDelay(Duration.ofSeconds(1))
                .withMaxRetries(3);
            if(applicationIds != null && applicationIds.length > 0) {
                applicationIdsArray = Failsafe.with(retryPolicy).get(() -> getApplicationIdsArray(applicationIds));
            }
            if(applicationDocumentIds != null && applicationDocumentIds.length > 0) {
                applicationDocumentIdsArray = Failsafe.with(retryPolicy).get(() -> getApplicationDocumentsIdsArray(applicationDocumentIds));
            }
        }

        Map inParams = new HashMap(2);
        inParams.put("p_application_ids", applicationIdsArray);
        inParams.put("p_application_document_ids", applicationDocumentIdsArray);

        List<ApplicationDocument> applicationDocuments = (List<ApplicationDocument>) super.execute(inParams).get(REF_APPLICATION_DOCUMENTS);

        return new Result(applicationDocuments);
    }

    private Array getApplicationIdsArray(Long[] applicationIds) throws SQLException {
        try (Connection connection = dataSource.getConnection()){
            return connection.createArrayOf("bigint", applicationIds);
        }
    }

    private Array getApplicationDocumentsIdsArray(Long[] documentIds) throws SQLException {
        try (Connection connection = dataSource.getConnection()){
            return connection.createArrayOf("bigint", documentIds);
        }
    }
}
