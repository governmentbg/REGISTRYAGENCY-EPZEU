package bg.registryagency.epzeu.pr.domain.repository.sp.application;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationDocumentMapper;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationMapper;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationProcessContentMapper;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import net.jodah.failsafe.Failsafe;
import net.jodah.failsafe.RetryPolicy;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.util.CollectionUtils;

import javax.sql.DataSource;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class ApplicationSearchSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_applications_search";
    private static final String REF_APPLICATION = "ref_applications";
    private static final String REF_APPLICATION_CONTENTS = "ref_application_content";
    private static final String REF_APPLICATION_DOCUMENTS = "ref_application_documents";

    private final DataSource dataSource;

    public ApplicationSearchSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        this.dataSource = dataSource;

        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_application_ids", Types.ARRAY));
        declareParameter(new SqlParameter("p_load_application_documents", Types.BOOLEAN));
        declareParameter(new SqlParameter("p_load_application_content", Types.BOOLEAN));

        declareParameter(new SqlOutParameter(REF_APPLICATION, Types.REF_CURSOR, new ApplicationMapper(Application.class)));
        declareParameter(new SqlOutParameter(REF_APPLICATION_CONTENTS, Types.REF_CURSOR, new ApplicationProcessContentMapper(ApplicationProcessContent.class)));
        declareParameter(new SqlOutParameter(REF_APPLICATION_DOCUMENTS, Types.REF_CURSOR, new ApplicationDocumentMapper(ApplicationDocument.class)));

        compile();
    }

    public Result<Application> execute(SearchCriteria.ApplicationSearchCriteria applicationSearchCriteria) {
        Array applicationIds = null;
        if(applicationSearchCriteria.getApplicationIds() != null && applicationSearchCriteria.getApplicationIds().length > 0) {
            //TODO replace Failsafe with SpringRetry
            //Define retry policy which will retry if SQLException is thrown.
            //It can occur if cannot establish connection to database or connection is closed
            RetryPolicy<Object> retryPolicy = new RetryPolicy<>()
                .handle(SQLException.class)
                .withDelay(Duration.ofSeconds(1))
                .withMaxRetries(3);

            applicationIds = Failsafe.with(retryPolicy).get(() -> getApplicationIdsArray(applicationSearchCriteria.getApplicationIds()));
        }

        Map<String, Object> inParams = new HashMap<>(4);
        inParams.put("p_application_process_id", applicationSearchCriteria.getApplicationProcessId());
        inParams.put("p_application_ids", applicationIds);
        inParams.put("p_load_application_documents", applicationSearchCriteria.isLoadApplicationDocuments());
        inParams.put("p_load_application_content", applicationSearchCriteria.isLoadApplicationContents());

        Map<String, Object> result = super.execute(inParams);

        List<Application> applications = (List<Application>) result.get(REF_APPLICATION);

        if(!CollectionUtils.isEmpty(applications)) {
            List<ApplicationDocument> applicationDocuments = new ArrayList<>();
            List<ApplicationProcessContent> applicationProcessContents = new ArrayList<>();

            if (applicationSearchCriteria.isLoadApplicationDocuments()) {
                applicationDocuments = (List<ApplicationDocument>) result.get(REF_APPLICATION_DOCUMENTS);
            }
            if (applicationSearchCriteria.isLoadApplicationContents()) {
                applicationProcessContents = (List<ApplicationProcessContent>) result.get(REF_APPLICATION_CONTENTS);
            }

            if(!applicationDocuments.isEmpty() || !applicationProcessContents.isEmpty()) {
                for (Application application : applications) {
                    for (ApplicationDocument applicationDocument : applicationDocuments) {
                        if(application.getApplicationId().equals(applicationDocument.getApplication().getApplicationId())) {
                            application.addApplicationDocument(applicationDocument);
                        }
                    }

                    for (ApplicationProcessContent applicationProcessContent : applicationProcessContents) {
                        if(application.getApplicationProcessContent().getApplicationProcessContentId().equals(applicationProcessContent.getApplicationProcessContentId())) {
                            application.setApplicationProcessContent(applicationProcessContent);
                        }
                    }
                }
            }
        }

        return new Result<>(applications);
    }

    private Array getApplicationIdsArray(Long[] applicationIds) throws SQLException {
        try (Connection connection = dataSource.getConnection()){
            return connection.createArrayOf("bigint", applicationIds);
        }
    }
}
