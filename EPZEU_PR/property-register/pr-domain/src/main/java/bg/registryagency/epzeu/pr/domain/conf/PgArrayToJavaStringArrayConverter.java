package bg.registryagency.epzeu.pr.domain.conf;

import bg.registryagency.epzeu.pr.domain.exception.DbArrayConvertionException;
import lombok.extern.slf4j.Slf4j;
import org.postgresql.jdbc.PgArray;
import org.springframework.core.convert.converter.Converter;

import java.sql.SQLException;

@Slf4j
public class PgArrayToJavaStringArrayConverter implements Converter<PgArray, String[]> {
    @Override
    public String[] convert(PgArray source) {
        try {
            return (String[])source.getArray();
        } catch (SQLException e) {
            log.error(e.getMessage(), e);

            throw new DbArrayConvertionException(e.getLocalizedMessage(), e);
        }
    }
}
