package bg.registryagency.epzeu.pr.domain.listener;

import bg.registryagency.epzeu.pr.domain.conf.ApplicationDomainProperties;
import bg.registryagency.epzeu.pr.domain.exception.NotAllowedOperationException;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationProcessRepository;
import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessContentService;
import bg.registryagency.epzeu.pr.domain.service.UserService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.domain.vo.SendApplicationsOperationVo;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.UploadApplicationRequest;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import lombok.extern.slf4j.Slf4j;
import oracle.jms.AQjmsObjectMessage;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.AbstractPlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.CollectionUtils;

import javax.jms.JMSException;
import java.util.ArrayList;
import java.util.Collections;

@Slf4j
@Component
public class ApplicationProcessListener {

    private final UserService userService;
    private final ApplicationProcessRepository applicationProcessRepository;
    private final ApplicationProcessContentService applicationProcessContentService;
    private final ApplicationWebClient applicationWebClient;
    private final ApplicationDomainProperties applicationDomainProperties;

    private final TransactionTemplate transactionTemplate;

    public ApplicationProcessListener(UserService userService,
                                      ApplicationProcessRepository applicationProcessRepository,
                                      ApplicationProcessContentService applicationProcessContentService,
                                      ApplicationWebClient applicationWebClient,
                                      ApplicationDomainProperties applicationDomainProperties,
                                      AbstractPlatformTransactionManager platformTransactionManager) {
        this.userService = userService;
        this.applicationProcessRepository = applicationProcessRepository;
        this.applicationProcessContentService = applicationProcessContentService;
        this.applicationWebClient = applicationWebClient;
        this.applicationDomainProperties = applicationDomainProperties;

        transactionTemplate = new TransactionTemplate(platformTransactionManager);
    }

    /**
     * Send application to REAU. If this service method is used in context of logged user get delegation token and send application to REAU via delegation token.
     * If service method is used not in context of logged user then authenticate system user and get client authentication token.
     * Authentication of system user is needed for database connection, client authentication token is needed for sending of application to REAU.
     *
     * @param message queue message with information about processId and operation id
     */
    @Transactional(rollbackFor = Exception.class)
    public void sendApplications(AQjmsObjectMessage message) throws JMSException {
        if(log.isTraceEnabled()) {
            log.trace("Send Applications JMS handler is invoked!");
        }

        SendApplicationsOperationVo applicationsOperationVo = (SendApplicationsOperationVo)message.getObject();

        Long processId = Long.valueOf(applicationsOperationVo.getProcessId());

        var applicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(processId)
            .build()).single();

        if (applicationProcess == null) {
            throw new IllegalStateException("There is no application process with id:" + applicationsOperationVo.getProcessId());
        }

        //If Application Process is in status ACCEPTED or ERROR_IN_ACCEPTING that means code below is already executed
        if (applicationProcess.getStatus() == ApplicationProcess.Status.ACCEPTED
                || applicationProcess.getStatus() == ApplicationProcess.Status.ERROR_IN_ACCEPTING
                || applicationProcess.getStatus() == ApplicationProcess.Status.COMPLETED) {
            return;
        }

        //If Application Process is in status SENDING or READY_FOR_SENDING throw exception because it is not allowed to execute sendApplications operation in these statuses
        if (applicationProcess.getStatus() != ApplicationProcess.Status.SENDING) {

            throw new NotAllowedOperationException(String.format("Cannot send application process with id: %s, it is not in SENDING status, it is in status: %s.",
                applicationsOperationVo.getProcessId(), applicationProcess.getStatus()));
        }

        //Get main application content
        var processContents = applicationProcessContentService.search(SearchCriteria
                .ApplicationProcessContentSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .type(ApplicationProcessContent.Type.XML)
                .build()).getObjects();

        if(CollectionUtils.isEmpty(processContents)) {
            String errorMsg = "There is no XML application for sending. It is possible because of another person with the same account already deleted XML application";
            log.warn(errorMsg);

            applicationProcess.setStatus(ApplicationProcess.Status.ERROR_IN_ACCEPTING);
            applicationProcess.setErrorMessage(errorMsg);

            applicationProcessRepository.update(applicationProcess);
            return;
        }

        var uploadApplicationRequests = new ArrayList<UploadApplicationRequest>(processContents.size());

        for (ApplicationProcessContent processContent : processContents) {
            byte[] appXmlBytes = applicationProcessContentService.readContent(processContent.getApplicationProcessContentId());
            if(appXmlBytes == null) {
                String errorMsg = "There is no XML application for sending. It is possible because of another person with the same account already deleted XML application";
                log.warn(errorMsg);

                applicationProcess.setStatus(ApplicationProcess.Status.ERROR_IN_ACCEPTING);
                applicationProcess.setErrorMessage(errorMsg);

                applicationProcessRepository.update(applicationProcess);
                return;
            }
            uploadApplicationRequests.add(new UploadApplicationRequest(processContent.getApplicationProcessContentId(), appXmlBytes));
        }

        //Load user for loading of user's cin
        User user = userService.searchUser(applicationProcess.getUser().getUserId(), null);

        applicationWebClient.upload(processId, user.getCin(), uploadApplicationRequests, applicationsOperationVo.getOperationId(), TokenGrantType.CLIENT_CREDENTIALS)
            .doOnSuccess(response -> {
                transactionTemplate.executeWithoutResult(transactionStatus -> {
                    applicationProcess.setStatus(ApplicationProcess.Status.ACCEPTED);
                    applicationProcessRepository.update(applicationProcess);
                });

                if(log.isDebugEnabled()) {
                    log.debug("Application process: " + applicationProcess.getApplicationProcessId() + ", is updated to status ACCEPTED");
                }
            }).doOnError(error -> {
                log.error(error.getMessage(), error);

                applicationProcess.setStatus(ApplicationProcess.Status.ERROR_IN_ACCEPTING);
                applicationProcess.setErrorMessage(error.getLocalizedMessage());

                applicationProcessRepository.update(applicationProcess);

            }).subscribe();
    }
}
