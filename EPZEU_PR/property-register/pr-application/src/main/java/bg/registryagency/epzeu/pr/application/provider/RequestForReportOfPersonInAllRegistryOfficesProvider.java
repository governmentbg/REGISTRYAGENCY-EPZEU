package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfPersonInAllRegistryOffices;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.mapper.RequestForReportOfPersonInAllRegistryOfficesDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.integration.api.application.ReportForPersonInAllRegistryOfficesDto;
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
public class RequestForReportOfPersonInAllRegistryOfficesProvider extends BaseReportProvider{
    private final UserWebClient userWebClient;
    private final LabelMessageSource labelMessageSource;

    public RequestForReportOfPersonInAllRegistryOfficesProvider(JsonObjectMapper jsonObjectMapper, UserWebClient userWebClient, LabelMessageSource labelMessageSource) {
        super(jsonObjectMapper);

        this.userWebClient = userWebClient;
        this.labelMessageSource = labelMessageSource;
    }

    @Override
    public String getXsdFileName() {
        return "RequestForReportOfPersonInAllRegistryOffices.xsd";
    }

    @Override
    public String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream) {
        try {
            RequestForReportOfPersonInAllRegistryOffices application = JaxbUtils.unmarshalXMLDocumentToModel(xmlAppInputStream, null);

            return jsonObjectMapper.writeObjectAsString(RequestForReportOfPersonInAllRegistryOfficesDtoMapper.asDto(application));
        } catch (IOException | JAXBException e) {
            //According to system business logic this exception cannot be recovered, because of that exception is translated to runtime exception - ApplicationFormSerializationException
            throw new ApplicationFormTransformationException("ApplicationForm REQUEST_FOR_REPORT_FOR_PERSON cannot be serialized to JSON", e);
        }
    }

    @Override
    public void validateAuthenticationType() throws ApplicationDataException {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();
        if (loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.CERTIFICATE && loginSessionDto.getAuthenticationType() != AuthenticationTypeEnum.NRA){
            throw new ApplicationDataException("GL_EP_USR_NOT_SERTIFICATE_LOGIN_E", labelMessageSource.getMessage("GL_EP_USR_NOT_SERTIFICATE_LOGIN_E"));
        }
    }

    @Override
    public ReportForPersonInAllRegistryOfficesDto buildNewInstanceOfApplicationDto() {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();

        var reportForPersonDto = new ReportForPersonInAllRegistryOfficesDto();
        reportForPersonDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDtoFromLoginSessionDto(loginSessionDto));

        return reportForPersonDto;
    }

    @Override
    public List<BaseRequestForReport> fromJsonDraftToApplications(byte[] jsonBytes) throws ApplicationDataException {
        List<BaseRequestForReport> applications = new ArrayList<>();

        try {
            ReportForPersonInAllRegistryOfficesDto reportForPersonInAllRegistryOfficesDto = jsonObjectMapper.deserializeJsonToObject(jsonBytes, ReportForPersonInAllRegistryOfficesDto.class);

            if(reportForPersonInAllRegistryOfficesDto.getGdprAgreement() == null || !reportForPersonInAllRegistryOfficesDto.getGdprAgreement().getGdprAgreementAcceptance()) {
                throw new ApplicationDataException("GL_APP_GDPR_GIVING_CONSENT_E", labelMessageSource.getMessage("GL_APP_GDPR_GIVING_CONSENT_E"));
            }

            applications.add(RequestForReportOfPersonInAllRegistryOfficesDtoMapper.asModel(reportForPersonInAllRegistryOfficesDto));

            applications.forEach(application -> application
                .getGdprAgreement()
                .setGdprAgreementText(labelMessageSource.getMessage("PR_INFORMED_AGREEMENT_TEXT_L")));
        } catch (IOException e) {
            throw new ApplicationFormTransformationException("Cannot deserialize report applications from json", e);
        }

        return applications;
    }
}
