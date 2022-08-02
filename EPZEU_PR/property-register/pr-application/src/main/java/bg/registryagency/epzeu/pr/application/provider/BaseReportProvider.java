package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationFormDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
public abstract class BaseReportProvider extends BaseProvider implements ApplicationFormReportProvider {

    public BaseReportProvider(JsonObjectMapper jsonObjectMapper) {
        super(jsonObjectMapper);
    }

    @Override
    public byte[] fromApplicationToXmlBytes(BaseRequestForReport requestForReport) {
        try {
            return JaxbUtils.marshalXMLDocumentByModel(requestForReport, super.getXsdSchema(false));
        } catch (IOException | XMLStreamException | SAXException | JAXBException e) {
            throw new ApplicationFormTransformationException("Cannot serialize application for report", e);
        }
    }

    @Override
    public String serializeApplicationAsJsonString(ApplicationFormDto applicationForm) {
        return new String(serializeApplicationAsJsonByteArray(applicationForm), StandardCharsets.UTF_8);
    }

    @Override
    public byte[] serializeApplicationAsJsonByteArray(ApplicationFormDto applicationForm) {
        try {
            return jsonObjectMapper.writeObjectAsByteArray(buildNewInstanceOfApplicationDto());
        } catch (JsonProcessingException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm cannot be serialized to JSON Byte Array", e);
        }
    }

    @Override
    public ApplicationFormDto provideApplicationDto(JsonNode additionalData) {
        return buildNewInstanceOfApplicationDto();
    }
}
