package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.application.provider.ApplicationFormProvider;
import bg.registryagency.epzeu.pr.application.provider.ApplicationFormProviderFactory;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationDocumentRepository;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationRepository;
import bg.registryagency.epzeu.pr.domain.service.ApplicationDocumentService;
import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessContentService;
import bg.registryagency.epzeu.pr.domain.service.ApplicationService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationFormDto;
import bg.registryagency.epzeu.pr.integration.api.application.DocumentAttachableDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.UUID;

/**
 * Реализация на интерфейс ApplicationService за работа със заявления.
 */
@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;

    private final ApplicationProcessContentService applicationProcessContentService;
    private final ApplicationDocumentRepository applicationDocumentRepository;

    private final ApplicationFormProviderFactory applicationFormProviderFactory;

    private final ApplicationDocumentService applicationDocumentService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Application create(ApplicationProcess applicationProcess, ApplicationType type, int order, ObjectNode additionalData) throws ApplicationDataException {
        //Create Application Process Content metadata without content
        ApplicationProcessContent applicationProcessContent = applicationProcessContentService.create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.JSON);

        //Get Application Form Provider to create appropriate Application Form json byte array
        ApplicationFormProvider applicationFormProvider = applicationFormProviderFactory.getApplicationFormProvider(type);

        //Provide DTO because we use it for creation of JSON of DTO Application which will be returned to user
        ApplicationFormDto applicationFormDto = applicationFormProvider.provideApplicationDto(additionalData);

        byte[] applicationFormJsonByteArray = applicationFormProvider.serializeApplicationAsJsonByteArray(applicationFormDto);

        applicationProcessContent.setContent(applicationFormJsonByteArray);

        //Upload json byte array in Application Process Content
        applicationProcessContentService.uploadFull(applicationProcessContent.getApplicationProcessContentId(), applicationFormJsonByteArray);

        //Create Application
        Application application = applicationRepository.create(new Application(type, order, applicationProcess, applicationProcessContent, additionalData));

        //Create Application Documents if Application is for Correction and is Document Attachable
        if(additionalData != null && additionalData.get(ApplicationConstants.ADDITIONAL_DATA_INCOMING_REAU_NUMBER).asText() != null
            && applicationFormDto instanceof DocumentAttachableDto) {

            DocumentAttachableDto dto = (DocumentAttachableDto) applicationFormDto;
            if(dto.getDocuments() != null && dto.getDocuments().getAttachedDocuments() != null) {
                //Add id of documents to additional data. This is useful data for determine which documents comes from initial application and cannot be deleted by correction application draft
                ArrayNode documentsArray = additionalData.putArray(ApplicationConstants.ADDITIONAL_DATA_INITIAL_APP_DOCUMENTS);

                dto.getDocuments().getAttachedDocuments().stream().forEach(attachedDocumentDto -> {
                    ApplicationDocument applicationDocument = new ApplicationDocument();
                    applicationDocument.setDocumentTypeId(attachedDocumentDto.getDocumentTypeId());
                    applicationDocument.setName(attachedDocumentDto.getName());
                    //Create new Application only with id to prevent cycling(one place where cycling is a problem is when we transform model to DTO)
                    applicationDocument.setApplication(new Application(application.getApplicationId()));
                    //int type will be always enough for size because files are not going to be big
                    applicationDocument.setFileSize(attachedDocumentDto.getSize().intValue());
                    applicationDocument.setBackofficeGuid(UUID.fromString(attachedDocumentDto.getDocumentUniqueId()));

                    applicationDocument = applicationDocumentService.create(applicationDocument);
                    //Add id of documents to additional data. This is useful data for determine which documents comes from initial application and cannot be deleted by correction application draft
                    documentsArray.add(applicationDocument.getBackofficeGuid().toString());
                });
            }

            applicationRepository.update(application);
        }

        return application;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Application create(long applicationProcessId, ApplicationType type, int order, ObjectNode additionalData) throws ApplicationDataException {
        return create(new ApplicationProcess(applicationProcessId), type, order,additionalData);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(long applicationId, boolean deleteExternalDataRelatedWithApplication) {
        Application application = applicationRepository.search(
            SearchCriteria.ApplicationSearchCriteria.builder()
                .applicationIds(applicationId)
                .loadApplicationDocuments(true)
                .build()
        ).single();

        if(application == null) {
            throw new IllegalStateException("Cannot delete Application with id:" + applicationId + " because it does not exist");
        }

        this.delete(application, deleteExternalDataRelatedWithApplication);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(@NonNull Application application, boolean deleteExternalDataRelatedWithApplication) {
        //TODO think about checking that we cannot delete main application but this method is used also when we delete whole process with all applications

        List<ApplicationDocument> applicationDocuments = application.getApplicationDocuments();

        if(!CollectionUtils.isEmpty(applicationDocuments)) {
            //Delete Application Documents
            applicationDocumentService.deleteAll(applicationDocuments, deleteExternalDataRelatedWithApplication);
        }
        //Remove applications and application process contents
        applicationRepository.delete(application.getApplicationId());
        applicationProcessContentService.deleteByApplicationProcess(application.getApplicationProcess().getApplicationProcessId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteOnlyApplication(@NonNull Application application) {
        //Remove applications and application process contents
        applicationRepository.delete(application.getApplicationId());
        applicationProcessContentService.deleteByApplicationProcess(application.getApplicationProcess().getApplicationProcessId());
    }

    @Override
    @Transactional(readOnly = true)
    public Result<Application> search(SearchCriteria.ApplicationSearchCriteria applicationSearchCriteria) {
        return applicationRepository.search(applicationSearchCriteria);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Application application) {
        applicationRepository.update(application);
    }
}
