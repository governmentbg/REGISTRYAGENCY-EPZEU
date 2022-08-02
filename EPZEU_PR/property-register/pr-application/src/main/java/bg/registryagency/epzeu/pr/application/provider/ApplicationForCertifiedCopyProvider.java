package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationForCertifiedCopy;
import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.BaseApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.ApplicationForCertifiedCopyDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.ApplicantData;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForCertifiedCopyDto;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationFormDto;
import bg.registryagency.epzeu.pr.integration.cache.SpecialAccessTypeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.SpecialAccessTypeDto;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.security.AuthenticationToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Provider за осигуряване на заявление от тип Заявление за издаване на заверен препис от Имотен регистър.
 */
@Component
public class ApplicationForCertifiedCopyProvider extends BaseApplicationFormProvider {

    private final Validator applicationForCertifiedCopyValidator;
    private final SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache;
    private final LabelMessageSource labelMessageSource;

    public ApplicationForCertifiedCopyProvider(UserWebClient userWebClient,
                                               Validator applicationForCertifiedCopyValidator,
                                               SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache,
                                               LabelMessageSource labelMessageSource,
                                               JsonObjectMapper jsonObjectMapper) {
        super(jsonObjectMapper, userWebClient);
        this.applicationForCertifiedCopyValidator = applicationForCertifiedCopyValidator;
        this.specialAccessTypeNomenclatureCache = specialAccessTypeNomenclatureCache;
        this.labelMessageSource = labelMessageSource;
    }


    @Override
    protected Class getApplicationClass() {
        return ApplicationForCertifiedCopy.class;
    }

    @Override
    public String getXsdFileName() {
        return "ApplicationForIssuingOfCertifiedCopyFromPropertyRegister.xsd";
    }

    @Override
    public String getApplicationFileName() {
        return "ApplicationForIssuingOfCertifiedCopyFromPropertyRegister.xml";
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
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_CERTIFIED_COPY cannot be serialized to JSON Byte Array", e);
        }
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            ApplicationForCertifiedCopy application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);

            return jsonObjectMapper.writeObjectAsString(ApplicationForCertifiedCopyDtoMapper.asDto(application));
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_CERTIFIED_COPY cannot be serialized to JSON", e);
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
    public BaseApplicationForm deserializeApplicationFromJson(byte[] jsonContent) throws ApplicationDataException {
        try {
            var applicationDto = jsonObjectMapper.deserializeJsonToObject(jsonContent, ApplicationForCertifiedCopyDto.class);

            validateAccessType(applicationDto);

            var application = ApplicationForCertifiedCopyDtoMapper.asModel(applicationDto);

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

    private void validateAccessType(ApplicationForCertifiedCopyDto applicationDto) throws ApplicationDataException {
        if(ApplicantData.ApplicantTypeNomenclature.fromInteger(applicationDto.getApplicantData().getApplicantType()) == ApplicantData.ApplicantTypeNomenclature.OFFICIAL_PERSON) {

            if(!StringUtils.hasText(applicationDto.getApplicantData().getSpecialAccessType())) {
                throw new ApplicationDataException("PR_APP_CHANGED_ACCESS_RIGHTS_I", labelMessageSource.getMessage("PR_APP_CHANGED_ACCESS_RIGHTS_I"));
            }
        }
    }

    @Override
    public void validate(ApplicationForm application) throws ApplicationDataException {

        ApplicationForCertifiedCopy applicationForCertifiedCopy = (ApplicationForCertifiedCopy) application;

        if(applicationForCertifiedCopy.getApplicantData().getApplicantType() == ApplicantData.ApplicantTypeNomenclature.OFFICIAL_PERSON) {
            AuthenticationToken authentication = (AuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
            boolean hasNotRoleForCertifiedCopy = authentication.getAuthorities().stream().noneMatch(authority -> authority.getAuthority().equals("PR_APP_PROVIDE_CERTCOPY_TO_OFFICIAL"));

            if(hasNotRoleForCertifiedCopy) {
                throw new ApplicationDataException("PR_APP_CHANGED_ACCESS_RIGHTS_I", labelMessageSource.getMessage("PR_APP_CHANGED_ACCESS_RIGHTS_I"));
            } else {
                Integer specialAccessTypeId = authentication.getSpecialAccessTypeId();
                SpecialAccessTypeDto specialAccessTypeDto;

                if(specialAccessTypeId == null || !StringUtils.hasText(applicationForCertifiedCopy.getApplicantData().getSpecialAccessType())) {
                    throw new ApplicationDataException("PR_APP_CHANGED_ACCESS_RIGHTS_I", labelMessageSource.getMessage("PR_APP_CHANGED_ACCESS_RIGHTS_I"));
                } else {
                    specialAccessTypeDto = specialAccessTypeNomenclatureCache.get(specialAccessTypeId);
                }

                if(!applicationForCertifiedCopy.getApplicantData().getSpecialAccessType().equals(specialAccessTypeDto.getName())) {
                    throw new ApplicationDataException("PR_APP_CHANGED_ACCESS_RIGHTS_I", labelMessageSource.getMessage("PR_APP_CHANGED_ACCESS_RIGHTS_I"));
                }
            }
        }

        List<ApplicationError> errors = new ArrayList<>();

        errors.addAll(applicationForCertifiedCopyValidator.validate(application, null));

        if(errors.size() > 0) {
            throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"), errors);
        }
    }

    @Override
    public ApplicationFormDto provideApplicationDto(JsonNode additionalData) {
        return buildNewInstanceOfApplicationDto();
    }

    /**
     * Създава нова инстанция на заявление от тип Заявление за издаване на удостоверение заверен препис от Имотен регистър.
     *
     * @return Заявление за издаване на удостоверение за заверен препис от Имотен регистър.
     */
    @Override
    public ApplicationForCertifiedCopyDto buildNewInstanceOfApplicationDto() {
        ApplicationForCertifiedCopyDto applicationDto = new ApplicationForCertifiedCopyDto(true);
        applicationDto.getApplicantData().setIndividual(buildApplicantDataDto());

        return applicationDto;
    }
}
