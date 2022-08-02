package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfDocument;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.RequestForReportOfDocumentDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.RequestForReportOfDocumentValidator;
import bg.registryagency.epzeu.pr.integration.api.application.GroupReportForDocumentDto;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Provider за осигуряване на заявление от тип Заявление на справка чрез отдалечен достъп за документ от Имотен регистър.
 */
@Component
public class RequestForReportOfDocumentProvider extends BaseReportProvider {
    private final UserWebClient userWebClient;
    private final LabelMessageSource labelMessageSource;
    private final RequestForReportOfDocumentValidator validator;

    public RequestForReportOfDocumentProvider(JsonObjectMapper jsonObjectMapper,
                                              UserWebClient userWebClient,
                                              LabelMessageSource labelMessageSource,
                                              RequestForReportOfDocumentValidator validator) {
        super(jsonObjectMapper);

        this.userWebClient = userWebClient;
        this.labelMessageSource = labelMessageSource;
        this.validator = validator;
    }

    /**
     * Създава нова инстанция на заявление от тип Заявление на справка чрез отдалечен достъп за документ от Имотен регистър.
     * @return Заявление на справка чрез отдалечен достъп за документ от Имотен регистър.
     */
    @Override
    public GroupReportForDocumentDto buildNewInstanceOfApplicationDto() {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();

        var groupReportForPersonDto = new GroupReportForDocumentDto();
        groupReportForPersonDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDtoFromLoginSessionDto(loginSessionDto));

        return groupReportForPersonDto;
    }

    @Override
    public String getXsdFileName() {
        return "RequestForReportOfDocumentFromPropertyRegister.xsd";
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            RequestForReportOfDocument application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);

            return jsonObjectMapper.writeObjectAsString(RequestForReportOfDocumentDtoMapper.asDto(application));
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm REQUEST_FOR_REPORT_FOR_DOCUMENT cannot be serialized to JSON", e);
        }
    }

    @Override
    public void validateAuthenticationType() throws ApplicationDataException {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();
        if (loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.CERTIFICATE && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.NRA)  {
            throw new ApplicationDataException("GL_EP_USR_NOT_SERTIFICATE_LOGIN_E", labelMessageSource.getMessage("GL_EP_USR_NOT_SERTIFICATE_LOGIN_E"));
        }
    }

    @Override
    public List<BaseRequestForReport> fromJsonDraftToApplications(byte[] jsonBytes) throws ApplicationDataException {
        List<BaseRequestForReport> applications;

        try {
            GroupReportForDocumentDto groupReportForDocumentDto = jsonObjectMapper.deserializeJsonToObject(jsonBytes, GroupReportForDocumentDto.class);

            if(groupReportForDocumentDto.getGdprAgreement() == null || !groupReportForDocumentDto.getGdprAgreement().getGdprAgreementAcceptance()) {
                throw new ApplicationDataException("GL_APP_GDPR_GIVING_CONSENT_E", labelMessageSource.getMessage("GL_APP_GDPR_GIVING_CONSENT_E"));
            }

            applications = RequestForReportOfDocumentDtoMapper.asModels(groupReportForDocumentDto);

            applications.forEach(application -> application
                .getGdprAgreement()
                .setGdprAgreementText(labelMessageSource.getMessage("PR_INFORMED_AGREEMENT_TEXT_L")));

            List<ApplicationError> errors = new ArrayList<>();

            applications.stream().forEach(application -> errors.addAll(validator.validate(application, null)));

            if(errors.size() > 0) {
                throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"), errors);
            }
        } catch (IOException e) {
            throw new ApplicationFormTransformationException("Cannot deserialize report applications from json", e);
        }

        return applications;
    }
}
