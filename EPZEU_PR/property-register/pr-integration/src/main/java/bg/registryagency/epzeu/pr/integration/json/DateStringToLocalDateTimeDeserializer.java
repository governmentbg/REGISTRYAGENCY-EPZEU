package bg.registryagency.epzeu.pr.integration.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@JsonDeserialize
public class DateStringToLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

    @Override
    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String dateString = p.getText().trim();

        if(dateString.indexOf('+') != -1 || dateString.indexOf('Z') != -1 || dateString.indexOf('z') != -1) {
            return ZonedDateTime.parse(dateString).toLocalDateTime();
        }

        return LocalDateTime.parse(dateString);
    }
}
