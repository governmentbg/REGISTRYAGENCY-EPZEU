package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent;

import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class ApplicationProcessContentUploadSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_process_contents_upload";

    private JdbcTemplate jdbcTemplate;

    public ApplicationProcessContentUploadSP(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate.getDataSource(), SP_NAME);
        this.jdbcTemplate = jdbcTemplate;

        declareParameter(new SqlParameter("p_application_process_content_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_content", Types.BINARY));
        declareParameter(new SqlParameter("p_offset", Types.INTEGER));
        declareParameter(new SqlParameter("p_length", Types.INTEGER));

        compile();
    }

    public void execute(Long applicationProcessContentId, byte[] content, int offset, int length) {
        Map inParams = new HashMap(4);
        inParams.put("p_application_process_content_id", applicationProcessContentId);
        inParams.put("p_content", content);
        inParams.put("p_offset", offset);
        inParams.put("p_length", length);

        super.execute(inParams);
    }

    public void execute(Long applicationProcessContentId, InputStream content) {
        KeyHolder holder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareCall("{call AP.f_application_process_contents_upload(?, ?, ?, ?)}");
            try {
                ps.setLong(1, applicationProcessContentId);
                ps.setBinaryStream(2, content, content.available());
                ps.setInt(3, 1);
                ps.setInt(4, content.available());

            } catch (IOException e) {//TODO use failsafe to try few times to recover connection
                log.error(e.getMessage(), e);

                throw new UncheckedIOException(e.getMessage(), e);
            }

            return ps;
        }, holder);
    }
}
