package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationForUpcomingDealForProperty;
import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.BaseApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.ApplicationForUpcomingDealForPropertyDtoMapper;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ApplicationForUpcomingDealValidator;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForUpcomingDealForPropertyDto;
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
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Provider за осигуряване на заявление от тип Заявление за издаване на заверен препис от �?мотен регистър.
 */
@Component
public class ApplicationForUpcomingDealForPropertyProvider extends BaseApplicationFormProvider {

    private final SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache;
    private final ApplicationForUpcomingDealValidator applicationForUpcomingDealValidator;
    private final LabelMessageSource labelMessageSource;

    public ApplicationForUpcomingDealForPropertyProvider(UserWebClient userWebClient,
                                                         SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache,
                                                         ApplicationForUpcomingDealValidator applicationForUpcomingDealValidator,
                                                         LabelMessageSource labelMessageSource,
                                                         JsonObjectMapper jsonObjectMapper) {
        super(jsonObjectMapper, userWebClient);

        this.specialAccessTypeNomenclatureCache = specialAccessTypeNomenclatureCache;
        this.applicationForUpcomingDealValidator = applicationForUpcomingDealValidator;
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
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY cannot be serialized to JSON Byte Array", e);
        }
    }

    @Override
    public ApplicationFormDto provideApplicationDto(JsonNode additionalData) {
        return buildNewInstanceOfApplicationDto();
    }

    @Override
    public String getXsdFileName() {
        return "ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister.xsd";
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            ApplicationForUpcomingDealForProperty application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);

            return jsonObjectMapper.writeObjectAsString(ApplicationForUpcomingDealForPropertyDtoMapper.asDto(application));
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY cannot be serialized to JSON", e);
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
        //TODO if draft is already created delete it when this validation error is occurred
        AuthenticationToken authentication = (AuthenticationToken)SecurityContextHolder.getContext().getAuthentication();

        if(authentication.getSpecialAccessTypeId() == null) {
            throw new ApplicationDataException("PR_APP_00114_E", labelMessageSource.getMessage("PR_APP_00114_E"));
        } else {
            boolean hasNoRoleForDeclaringUpcomingDeal = authentication.getAuthorities().stream().noneMatch(authority -> authority.getAuthority().equals("PR_APP_FUT_DEAL_DECL"));

            if(hasNoRoleForDeclaringUpcomingDeal) {
                throw new ApplicationDataException("PR_APP_00114_E", labelMessageSource.getMessage("PR_APP_00114_E"));
            }
        }
    }

    @Override
    protected Class getApplicationClass() {
        return ApplicationForUpcomingDealForProperty.class;
    }

    @Override
    public String getApplicationFileName() {
        return "ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister.xml";
    }

    @Override
    public BaseApplicationForm deserializeApplicationFromJson(byte[] jsonContent) throws ApplicationDataException {
        try {
            var applicationDto = jsonObjectMapper.deserializeJsonToObject(jsonContent, ApplicationForUpcomingDealForPropertyDto.class);

            var application = ApplicationForUpcomingDealForPropertyDtoMapper.asModel(applicationDto);

            if(application.getGdprAgreement() == null || !application.getGdprAgreement().getGdprAgreementAcceptance()) {
                throw new ApplicationDataException("GL_APP_GDPR_GIVING_CONSENT_E", labelMessageSource.getMessage("GL_APP_GDPR_GIVING_CONSENT_E"));
            }

            application.getGdprAgreement().setGdprAgreementText(labelMessageSource.getMessage("PR_INFORMED_AGREEMENT_TEXT_L", null, LocaleContextHolder.getLocale()));

            validate(application);

            return application;
        } catch (IOException e) {
            throw new ApplicationFormTransformationException("Cannot deserialize application from JSON", e);
        }
    }

    @Override
    public void validate(ApplicationForm application) throws ApplicationDataException {
        ApplicationForUpcomingDealForProperty applicationForUpcomingDealForProperty = (ApplicationForUpcomingDealForProperty) application;

        AuthenticationToken authentication = (AuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        boolean hasRole = authorities.stream().anyMatch(authority -> authority.getAuthority().equals("PR_APP_FUT_DEAL_DECL"));
        if(!hasRole) {
            throw new ApplicationDataException("PR_APP_REMOVED_ACCESS_RIGHT_E", labelMessageSource.getMessage("PR_APP_REMOVED_ACCESS_RIGHT_E"));
        } else {
            Integer specialAccessTypeId = authentication.getSpecialAccessTypeId();
            SpecialAccessTypeDto specialAccessTypeDto;

            if(specialAccessTypeId == null || !StringUtils.hasText(applicationForUpcomingDealForProperty.getApplicantData().getSpecialAccessType())) {
                throw new ApplicationDataException("PR_APP_REMOVED_ACCESS_RIGHT_E", labelMessageSource.getMessage("PR_APP_REMOVED_ACCESS_RIGHT_E"));
            } else {
                specialAccessTypeDto = specialAccessTypeNomenclatureCache.get(specialAccessTypeId);
            }

            if(!applicationForUpcomingDealForProperty.getApplicantData().getSpecialAccessType().equals(specialAccessTypeDto.getName())) {
                throw new ApplicationDataException("PR_APP_CHANGED_ACCESS_RIGHTS_I", labelMessageSource.getMessage("PR_APP_CHANGED_ACCESS_RIGHTS_I"));
            }
        }

        List<ApplicationError> errors = new ArrayList<>();

        errors.addAll(applicationForUpcomingDealValidator.validate(application, null));



        if(errors.size() > 0) {
            throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"), errors);
        }
    }

    /**
     * Създава нова инстанция на заявление от тип Заявление за деклариране на предстояща сделка с недвижим имот от �?мотен регистър.
     *
     * @return Заявление за деклариране на предстояща сделка с недвижим имот от �?мотен регистър.
     */
    @Override
    public ApplicationForUpcomingDealForPropertyDto buildNewInstanceOfApplicationDto() {
        ApplicationForUpcomingDealForPropertyDto applicationDto = new ApplicationForUpcomingDealForPropertyDto(true);
        applicationDto.getApplicantData().setIndividual(buildApplicantDataDto());

        return applicationDto;
    }
}
