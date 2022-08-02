package bg.registryagency.epzeu.pr.domain.repository.sp.user;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class CurrentUserSetSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.SYS + ".f_currentuser_set";

    public CurrentUserSetSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_userid", Types.INTEGER));

        compile();
    }

    public void execute(Integer userId)throws DataAccessException {
        Map<String, Object> inParams = new HashMap<>(1);
        inParams.put("p_userid", userId);

        super.execute(inParams);
    }
}
