package bg.registryagency.epzeu.pr.domain.repository.sp.user;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class AppUserEnsureSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.USR + ".f_app_users_ensure";
    private static final String OUTPUT_ID = "p_user_id";

    public AppUserEnsureSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_cin", Types.INTEGER));
        declareParameter(new SqlParameter("p_display_name", Types.VARCHAR));
        declareParameter(new SqlParameter("p_is_system", Types.BOOLEAN));

        declareParameter(new SqlOutParameter(OUTPUT_ID, Types.INTEGER));

        compile();
    }

    public Integer execute(User user)throws DataAccessException {
        Map inParams = new HashMap(3);
        inParams.put("p_cin", user.getCin());
        inParams.put("p_display_name", user.getDisplayName());
        inParams.put("p_is_system", user.getIsSystem());

        return (Integer) super.execute(inParams).get(OUTPUT_ID);
    }
}
