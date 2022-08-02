package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
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
import java.util.Map;

public class ApplicationProcessesCreateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_processes_create";
    private static final String OUTPUT_ID = "p_application_process_id";

    private final DataSource dataSource;

    public ApplicationProcessesCreateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        this.dataSource = dataSource;

        declareParameter(new SqlOutParameter(OUTPUT_ID, Types.BIGINT)); //declaring sql out parameter

        declareParameter(new SqlParameter("p_applicant_id", Types.INTEGER));
        declareParameter(new SqlParameter("p_status", Types.OTHER));
        declareParameter(new SqlParameter("p_main_application_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_main_application_type", Types.SMALLINT));

        declareParameter(new SqlParameter("p_incoming_numbers", Types.ARRAY));
        declareParameter(new SqlParameter("p_error_message", Types.VARCHAR));
        declareParameter(new SqlParameter("p_signing_guid", Types.OTHER));
        declareParameter(new SqlParameter("p_additional_data", Types.OTHER));

        compile();
    }

    private Array getIncomingNumbersArray(String[] incomingNumbers) throws SQLException {
        try (Connection connection = dataSource.getConnection()){
            return connection.createArrayOf("varchar", incomingNumbers);
        }
    }

    /**TODO Javadoc
     * Stored Procedure for creation of Application Process.
     *
     *
     * @param applicationProcess which will be created.
     *                           ApplicationProcess.User cannot be null and have to have valid id.
     *                           ApplicationProcess.Status cannot be null.
     *                           ApplicationProcess.MainApplication if this field is not null its id and type will be mapped with passed ApplicationProcess
     *
     * @return id of created ApplicationProcess
     */
    public Long execute(ApplicationProcess applicationProcess) {
        if(applicationProcess == null || applicationProcess.getUser() == null
            || applicationProcess.getUser().getUserId() == null || applicationProcess.getStatus() == null) {
            throw new IllegalArgumentException("Passed argument has invalid value/s");
        }

        Long mainApplicationId = applicationProcess.getMainApplication() != null ? applicationProcess.getMainApplication().getApplicationId() : null;
        ApplicationType mainApplicationType =  applicationProcess.getMainApplication() != null && applicationProcess.getMainApplication().getType() != null
            ? applicationProcess.getMainApplication().getType() : null;

        Array incomingNumbers = null;

        if(applicationProcess.getIncomingNumbers() != null && applicationProcess.getIncomingNumbers().length > 0) {
            //Define retry policy which will retry if SQLException is thrown.
            //It can occur if cannot establish connection to database or connection is closed
            RetryPolicy<Object> retryPolicy = new RetryPolicy<>()
                .handle(SQLException.class)
                .withDelay(Duration.ofSeconds(1))
                .withMaxRetries(3);

            incomingNumbers = Failsafe.with(retryPolicy).get(() -> getIncomingNumbersArray(applicationProcess.getIncomingNumbers()));
        }

        Map inParams = new HashMap(8);
        inParams.put("p_applicant_id", applicationProcess.getUser().getUserId());
        inParams.put("p_status", applicationProcess.getStatus());
        inParams.put("p_main_application_id", mainApplicationId);
        inParams.put("p_main_application_type", mainApplicationType);
        inParams.put("p_signing_guid", applicationProcess.getSigningGuid());
        inParams.put("p_incoming_numbers", incomingNumbers);
        inParams.put("p_error_message", applicationProcess.getErrorMessage());
        inParams.put("p_additional_data", applicationProcess.getAdditionalData());

        return (Long) super.execute(inParams).get(OUTPUT_ID);
    }
}
