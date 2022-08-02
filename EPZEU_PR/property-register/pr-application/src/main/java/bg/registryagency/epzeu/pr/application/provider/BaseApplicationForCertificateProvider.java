package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.BaseApplicationForCertificate;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.segment.InitialApplicationData;
import bg.registryagency.epzeu.pr.application.segment.RegisterType;
import bg.registryagency.epzeu.pr.application.segment.RegistryOffice;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.ReportWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusEnum;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.core.io.ByteArrayResource;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class BaseApplicationForCertificateProvider extends BaseApplicationFormProvider {

    private final ApplicationWebClient applicationWebClient;
    private final ReportWebClient reportWebClient;
    private final LabelMessageSource labelMessageSource;

    public BaseApplicationForCertificateProvider(JsonObjectMapper jsonObjectMapper, UserWebClient userWebClient,
                                                 ApplicationWebClient applicationWebClient, ReportWebClient reportWebClient,
                                                 LabelMessageSource labelMessageSource) {
        super(jsonObjectMapper, userWebClient);
        this.applicationWebClient = applicationWebClient;
        this.reportWebClient = reportWebClient;
        this.labelMessageSource = labelMessageSource;
    }

    protected InitialApplicationData createInitialApplicationData(JsonNode additionalData) {
        InitialApplicationData initialApplicationData = new InitialApplicationData();
        initialApplicationData.setIncomingReauNumber(additionalData.get(ApplicationConstants.ADDITIONAL_DATA_INCOMING_REAU_NUMBER).asText());
        initialApplicationData.setRegisterNumber(additionalData.get("registerNumber").asInt());
        initialApplicationData.setRegisterDate(LocalDate.parse(additionalData.get("registerDate").asText(), DateTimeFormatter.ISO_DATE_TIME));
        JsonNode registerType = additionalData.get("registerType");
        initialApplicationData.setRegisterType(new RegisterType(registerType.get("id").asText(), registerType.get("name").asText()));
        JsonNode registryOffice = additionalData.get("registryOffice");
        initialApplicationData.setRegistryOffice(new RegistryOffice(registryOffice.get("id").asText(), registryOffice.get("name").asText(), null));

        return initialApplicationData;
    }

    /**
     * Get application from external service(REAU) and create draft application in PPR for correction.
     * Application can be get for correction only if it is in status WITHOUT_MOVEMENT. If it is in another status exception is thrown
     * @param additionalData
     * @return
     * @throws JAXBException
     * @throws IOException
     */
    protected BaseApplicationForCertificate getApplicationForCorrection(JsonNode additionalData) throws JAXBException, IOException, ApplicationDataException {
        String incomingReauNumber = additionalData.get(ApplicationConstants.ADDITIONAL_DATA_INCOMING_REAU_NUMBER).asText();
        String lastApplicationForCorrectionIdentifier = additionalData.get(ApplicationConstants.ADDITIONAL_DATA_LAST_APPLICATION_FOR_CORRECTION_IDENTIFIER) == null ?
                                                            null :
                                                            additionalData.get(ApplicationConstants.ADDITIONAL_DATA_LAST_APPLICATION_FOR_CORRECTION_IDENTIFIER).asText();

        String incomingReauNumberToLoadFrom = lastApplicationForCorrectionIdentifier == null ? incomingReauNumber : lastApplicationForCorrectionIdentifier;

        ApplicationStatusResponse applicationStatus = reportWebClient.getApplicationStatus(incomingReauNumber, null, null, null, null).block();

        if(applicationStatus == null || applicationStatus.getServiceStatus() != ApplicationStatusEnum.WITHOUT_MOVEMENT.getId()) {
            throw new ApplicationDataException("PR_APP_NOT_IN_STATUS_WITHOUT_MOVEMENT_E", labelMessageSource.getMessage("PR_APP_NOT_IN_STATUS_WITHOUT_MOVEMENT_E"));
        }

        InputStream applicationInputStream = applicationWebClient.getApplicationContent(incomingReauNumberToLoadFrom)
            .flatMap(response -> response.bodyToMono(ByteArrayResource.class)).block().getInputStream();

        BaseApplicationForCertificate application = (BaseApplicationForCertificate) JaxbUtils.unmarshalXMLDocumentToModel(applicationInputStream, null);
        //in any corrective application must set InitialApplicationData of the initiating application
        //if it is not first corrective application we do not replace the section InitialApplicationData
        if(application.getInitialApplicationData() == null) {
            application.setInitialApplicationData(createInitialApplicationData(additionalData));
        }

        return application;
    }
}
