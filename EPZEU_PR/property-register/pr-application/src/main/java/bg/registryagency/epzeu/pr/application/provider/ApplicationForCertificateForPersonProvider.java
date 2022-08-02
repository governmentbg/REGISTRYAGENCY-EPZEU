package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForPerson;
import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BaseApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.ApplicationForCertificateForPersonDtoMapper;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForCertificateForPersonDto;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationFormDto;
import bg.registryagency.epzeu.pr.integration.cache.ApplicationTypeReauNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.ReportWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ServicePriceDto;
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
 * Provider за осигуряване на заявление от тип Заявление за издаване на удостоверение за лице от �?мотен регистър.
 */
@Component
public class ApplicationForCertificateForPersonProvider extends BaseApplicationForCertificateProvider {

    private final Validator applicationForCertificateForPersonValidator;
    private final ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache;
    private final LabelMessageSource labelMessageSource;

    public ApplicationForCertificateForPersonProvider(UserWebClient userWebClient, ApplicationWebClient applicationWebClient,
                                                      Validator applicationForCertificateForPersonValidator,
                                                      ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache,
                                                      ReportWebClient reportWebClient,
                                                      LabelMessageSource labelMessageSource,
                                                      JsonObjectMapper jsonObjectMapper) {
        super(jsonObjectMapper, userWebClient, applicationWebClient, reportWebClient, labelMessageSource);
        this.applicationForCertificateForPersonValidator = applicationForCertificateForPersonValidator;
        this.applicationTypeNomenclatureCache = applicationTypeNomenclatureCache;
        this.labelMessageSource = labelMessageSource;
    }

    @Override
    protected Class getApplicationClass() {
        return ApplicationForCertificateForPerson.class;
    }

    @Override
    public String getXsdFileName() {
        return "ApplicationForIssuingOfCertificateForPersonFromPropertyRegister.xsd";
    }

    @Override
    public String getApplicationFileName() {
        return "ApplicationForIssuingOfCertificateForPersonFromPropertyRegister.xml";
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
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_CERTIFICATE_PERSON cannot be serialized to JSON Byte Array", e);
        }
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            ApplicationForCertificateForPerson application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);
            return jsonObjectMapper.writeObjectAsString(ApplicationForCertificateForPersonDtoMapper.asDto(application));
        } catch (JAXBException | IOException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_CERTIFICATE_PERSON cannot be serialized to JSON", e);
        }
    }

    @Override
    public BaseApplicationForm deserializeApplicationFromJson(byte[] jsonContent) throws ApplicationDataException {
        try {
            var applicationDto = jsonObjectMapper.deserializeJsonToObject(jsonContent, ApplicationForCertificateForPersonDto.class);

            var application = ApplicationForCertificateForPersonDtoMapper.asModel(applicationDto);

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
    public void validateAuthenticationType() throws ApplicationDataException {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();
        if (loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.CERTIFICATE
            && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.NRA
            && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.USERNAME_PASSWORD) {
            throw new ApplicationDataException("GL_EP_USR_NOT_PERMISSION_E", labelMessageSource.getMessage("GL_EP_USR_NOT_PERMISSION_E"));
        }
    }

    @Override
    public void validate(ApplicationForm application) throws ApplicationDataException {
        List<ApplicationError> errors = new ArrayList<>();

        errors.addAll(applicationForCertificateForPersonValidator.validate(application, null));

        if(errors.size() > 0) {
            throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"), errors);
        }
    }

    @Override
    public ApplicationFormDto provideApplicationDto(JsonNode additionalData) throws ApplicationDataException {
        try {
            if (additionalData != null && additionalData.get(ApplicationConstants.ADDITIONAL_DATA_INCOMING_REAU_NUMBER).asText() != null) {
                var applicationForCorrection = getApplicationForCorrection(additionalData);
                return ApplicationForCertificateForPersonDtoMapper.asDto((ApplicationForCertificateForPerson)applicationForCorrection);
            } else {
                return buildNewInstanceOfApplicationDto();
            }
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_CERTIFICATE_PERSON cannot be created", e);
        }
    }

    /**
     * Създава нова инстанция на заявление от тип Заявление за издаване на удостоверение за лице от �?мотен регистър.
     *
     * @return Заявление за издаване на удостоверение за лице от �?мотен регистър.
     */
    @Override
    public ApplicationForCertificateForPersonDto buildNewInstanceOfApplicationDto() {
        var applicationDto = new ApplicationForCertificateForPersonDto(true);
        applicationDto.setApplicantData(buildApplicantDataDto());

        List<ServicePriceDto> prices = applicationTypeNomenclatureCache.get(ApplicationType.APPLICATION_CERTIFICATE_PERSON.getCode()).getPrices();
        if(prices != null && !prices.isEmpty()) {
            applicationDto.getWayOfProvision().setServiceTypeId(prices.get(0).getEpzeuServiceTypeID());
        }

        return applicationDto;
    }
}
