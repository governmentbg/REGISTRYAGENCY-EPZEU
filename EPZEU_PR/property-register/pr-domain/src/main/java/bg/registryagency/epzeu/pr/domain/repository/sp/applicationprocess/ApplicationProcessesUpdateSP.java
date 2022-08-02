package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import lombok.NonNull;
import net.jodah.failsafe.Failsafe;
import net.jodah.failsafe.RetryPolicy;
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

public class ApplicationProcessesUpdateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_processes_update";

    private final DataSource dataSource;

    public ApplicationProcessesUpdateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        this.dataSource = dataSource;

        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
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

    public void execute(@NonNull ApplicationProcess applicationProcess) {
        if(applicationProcess.getUser() == null || applicationProcess.getUser().getUserId() == null
            || applicationProcess.getStatus() == null) {
            throw new IllegalArgumentException("Applicant id and application status cannot be null");
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

        Map inParams = new HashMap(9);
        inParams.put("p_application_process_id", applicationProcess.getApplicationProcessId());
        inParams.put("p_applicant_id", applicationProcess.getUser().getUserId());
        inParams.put("p_status", applicationProcess.getStatus());
        inParams.put("p_main_application_id", mainApplicationId);
        inParams.put("p_main_application_type", mainApplicationType != null ? mainApplicationType.getCode() : null);
        inParams.put("p_signing_guid", applicationProcess.getSigningGuid());
        inParams.put("p_incoming_numbers", incomingNumbers);
        inParams.put("p_error_message", applicationProcess.getErrorMessage());
        inParams.put("p_additional_data", applicationProcess.getAdditionalData());

        super.execute(inParams);
    }
}
