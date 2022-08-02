package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BaseApplicationForm;
import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.provider.*;
import bg.registryagency.epzeu.pr.application.segment.ApplicantDataOfReport;
import bg.registryagency.epzeu.pr.application.segment.AttachedDocument;
import bg.registryagency.epzeu.pr.domain.exception.NotAllowedOperationException;
import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationProcessRepository;
import bg.registryagency.epzeu.pr.domain.service.*;
import bg.registryagency.epzeu.pr.domain.util.ApplicationUtil;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.domain.vo.SendApplicationsOperationVo;
import bg.registryagency.epzeu.pr.domain.adapter.EpzeuApplicationAdapter;
import bg.registryagency.epzeu.pr.integration.api.security.UserDetails;
import bg.registryagency.epzeu.pr.integration.cache.*;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.AuditWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.client.MyApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.client.SigningServiceWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.*;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.ActionType;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.SigningFormat;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.payment.client.PaymentWebClient;
import bg.registryagency.epzeu.pr.integration.payment.dto.ObligationDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationInfo;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusEnum;
import bg.registryagency.epzeu.pr.integration.security.AuthenticationToken;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import bg.registryagency.epzeu.pr.integration.util.UrlUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import reactor.core.publisher.Flux;

import javax.validation.constraints.Positive;
import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Реализация на интерфейс ApplicationProcessService за работа с процеси по заявяване.
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplicationProcessServiceImpl implements ApplicationProcessService {
    private final static String NOMENCLATURES_HASH_KEY = "nomenclatures-hash";

    //Repositories
    private final ApplicationProcessRepository applicationProcessRepository;
    //Services
    private final ApplicationService applicationService;
    private final ApplicationProcessContentService applicationProcessContentService;
    private final ApplicationDocumentService applicationDocumentService;
    private final AppParameterService appParameterService;
    private final UserService userService;

    //Web Clients
    private final AuditWebClient auditWebClient;
    private final SigningServiceWebClient signingServiceWebClient;
    private final PaymentWebClient paymentWebClient;
    private final MyApplicationWebClient myApplicationWebClient;
    private final UserWebClient userWebClient;

    private final EpzeuApplicationAdapter epzeuApplicationAdapter;
    private final ApplicationFormProviderFactory applicationFormProviderFactory;

    private final JmsTemplate jmsTemplate;
    private final CacheManager cacheManager;
    private final ApplicationTypeReauNomenclatureCache applicationTypeReauNomenclatureCache;
    private final ApplicationTypeEpzeuNomenclatureCache applicationTypeEpzeuNomenclatureCache;
    private final ServiceNomenclatureCache serviceNomenclatureCache;
    private final CmsPageCache cmsPageCache;

    private final LabelMessageSource labelMessageSource;

    /**
     * Loads draft of Application Process if already created.
     *
     * @param applicationType type of Application for getting of Application Process
     * @return Application Process with Application/s, Application Content/s and Application Document/s
     */
    @Override
    @Transactional(readOnly = true)
    public ApplicationProcess getApplicationProcessByApplicationType(ApplicationType applicationType, boolean loadAllData) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //With this criteria applicantId and mainApplicationType system will return exactly one ApplicationProcess
        ApplicationProcess applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicantCin(currentUser.getCin())
            .mainApplicationType(applicationType)
            .loadApplications(true)
            .loadApplicationContents(true)
            .loadApplicationDocuments(true)
            .build()).single();

        if (loadAllData && applicationProcess != null) {

            //If Application Process is not null means that draft is already created, load byte[] content and return app process
            Application application = Objects.requireNonNull(applicationProcess.getMainApplication());

            ApplicationProcessContent applicationProcessContent = application.getApplicationProcessContent();
            byte[] content = applicationProcessContentService.readContent(applicationProcessContent.getApplicationProcessContentId());

            applicationProcessContent.setContent(content);
        }

        return applicationProcess;
    }

    @Override
    @Transactional(readOnly = true)
    public Result<ApplicationProcess> search(SearchCriteria.ApplicationProcessSearchCriteria searchCriteria) {
        return applicationProcessRepository.search(searchCriteria);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(long applicationProcessId) {
        //Read Application Process that will be deleted
        ApplicationProcess applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .loadApplications(true)
            .loadApplicationDocuments(true)
            .build()).single();

        if (applicationProcess == null) {
            throw new IllegalStateException("Cannot delete ApplicationProcess with id:" + applicationProcessId + " because it does not exist");
        } else if (!ApplicationProcess.Status.IN_PROCESS.equals(applicationProcess.getStatus())
            && !ApplicationProcess.Status.COMPLETED.equals(applicationProcess.getStatus())
            && !ApplicationProcess.Status.ERROR_IN_SIGNING.equals(applicationProcess.getStatus())
            && !ApplicationProcess.Status.ERROR_IN_ACCEPTING.equals(applicationProcess.getStatus())) {

            throw new NotAllowedOperationException("Status of the process: " + applicationProcess.getStatus() + ", is not allowed for deletion of process.");
        }

        //Remove main application relationship from Application Process
        applicationProcess.setMainApplication(null);
        applicationProcessRepository.update(applicationProcess);

        //Delete Application Documents
        applicationProcess.getApplications().forEach(application -> {
                List<ApplicationDocument> applicationDocuments = application.getApplicationDocuments();

                if(!CollectionUtils.isEmpty(applicationDocuments)) {
                    //Delete Application Documents
                    applicationDocuments.forEach(applicationDocument ->
                        applicationDocumentService.delete(applicationDocument.getBackofficeGuid(),
                            applicationProcess.getStatus() != ApplicationProcess.Status.COMPLETED &&
                                !ApplicationUtil.isDocumentFromInitialApplication(application, applicationDocument.getBackofficeGuid().toString())));
                }

                applicationService.deleteOnlyApplication(application);
            }
        );
        //Remove Application Process
        applicationProcessRepository.delete(applicationProcess.getApplicationProcessId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ApplicationProcess create(ApplicationType applicationType, ObjectNode additionalData) throws JAXBException, IOException, ApplicationDataException {
        ApplicationProcess applicationProcess = new ApplicationProcess();
        applicationProcess.setStatus(ApplicationProcess.Status.IN_PROCESS);
        applicationProcess.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        ObjectNode processAdditionalData = new ObjectNode(JsonNodeFactory.instance);
        processAdditionalData.put(NOMENCLATURES_HASH_KEY, getSumHashOfAllNomenclatures());

        applicationProcess.setAdditionalData(processAdditionalData);
        applicationProcess = applicationProcessRepository.create(applicationProcess);

        int applicationOrder = 1;
        //Create new ApplicationProcess only with id to prevent cycling(one place where cycling is a problem is when we translate model to DTO)
        Application mainApplication = applicationService.create(new ApplicationProcess(applicationProcess.getApplicationProcessId()), applicationType, applicationOrder, additionalData);
        List<Application> applications = new ArrayList<>();
        applications.add(mainApplication);

        applicationProcess.setMainApplication(mainApplication);
        applicationProcess.setApplications(applications);
        applicationProcessRepository.update(applicationProcess);

        return applicationProcess;
    }

    private long getSumHashOfAllNomenclatures() {
        long hashSum = cacheManager.getSumHashOfAllNomenclatureCaches();
        //TODO think about how to deal with situation when some of this enums changed, hashCode is not appropriate because it returns every time different hash
//            ServiceTypeNom.values().toString().hashCode() +
//            DeliveryMethodNomenclature.values().hashCode();

        return hashSum;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void startSending(Long applicationProcessId) throws ApplicationDataException {
        ApplicationProcess applicationProcess = applicationProcessRepository.search(SearchCriteria.ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .loadApplications(true)
            .loadApplicationContents(true)
            .build()).single();

        //If there is no application process throw exception
        if (applicationProcess == null) {
            throw new IllegalStateException("There is no application process with id:" + applicationProcessId);
        }

        if (hasChangesInApplicationsNomenclature(applicationProcess)) {
            throw new ApplicationDataException("PR_APP_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_CHANGED_NOMENCLATURES_I"));
        }

        if (applicationProcess.getStatus() == ApplicationProcess.Status.SENDING
            || applicationProcess.getStatus() == ApplicationProcess.Status.ACCEPTED
            || applicationProcess.getStatus() == ApplicationProcess.Status.COMPLETED) {
            return;
        }

        //If Application Process is not in status IN_PROCESS or READY_FOR_SENDING throw exception because it is not allowed to execute startSending operation in other statuses
        if (applicationProcess.getStatus() != ApplicationProcess.Status.IN_PROCESS) {

            throw new NotAllowedOperationException(String.format("Cannot start sending application process with id: %s, it is not in IN_PROCESS status and READY_FOR_SENDING, " +
                    "process is in status: %s.",
                applicationProcessId, applicationProcess.getStatus()));
        }

        //Check whether App Process is in IN_PROCESS status and requires signing. If Application Type requires signing and is invoked this method which send application without signing it is not allowed
        if (applicationProcess.getStatus() == ApplicationProcess.Status.IN_PROCESS && applicationProcess.getMainApplication().getType().isRequireSigning()) {
            throw new NotAllowedOperationException(String.format("Application Process with id: {s}, requires signing!", applicationProcessId));
        }

        List<ApplicationProcessContent> applicationProcessContents = null;

        //If status is IN_PROCESS create and save xml content and update status to READY_FOR_SENDING
        if (applicationProcess.getStatus() == ApplicationProcess.Status.IN_PROCESS) {
            //Get main application of process
            Application mainApplication = applicationProcess.getApplications().stream()
                .filter(app -> app.getApplicationId().equals(applicationProcess.getMainApplication().getApplicationId()))
                .findFirst().get();

            //Returned ApplicationProcess consists ApplicationProcessContent with only type JSON but in db is possible to have contents for application XML and JSON
            //Check whether this application has XML content and if so delete it
            applicationProcessContents = applicationProcessContentService.search(SearchCriteria
                .ApplicationProcessContentSearchCriteria.builder()
                .applicationProcessId(applicationProcessId)
                .type(ApplicationProcessContent.Type.XML)
                .build()).getObjects();

            //Delete XML Application Process Contents
            if (applicationProcessContents != null && !applicationProcessContents.isEmpty()) {
                applicationProcessContents.stream().forEach(applicationProcessContent -> applicationProcessContentService.delete(applicationProcessContent.getApplicationProcessContentId()));
                applicationProcessContents.clear();
            }

            ApplicationFormReportProvider provider = (ApplicationFormReportProvider) applicationFormProviderFactory.getApplicationFormProvider(mainApplication.getType());

            List<BaseRequestForReport> requestForReports = provider.fromJsonDraftToApplications(
                applicationProcessContentService.readContent(mainApplication.getApplicationProcessContent().getApplicationProcessContentId()));

            for (BaseRequestForReport requestForReport : requestForReports) {

                if (hasChangesInApplicantDataOfReport(requestForReport.getApplicantData())) {
                    throw new ApplicationDataException("PR_APP_CHANGED_CERTIFICATE_I", labelMessageSource.getMessage("PR_APP_CHANGED_CERTIFICATE_I"));
                }

                byte[] xmlBytes = provider.fromApplicationToXmlBytes(requestForReport);

                //Create New XML Application Process Content
                var processContent = applicationProcessContentService.create(applicationProcessId, ApplicationProcessContent.Type.XML, xmlBytes);

                ObjectMapper mapper = new ObjectMapper();
                JsonNode additionalInfoJsonNode = mapper.valueToTree(requestForReport.getSubjectOfReport());

                if(mainApplication.getAdditionalData() == null) {
                    ObjectNode additionalData = new ObjectNode(JsonNodeFactory.instance);
                    additionalData.set(processContent.getApplicationProcessContentId().toString(), additionalInfoJsonNode);
                    mainApplication.setAdditionalData(additionalData);
                } else {
                    mainApplication.getAdditionalData().set(processContent.getApplicationProcessContentId().toString(), additionalInfoJsonNode);
                }

                applicationService.update(mainApplication);

                applicationProcessContents.add(processContent);
            }

            applicationProcess.setAdditionalData(createApplicationProcessAdditionalInformation());
            applicationProcess.setStatus(ApplicationProcess.Status.SENDING);
            //Update process
            applicationProcessRepository.update(applicationProcess);
        }

        if (applicationProcessContents == null) {
            //Returned ApplicationProcess consists ApplicationProcessContent with only type JSON but in db is possible to have contents for application XML and JSON
            //Get all XML contents for passed App Process Id
            applicationProcessContents = applicationProcessContentService.search(SearchCriteria
                .ApplicationProcessContentSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .type(ApplicationProcessContent.Type.XML)
                .build()).getObjects();
        }

        StringBuilder operationIdBuilder = new StringBuilder("app-contents-");

        //Create unique operaton id for sending of application
        for (ApplicationProcessContent applicationProcessContent : applicationProcessContents) {
            operationIdBuilder.append("-" + applicationProcessContent.getApplicationProcessContentId());
        }
        String operationId = applicationProcess.getApplicationProcessId()
            + "-" + applicationProcess.getCreatedOn() + "-" + operationIdBuilder.toString().hashCode();

        //Add next operation in QUEUE
        jmsTemplate.convertAndSend(new SendApplicationsOperationVo(applicationProcessId.toString(), operationId));
    }

    private boolean hasChangesInApplicantDataOfReport(ApplicantDataOfReport applicantDataOfReport) {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionInformation().block();

        if (AuthenticationTypeEnum.CERTIFICATE.getId() == applicantDataOfReport.getAuthenticationType()
            && loginSessionDto.getCertificateInfo() != null
            && applicantDataOfReport.getSerialNumber().equals(loginSessionDto.getCertificateInfo().getSerialNumber())) {
            return false;
        } else if (AuthenticationTypeEnum.NRA.getId() == applicantDataOfReport.getAuthenticationType()
            && applicantDataOfReport.getPersonalIdentifier().equals(loginSessionDto.getUserIdentifier())) {
            return false;
        }

        return true;
    }

    private ObjectNode createApplicationProcessAdditionalInformation() {
        AuthenticationToken authentication = (AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        User user = (User) authentication.getPrincipal();
        //Create Additional Data for Process
        ObjectNode additionalData = new ObjectNode(JsonNodeFactory.instance);
        additionalData.put("userSessionID", userDetails.getSessionId());
        additionalData.put("loginSessionID", authentication.getLoginSessionId());
        additionalData.put("ipAddress", userDetails.getIpAddress());
        additionalData.put("userCIN", user.getCin());

        return additionalData;
    }

    private ObjectNode createApplicationProcessAdditionalInformation(int userCIN, String ipAddress, String userSessionID, String loginSessionID) {
        //Create Additional Data for Process
        ObjectNode additionalData = new ObjectNode(JsonNodeFactory.instance);
        additionalData.put("userSessionID", userSessionID);
        additionalData.put("loginSessionID", loginSessionID);
        additionalData.put("ipAddress", ipAddress);
        additionalData.put("userCIN", userCIN);

        return additionalData;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UUID startSigning(Long applicationProcessId) throws ApplicationDataException {
        ApplicationProcess applicationProcess = applicationProcessRepository.search(SearchCriteria.ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .loadApplications(true)
            .loadApplicationContents(true)
            .loadApplicationDocuments(true)
            .build()).single();

        //If Application Process is in status SIGNING that means code below is already executed return SigningGuid to caller(This is implementation of idempotency)
        if (applicationProcess.getStatus() == ApplicationProcess.Status.SIGNING) {
            return applicationProcess.getSigningGuid();
        }

        if (applicationProcess.getStatus() != ApplicationProcess.Status.IN_PROCESS) {
            throw new NotAllowedOperationException("Only application process in status IN_PROCESS can be signed, process is in status: " + applicationProcess.getStatus());
        }

        if (hasChangesInApplicationsNomenclature(applicationProcess)) {
            throw new ApplicationDataException("PR_APP_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_CHANGED_NOMENCLATURES_I"));
        }

        //Get main application of process
        Application mainApplication = applicationProcess.getApplications().stream()
            .filter(app -> app.getApplicationId().equals(applicationProcess.getMainApplication().getApplicationId()))
            .findFirst().get();

        //Get provider of main application
        var mainAppProvider = (ApplicationFormServiceProvider) applicationFormProviderFactory.getApplicationFormProvider(mainApplication.getType());

        //Deserialize application from json and validate application
        BaseApplicationForm applicationModel = mainAppProvider.deserializeApplicationFromJson(applicationProcessContentService
            .readContent(mainApplication.getApplicationProcessContent().getApplicationProcessContentId()));

        if(applicationModel instanceof DocumentAttachable) {
            List<AttachedDocument> attachedDocuments = ((DocumentAttachable) applicationModel).getAttachedDocuments();
            if(attachedDocuments != null) {
                boolean validAttachedDocuments = attachedDocuments.stream().allMatch(attachedDocument ->
                    mainApplication.getApplicationDocuments().stream()
                        .anyMatch(applicationDocument -> applicationDocument.getBackofficeGuid().toString().equals(attachedDocument.getDocumentUniqueId())
                            && applicationDocument.getName().equals(attachedDocument.getDocumentName())
                            && applicationDocument.getDocumentTypeId().equals(attachedDocument.getDocumentType().getId()))
                );

                if(!validAttachedDocuments) {
                    log.error("Attached documents from application with id:" + mainApplication.getApplicationId() + " are not the same or some doc is missing in application documents in Application Process!");
                    throw new ApplicationDataException("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L"));
                }
            }
        }

        //Returned ApplicationProcess consists ApplicationProcessContent with only type JSON but in db is possible to have contents for application XML and JSON
        //Check whether this application process has XML contents and if so delete it
        var applicationProcessContents = applicationProcessContentService.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .type(ApplicationProcessContent.Type.XML)
            .build()).getObjects();

        //Delete XML Application Process Contents
        if (applicationProcessContents != null && !applicationProcessContents.isEmpty()) {
            applicationProcessContents.stream().forEach(applicationProcessContent -> applicationProcessContentService.delete(applicationProcessContent.getApplicationProcessContentId()));
        }

        byte[] xmlBytes = mainAppProvider.serializeApplicationToXml(applicationModel);

        //Create New XML Application Process Content
        applicationProcessContentService.create(applicationProcessId, ApplicationProcessContent.Type.XML, xmlBytes);

        String apiUrl = UrlUtil.ensureTrailingSlashExists(appParameterService.getAppParameter(AppParameterKey.GL_PR_API).getValueString());

        //Send application to sign
        SigningRequestDto signingRequest = new SigningRequestDto();
        signingRequest.setFileName(mainAppProvider.getApplicationFileName());
        signingRequest.setContentType("application/xml");
        signingRequest.setFormat(SigningFormat.XADES);
        signingRequest.setRejectedCallbackUrl(apiUrl + "ApplicationProcesses/SigningRejected");
        signingRequest.setCompletedCallbackUrl(apiUrl + "ApplicationProcesses/SigningCompleted");
        signingRequest.setSignerRequests(Arrays
            .asList(new SignerPersonDto(applicationModel.getApplicantName(), applicationModel.getIdentity(), 1)));

        UUID signingUuid = signingServiceWebClient.sendDocumentToSign(signingRequest, xmlBytes).block();

        applicationProcess.setAdditionalData(createApplicationProcessAdditionalInformation());
        applicationProcess.setStatus(ApplicationProcess.Status.SIGNING);
        applicationProcess.setSigningGuid(signingUuid);
        //Update process
        applicationProcessRepository.update(applicationProcess);

        return signingUuid;
    }

    public boolean hasChangesInApplicationsNomenclature(ApplicationProcess applicationProcess) {
        if(applicationProcess.getAdditionalData() != null) {
            JsonNode jsonNode = applicationProcess.getAdditionalData().get(NOMENCLATURES_HASH_KEY);
            if (jsonNode != null) {
                return jsonNode.asLong() != getSumHashOfAllNomenclatures();
            }
        }

        return false;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void rejectSigning(UUID signingUuid) {
        //Get application process by signing guid
        var applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .signingGuid(signingUuid)
            .build()).single();

        //If Application Process is in status IN_PROCESS that means code below is already executed(This is implementation of idempotency)
        if (applicationProcess.getStatus() == ApplicationProcess.Status.IN_PROCESS) {
            return;
        }

        //If process is in not consistent status throw exception
        if (applicationProcess.getStatus() != ApplicationProcess.Status.SIGNING) {
            throw new NotAllowedOperationException("Only application process in status SIGNING can use action RejectSigning, process is in status: " + applicationProcess.getStatus());
        }

        //Change application process state to this before signing
        applicationProcess.setStatus(ApplicationProcess.Status.IN_PROCESS);
        applicationProcess.setSigningGuid(null);
        //Update application process
        applicationProcessRepository.update(applicationProcess);

        //Get XML application process content
        var applicationProcessContent = applicationProcessContentService.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .type(ApplicationProcessContent.Type.XML)
            .build()).single();
        //Delete XML application process content
        applicationProcessContentService.delete(applicationProcessContent.getApplicationProcessContentId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void completeSigning(UUID signingUuid, int userCIN, String ipAddress,
                                String userSessionID, String loginSessionID, byte[] signDocumentContent) {

        //Get application process by signing uuid and load applications in process
        var applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .signingGuid(signingUuid)
            .loadApplications(true)
            .build()).single();

        //If there is no application process throw illegal state exception
        if (applicationProcess == null) {
            throw new IllegalStateException(String.format("Can't complete signing, no process with signingGiud %s. ", signingUuid));
        }

        //If Application Process is in status SENDING that means code below is already executed(This is implementation of idempotency)
        if (applicationProcess.getStatus() == ApplicationProcess.Status.SENDING) {
            return;
        }

        //If application is in status different than signing throw NotAllowedOperationException because completion of signing is possible only for process in status signing
        if (applicationProcess.getStatus() != ApplicationProcess.Status.SIGNING) {
            throw new NotAllowedOperationException(
                String.format("Can't complete signing for ApplicationProcess with ID: %s. Process not in Signing status, process is in status: %s",
                    applicationProcess.getApplicationProcessId(), applicationProcess.getStatus()));
        }

        //Get XML process content
        var applicationProcessContent = applicationProcessContentService.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .type(ApplicationProcessContent.Type.XML)
            .build()).single();

        //Save signed xml document in db
        applicationProcessContentService.uploadFull(applicationProcessContent.getApplicationProcessContentId(), signDocumentContent);

        //Update process to status SENDING
        applicationProcess.setStatus(ApplicationProcess.Status.SENDING);
        applicationProcess.setAdditionalData(createApplicationProcessAdditionalInformation(userCIN, ipAddress,
            userSessionID, loginSessionID));
        applicationProcessRepository.update(applicationProcess);

        //////////////////////////
        //Add next operation in QUEUE
        jmsTemplate.convertAndSend(new SendApplicationsOperationVo(applicationProcess.getApplicationProcessId().toString(), signingUuid.toString()));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void completeApplicationRegistration(List<ApplicationInfo> registeredAppInfos) {
        ApplicationProcess applicationProcess = null;

        if (registeredAppInfos != null && !registeredAppInfos.isEmpty()) {
            //All Registered App Infos are from the same process so we get process once from the first App Info
            applicationProcess = applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(registeredAppInfos.get(0).getProcessKey())
                .loadApplications(true)
                .build()).single();

            //If there is no application process, that means user is already saw the application and deleted it
            if (applicationProcess == null) {
                if(log.isDebugEnabled()) {
                    log.debug("There is no application process!");
                }
                return;
            }
        }

        if(applicationProcess != null && applicationProcess.getStatus() == ApplicationProcess.Status.SENDING) {
            throw new NotAllowedOperationException("Application process with id: " + applicationProcess.getApplicationProcessId()
                + ", cannot be COMPLETED, because status is not ACCEPTED, status is: " + ApplicationProcess.Status.SENDING);
        }

        if (applicationProcess != null && applicationProcess.getStatus() == ApplicationProcess.Status.ACCEPTED) {
            String[] incomingNumbers = new String[registeredAppInfos.size()];

            for (int i = 0; i < registeredAppInfos.size(); i++) {
                ApplicationInfo registeredAppInfo = registeredAppInfos.get(i);

                incomingNumbers[i] = registeredAppInfo.getIncomingNumber();

                //Get additional information needed for audit record
                ObjectNode processAdditionalData = applicationProcess.getAdditionalData();

                //Create Audit record
                LogAction logAction = new LogAction();
                logAction.setOperationID("REAU_ACCEPTED_APPLICATION_" + registeredAppInfo.getIncomingNumber());
                logAction.setKey(registeredAppInfo.getIncomingNumber());
                logAction.setActionType(ActionType.SUBMISSION);
                logAction.setUserSessionID(processAdditionalData.get("userSessionID").textValue());
                logAction.setLoginSessionID(processAdditionalData.get("loginSessionID").textValue());
                logAction.setIpAddress(processAdditionalData.get("ipAddress").textValue());
                logAction.setUserCIN(processAdditionalData.get("userCIN").asInt());

                ObjectNode applicationAdditionalData = applicationProcess.getMainApplication().getAdditionalData();
                if(applicationAdditionalData != null) {
                    JsonNode additionalDataAppInfo = applicationAdditionalData.get(registeredAppInfo.getContentKey().toString());
                    logAction.setAdditionalData(new AuditAdditionalData(applicationTypeReauNomenclatureCache.get(applicationProcess.getMainApplication().getType().getCode()).getName(),
                        additionalDataAppInfo));
                } else {
                    logAction.setAdditionalData(new AuditAdditionalData(applicationTypeReauNomenclatureCache.get(applicationProcess.getMainApplication().getType().getCode()).getName(),
                        null));
                }

                //Send audit record to audit module
                auditWebClient.createLogAction(logAction, TokenGrantType.CLIENT_CREDENTIALS).block();

                registeredAppInfo.setApplicantCIN(userService.searchUser(applicationProcess.getUser().getUserId(), null).getCin());
                registeredAppInfo.setApplicationTypeId(applicationProcess.getMainApplication().getType().getCode());
                registeredAppInfo.setStatusId(ApplicationStatusEnum.ACCEPTED.getId());

                //Create My Application record in EPZEU
                myApplicationWebClient.createMyApplication(epzeuApplicationAdapter.toEpzeuApplicationCreate(registeredAppInfo), TokenGrantType.CLIENT_CREDENTIALS).block();
            }

            //Update Application Process - set incoming number of main application and status to COMPLETED
            applicationProcess.setIncomingNumbers(incomingNumbers);
            applicationProcess.setStatus(ApplicationProcess.Status.COMPLETED);

            applicationProcessRepository.update(applicationProcess);
        } else {
            if(applicationProcess != null) {
                log.warn("Application process with id: " + applicationProcess.getApplicationProcessId()
                    + ", cannot be COMPLETED, because status is not ACCEPTED, status is: " + applicationProcess.getStatus());
            }
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void returnToBeginningStatus(long processId) {
        var applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(processId)
            .build()).single();

        if (applicationProcess.getStatus() != ApplicationProcess.Status.ERROR_IN_ACCEPTING
            && applicationProcess.getStatus() != ApplicationProcess.Status.ERROR_IN_SIGNING) {

            throw new NotAllowedOperationException("Only process with status ERROR_IN_ACCEPTING or ERROR_IN_SIGNING can be returned to beginning status, process is in status: "
                + applicationProcess.getStatus());
        }

        applicationProcess.setStatus(ApplicationProcess.Status.IN_PROCESS);
        applicationProcess.setSigningGuid(null);
        applicationProcess.setErrorMessage(null);

        applicationProcessRepository.update(applicationProcess);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ObligationDto> searchApplicationProcessObligations(@Positive long appProcessId) {
        var applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(appProcessId)
            .build()).single();

        if (applicationProcess == null) {
            return null;
        }

        User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User applicant = userService.searchUser(applicationProcess.getUser().getUserId(), null);
        if (!loggedUser.getCin().equals(applicant.getCin())) {
            throw new NotAllowedOperationException("Logged user with cin: " + loggedUser.getCin() + " cannot get obligations for user with cin: " + applicationProcess.getUser().getCin());
        }

        if (applicationProcess.getStatus() == ApplicationProcess.Status.COMPLETED) {
            return paymentWebClient.searchObligations(applicationProcess.getIncomingNumbers());
        }

        return null;
    }

    @Override
    public void validateAuthenticationType(ApplicationType applicationType) throws ApplicationDataException {
        ApplicationFormProvider provider = applicationFormProviderFactory.getApplicationFormProvider(applicationType);
        provider.validateAuthenticationType();
    }

    @Override
    public boolean isApplicationActive(ApplicationType applicationType) {
        ApplicationTypeEpzeuNomDto applicationTypeNom = applicationTypeEpzeuNomenclatureCache.get(applicationType.getCode());

        Collection<CmsPageDto> cmsPages = cmsPageCache.asMap().values();

        Optional<CmsPageDto> cmsPageDto = cmsPages.stream()
            .filter(cmsPage -> applicationTypeNom.getApplicationTypeId().equals(cmsPage.getApplicationTypeId()))
            .findFirst();

        if(cmsPageDto.isPresent()) {
            return true;
        }

        List<ServiceNomDto> services = serviceNomenclatureCache.asMap().values().stream()
            .filter(service -> applicationTypeNom.getApplicationTypeId().equals(service.getAppTypeId()) && service.getStatus() == 0)
            .collect(Collectors.toList());

        cmsPageDto = cmsPages.stream().filter(cmsPage -> services.stream().anyMatch(service -> service.getServiceId().equals(cmsPage.getServiceId()))).findFirst();

        if(cmsPageDto.isPresent()) {
            return true;
        }

        return false;
    }
}
