package bg.registryagency.epzeu.pr.domain.repository.sp.operation;

import bg.registryagency.epzeu.pr.domain.model.Operation;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class OperationUpdateSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.SYS + ".f_service_operations_update";

    public OperationUpdateSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_service_operation_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_operation_id", Types.VARCHAR));
        declareParameter(new SqlParameter("p_type", Types.OTHER));
        declareParameter(new SqlParameter("p_is_completed", Types.BOOLEAN));
        declareParameter(new SqlParameter("p_result", Types.VARCHAR));
        declareParameter(new SqlParameter("p_next_ops", Types.VARCHAR));

        compile();
    }

    public void execute(Operation operation) {
        Map inParams = new HashMap(6);
        inParams.put("p_service_operation_id", operation.getServiceOperationId());
        inParams.put("p_operation_id", operation.getOperationId());
        inParams.put("p_type", operation.getType());
        inParams.put("p_is_completed", operation.isCompleted());
        inParams.put("p_result", operation.getResult());
        inParams.put("p_next_ops", operation.getNextOperation());

        super.execute(inParams);
    }
}
