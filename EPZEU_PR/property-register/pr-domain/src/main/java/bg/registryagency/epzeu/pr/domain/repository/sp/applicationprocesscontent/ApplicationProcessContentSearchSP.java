package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent;

import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationProcessContentMapper;
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

public class ApplicationProcessContentSearchSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_process_contents_search";
    private static final String REF_APPLICATION_CONTENTS = "ref_application_process_contents";

    private final DataSource dataSource;

    public ApplicationProcessContentSearchSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        this.dataSource = dataSource;

        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_application_ids", Types.ARRAY));
        declareParameter(new SqlParameter("p_type", Types.VARCHAR));

        declareParameter(new SqlOutParameter(REF_APPLICATION_CONTENTS, Types.REF_CURSOR, new ApplicationProcessContentMapper(ApplicationProcessContent.class)));

        compile();
    }

    public Result<ApplicationProcessContent> execute(SearchCriteria.ApplicationProcessContentSearchCriteria
                                                       applicationProcessContentSearchCriteria) {
        Array applicationIds = null;
        if(applicationProcessContentSearchCriteria.getApplicationIds() != null && applicationProcessContentSearchCriteria.getApplicationIds().length > 0) {
            //Define retry policy which will retry if SQLException is thrown.
            //It can occur if cannot establish connection to database or connection is closed
            RetryPolicy<Object> retryPolicy = new RetryPolicy<>()
                .handle(SQLException.class)
                .withDelay(Duration.ofSeconds(1))
                .withMaxRetries(3);

            applicationIds = Failsafe.with(retryPolicy).get(() -> getApplicationIdsArray(applicationProcessContentSearchCriteria.getApplicationIds()));
        }

        Map inParams = new HashMap(3);
        inParams.put("p_application_process_id", applicationProcessContentSearchCriteria.getApplicationProcessId());
        inParams.put("p_application_ids", applicationIds);
        inParams.put("p_type", applicationProcessContentSearchCriteria.getType());

        List<ApplicationProcessContent> applicationProcessContents = (List<ApplicationProcessContent>) super.execute(inParams).get(REF_APPLICATION_CONTENTS);

        return new Result<>(applicationProcessContents);
    }

    private Array getApplicationIdsArray(Long[] applicationIds) throws SQLException {
        try (Connection connection = dataSource.getConnection()){
            return connection.createArrayOf("bigint", applicationIds);
        }
    }
}
