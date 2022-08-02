package bg.registryagency.epzeu.pr.domain.conf;

import bg.registryagency.epzeu.pr.domain.exception.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.postgresql.util.PGobject;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
public class PGobjectToObjectNodeConverter implements Converter<PGobject, ObjectNode> {
    @Override
    public ObjectNode convert(PGobject source) {
        try {
            return  (ObjectNode) new ObjectMapper().readTree(source.getValue());
        } catch (IOException e) {
            log.error(e.getMessage(), e);

            throw new JsonParseException(e.getLocalizedMessage(), e);
        }
    }
}
