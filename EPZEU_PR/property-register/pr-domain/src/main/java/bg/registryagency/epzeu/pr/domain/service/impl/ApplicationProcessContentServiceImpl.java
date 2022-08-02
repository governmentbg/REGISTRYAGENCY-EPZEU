package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationProcessContentRepository;
import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessContentService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Реализация на интерфейс ApplicationProcessContentService за работа със съдържания на заявления.
 */
@Service
@RequiredArgsConstructor
public class ApplicationProcessContentServiceImpl implements ApplicationProcessContentService {
    private final ApplicationProcessContentRepository applicationProcessContentRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateContent(long applicationId, byte[] content) {
        ApplicationProcessContent applicationProcessContent = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationIds(applicationId).type(ApplicationProcessContent.Type.JSON)
            .build()).single();

        if(applicationProcessContent == null) {
            throw new IllegalStateException("Cannot update content of ApplicationProcessContent with id:" + applicationId + " because it does not exist");
        }

        applicationProcessContentRepository.uploadFull(applicationProcessContent.getApplicationProcessContentId(), content);
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] readContent(Long applicationProcessContentId) {
        return this.applicationProcessContentRepository.readContent(applicationProcessContentId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ApplicationProcessContent create(Long applicationProcessId, ApplicationProcessContent.Type type) {
        return applicationProcessContentRepository.create(applicationProcessId, type);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ApplicationProcessContent create(Long applicationProcessId, ApplicationProcessContent.Type type, byte[] content) {
        var applicationProcessContent = applicationProcessContentRepository.create(applicationProcessId, type);
        applicationProcessContentRepository.uploadFull(applicationProcessContent.getApplicationProcessContentId(), content);

        return applicationProcessContent;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long applicationProcessContentId) {
        applicationProcessContentRepository.delete(applicationProcessContentId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteByApplicationProcess(Long applicationProcessId) {
        List<ApplicationProcessContent> processContents = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .build()).getObjects();

        processContents.forEach(applicationProcessContent -> this.delete(applicationProcessContent.getApplicationProcessContentId()));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void uploadFull(Long applicationProcessContentId, byte[] content) {
        applicationProcessContentRepository.uploadFull(applicationProcessContentId, content);
    }

    @Override
    @Transactional(readOnly = true)
    public Result<ApplicationProcessContent> search(SearchCriteria.ApplicationProcessContentSearchCriteria searchCriteria) {
        return applicationProcessContentRepository.search(searchCriteria);
    }
}
