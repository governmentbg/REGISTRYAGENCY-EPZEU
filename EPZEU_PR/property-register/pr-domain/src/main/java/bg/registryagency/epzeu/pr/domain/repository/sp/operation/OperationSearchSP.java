package bg.registryagency.epzeu.pr.domain.repository.sp.operation;

import bg.registryagency.epzeu.pr.domain.model.Operation;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OperationSearchSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.SYS + ".f_service_operations_search";
    private static final String REF_OPERATIONS = "ref_service_operations";

    public OperationSearchSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlOutParameter(REF_OPERATIONS, Types.REF_CURSOR, new BeanPropertyRowMapper(Operation.class)));

        declareParameter(new SqlParameter("p_service_operation_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_operation_id", Types.VARCHAR));
        declareParameter(new SqlParameter("p_type", Types.OTHER));

        compile();
    }

    public Result<Operation> execute(SearchCriteria.OperationSearchCriteria operationSearchCriteria) {
        Map inParams = new HashMap(3);
        inParams.put("p_service_operation_id", operationSearchCriteria.getServiceOperationId());
        inParams.put("p_operation_id", operationSearchCriteria.getOperationId());
        inParams.put("p_type", operationSearchCriteria.getType());

        return new Result((List<Operation>) super.execute(inParams).get(REF_OPERATIONS));
    }
}
