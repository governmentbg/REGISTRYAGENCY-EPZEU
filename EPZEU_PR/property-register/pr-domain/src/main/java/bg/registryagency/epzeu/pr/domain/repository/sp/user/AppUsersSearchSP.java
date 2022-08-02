package bg.registryagency.epzeu.pr.domain.repository.sp.user;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AppUsersSearchSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.USR + ".f_app_users_search";
    private static final String REF_USERS = "ref_app_users";

    public AppUsersSearchSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        declareParameter(new SqlParameter("p_user_id", Types.INTEGER));
        declareParameter(new SqlParameter("p_cin", Types.INTEGER));

        declareParameter(new SqlOutParameter(REF_USERS, Types.REF_CURSOR, BeanPropertyRowMapper.newInstance(User.class)));

        compile();
    }
    public User execute(Integer userId, Integer cin)throws DataAccessException {
        Map inParams = new HashMap(2);
        inParams.put("p_user_id", userId);
        inParams.put("p_cin", cin);
        Map result = super.execute(inParams);
        if(!result.isEmpty()) {
            return ((List<User>)super.execute(inParams).get(REF_USERS)).get(0);
        } else {
            return null;
        }
    }
}
