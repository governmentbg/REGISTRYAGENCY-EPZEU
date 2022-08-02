package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfProperty;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.RequestForReportOfPropertyDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.api.application.GroupReportForPropertyDto;
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

@Component
public class RequestForReportOfPropertyProvider extends BaseReportProvider {
    private final UserWebClient userWebClient;
    private final Validator requestForReportOfPropertyValidator;
    private final LabelMessageSource labelMessageSource;

    public RequestForReportOfPropertyProvider(JsonObjectMapper jsonObjectMapper, UserWebClient userWebClient,
                                              Validator requestForReportOfPropertyValidator,
                                              LabelMessageSource labelMessageSource) {
        super(jsonObjectMapper);

        this.userWebClient = userWebClient;
        this.requestForReportOfPropertyValidator = requestForReportOfPropertyValidator;
        this.labelMessageSource = labelMessageSource;
    }

    @Override
    public GroupReportForPropertyDto buildNewInstanceOfApplicationDto() {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();

        var groupReportForPersonDto = new GroupReportForPropertyDto();
        groupReportForPersonDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDtoFromLoginSessionDto(loginSessionDto));

        return groupReportForPersonDto;
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            RequestForReportOfProperty application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);

            return jsonObjectMapper.writeObjectAsString(RequestForReportOfPropertyDtoMapper.asDto(application));
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm REQUEST_FOR_REPORT_FOR_PROPERTY cannot be serialized to JSON", e);
        }
    }

    @Override
    public void validateAuthenticationType() throws ApplicationDataException {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();
        if (loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.CERTIFICATE && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.NRA) {
            throw new ApplicationDataException("GL_EP_USR_NOT_SERTIFICATE_LOGIN_E", labelMessageSource.getMessage("GL_EP_USR_NOT_SERTIFICATE_LOGIN_E"));
        }
    }

    @Override
    public List<BaseRequestForReport> fromJsonDraftToApplications(byte[] jsonBytes) throws ApplicationDataException {
        List<BaseRequestForReport> applications;

        try {
            GroupReportForPropertyDto groupReportForPropertyDto = jsonObjectMapper.deserializeJsonToObject(jsonBytes, GroupReportForPropertyDto.class);

            if(groupReportForPropertyDto.getGdprAgreement() == null || !groupReportForPropertyDto.getGdprAgreement().getGdprAgreementAcceptance()) {
                throw new ApplicationDataException("GL_APP_GDPR_GIVING_CONSENT_E", labelMessageSource.getMessage("GL_APP_GDPR_GIVING_CONSENT_E"));
            }

            applications = RequestForReportOfPropertyDtoMapper.asModels(groupReportForPropertyDto);

            List<ApplicationError> errors = new ArrayList<>();

            applications.forEach(application -> application
                .getGdprAgreement()
                .setGdprAgreementText(labelMessageSource.getMessage("PR_INFORMED_AGREEMENT_TEXT_L")));

            applications.stream().forEach(application -> errors.addAll(requestForReportOfPropertyValidator.validate(application, null)));

            if(errors.size() > 0) {
                throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"), errors);
            }
        } catch (IOException e) {
            throw new ApplicationFormTransformationException("Cannot deserialize report applications from json", e);
        }

        return applications;
    }

    @Override
    public String getXsdFileName() {
        return "RequestForReportOfPropertyFromPropertyRegister.xsd";
    }
}
