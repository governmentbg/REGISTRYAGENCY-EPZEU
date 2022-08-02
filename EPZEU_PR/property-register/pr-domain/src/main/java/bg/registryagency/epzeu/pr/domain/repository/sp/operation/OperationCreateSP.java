package bg.registryagency.epzeu.pr.domain.repository.sp.operation;

import bg.registryagency.epzeu.pr.domain.model.Operation;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class OperationCreateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.SYS + ".f_service_operations_create";

    public OperationCreateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_operation_id", Types.VARCHAR));
        declareParameter(new SqlParameter("p_type", Types.OTHER));

        declareParameter(new SqlOutParameter("p_service_operation_id", Types.BIGINT)); //declaring sql out parameter
        declareParameter(new SqlOutParameter("p_is_completed", Types.BOOLEAN)); //declaring sql out parameter
        declareParameter(new SqlOutParameter("p_result", Types.VARCHAR)); //declaring sql out parameter
        declareParameter(new SqlOutParameter("p_next_ops", Types.VARCHAR)); //declaring sql out parameter

        compile();
    }

    public Operation execute(Operation operation) {
        Map inParams = new HashMap(2);
        inParams.put("p_operation_id", operation.getOperationId());
        inParams.put("p_type", operation.getType());

        Map result = super.execute(inParams);
        operation.setServiceOperationId((Long)result.get("p_service_operation_id"));
        if(result.get("p_is_completed") != null) {
            operation.setCompleted((boolean) result.get("p_is_completed"));
        }
        if(result.get("p_result") != null) {
            operation.setResult((String) result.get("p_result"));
        }
        if(result.get("p_next_ops") != null) {
            operation.setNextOperation((String) result.get("p_next_ops"));
        }

        return operation;
    }
}
