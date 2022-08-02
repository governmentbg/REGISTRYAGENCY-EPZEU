package bg.registryagency.epzeu.pr.integration.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@JsonComponent
public class LocalZonedDateTimeSerializer extends JsonSerializer<ZonedDateTime> {
    @Override
    public void serialize(ZonedDateTime value, JsonGenerator g, SerializerProvider provider)
        throws IOException
    {
        g.writeString(value.withZoneSameInstant(ZoneId.systemDefault()).toLocalDateTime().toString());
        return;
    }
}
