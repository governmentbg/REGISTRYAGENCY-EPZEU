package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationForNotCertifiedCopy;
import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.BaseApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.ApplicationForNotCertifiedCopyDtoMapper;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ApplicationForNotCertifiedCopyValidator;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForNotCertifiedCopyDto;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationFormDto;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Provider за осигуряване на заявление от тип Заявление за издаване на незаверен препис от Имотен регистър.
 */
@Component
public class ApplicationForNotCertifiedCopyProvider extends BaseApplicationFormProvider {
    private final ApplicationForNotCertifiedCopyValidator applicationForNotCertifiedCopyValidator;
    private final LabelMessageSource labelMessageSource;

    public ApplicationForNotCertifiedCopyProvider(UserWebClient userWebClient,
                                                  ApplicationForNotCertifiedCopyValidator applicationForNotCertifiedCopyValidator,
                                                  LabelMessageSource labelMessageSource,
                                                  JsonObjectMapper jsonObjectMapper) {
        super(jsonObjectMapper, userWebClient);

        this.applicationForNotCertifiedCopyValidator = applicationForNotCertifiedCopyValidator;
        this.labelMessageSource = labelMessageSource;
    }

    @Override
    public String serializeApplicationAsJsonString(ApplicationFormDto application) {
        return new String(serializeApplicationAsJsonByteArray(application), StandardCharsets.UTF_8);
    }

    @Override
    public byte[] serializeApplicationAsJsonByteArray(ApplicationFormDto application) {
        try {
            return jsonObjectMapper.writeObjectAsByteArray(application);
        } catch (JsonProcessingException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_NOT_CERTIFIED_COPY cannot be serialized to JSON Byte Array", e);
        }
    }

    @Override
    public ApplicationFormDto provideApplicationDto(JsonNode additionalData) {
        return buildNewInstanceOfApplicationDto();
    }

    @Override
    public String getXsdFileName() {
        return "ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister.xsd";
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            ApplicationForNotCertifiedCopy application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);

            return jsonObjectMapper.writeObjectAsString(ApplicationForNotCertifiedCopyDtoMapper.asDto(application));
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_NOT_CERTIFIED_COPY cannot be serialized to JSON", e);
        }
    }

    @Override
    public void validateAuthenticationType() throws ApplicationDataException {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();
        if (loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.CERTIFICATE
            && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.NRA
            && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.USERNAME_PASSWORD) {
            throw new ApplicationDataException("GL_EP_USR_NOT_PERMISSION_E", labelMessageSource.getMessage("GL_EP_USR_NOT_PERMISSION_E"));
        }
    }

    @Override
    protected Class getApplicationClass() {
        return ApplicationForNotCertifiedCopy.class;
    }

    @Override
    public String getApplicationFileName() {
        return "ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister.xml";
    }

    @Override
    public BaseApplicationForm deserializeApplicationFromJson(byte[] jsonContent) throws ApplicationDataException {
        try {
            var applicationDto = jsonObjectMapper.deserializeJsonToObject(jsonContent, ApplicationForNotCertifiedCopyDto.class);

            var application = ApplicationForNotCertifiedCopyDtoMapper.asModel(applicationDto);

            if(application.getGdprAgreement() == null || !application.getGdprAgreement().getGdprAgreementAcceptance()) {
                throw new ApplicationDataException("GL_APP_GDPR_GIVING_CONSENT_E", labelMessageSource.getMessage("GL_APP_GDPR_GIVING_CONSENT_E"));
            }

            application.getGdprAgreement().setGdprAgreementText(labelMessageSource.getMessage("PR_INFORMED_AGREEMENT_TEXT_L"));

            validate(application);

            return application;
        } catch (IOException e) {
            throw new ApplicationFormTransformationException("Cannot deserialize application from JSON", e);
        }
    }

    @Override
    public void validate(ApplicationForm application) throws ApplicationDataException {
        List<ApplicationError> errors = new ArrayList<>();

        errors.addAll(applicationForNotCertifiedCopyValidator.validate(application, null));

        if(errors.size() > 0) {
            throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"), errors);
        }
    }

    /**
     * Създава нова инстанция на заявление от тип Заявление за издаване на удостоверение незаверен препис от Имотен регистър.
     *
     * @return Заявление за издаване на удостоверение за незаверен препис от Имотен регистър.
     */
    @Override
    public ApplicationForNotCertifiedCopyDto buildNewInstanceOfApplicationDto() {
        ApplicationForNotCertifiedCopyDto application = new ApplicationForNotCertifiedCopyDto();
        application.setApplicantData(buildApplicantDataDto());

        return application;
    }
}
