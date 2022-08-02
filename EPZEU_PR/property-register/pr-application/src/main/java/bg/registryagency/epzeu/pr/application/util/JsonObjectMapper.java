package bg.registryagency.epzeu.pr.application.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class JsonObjectMapper {
    private final ObjectMapper objectMapper;

    public <T> T deserializeJsonToObject(byte [] bytes, Class<T> clazz) throws IOException {
        return objectMapper
            .readerFor(clazz)
            .readValue(bytes);
    }

    public <T> T deserializeJsonToObject(String json, Class<T> clazz) throws IOException {
        return objectMapper
            .readerFor(clazz)
            .readValue(json);
    }

    public <T> String writeObjectAsString(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }

    public <T> byte[] writeObjectAsByteArray(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsBytes(object);
    }
}
