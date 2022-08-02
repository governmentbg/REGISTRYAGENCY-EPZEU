package bg.registryagency.epzeu.pr.domain.repository.impl;

import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationDocumentRepository;
import bg.registryagency.epzeu.pr.domain.repository.sp.applicationdocument.*;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.UUID;

/**
 * Реализация на интерфейс ApplicationDocumentRepository за поддържане и съхранение на обекти от тип ApplicationDocument.
 */
@Repository
public class ApplicationDocumentRepositoryImpl implements ApplicationDocumentRepository {
    private final ApplicationDocumentCreateSP applicationDocumentCreateSP;
    private final ApplicationDocumentDeleteSP applicationDocumentDeleteSP;
    private final ApplicationDocumentUpdateSP applicationDocumentUpdateSP;
    private final ApplicationDocumentSearchSP applicationDocumentSearchSP;
    private final ApplicationDocumentDeleteByUUIDSP applicationDocumentDeleteByUUIDSP;

    public ApplicationDocumentRepositoryImpl(DataSource dataSource) {
        this.applicationDocumentCreateSP = new ApplicationDocumentCreateSP(dataSource);
        this.applicationDocumentDeleteSP = new ApplicationDocumentDeleteSP(dataSource);
        this.applicationDocumentUpdateSP = new ApplicationDocumentUpdateSP(dataSource);
        this.applicationDocumentSearchSP = new ApplicationDocumentSearchSP(dataSource);
        this.applicationDocumentDeleteByUUIDSP = new ApplicationDocumentDeleteByUUIDSP(dataSource);
    }

    @Override
    public ApplicationDocument create(ApplicationDocument applicationDocument) {
        applicationDocument.setApplicationDocumentId(this.applicationDocumentCreateSP.execute(applicationDocument));
        return applicationDocument;
    }

    @Override
    public void delete(Long applicationDocumentId) {
        this.applicationDocumentDeleteSP.execute(applicationDocumentId);
    }

    @Override
    public void update(ApplicationDocument applicationDocument) {
        this.applicationDocumentUpdateSP.execute(applicationDocument);
    }

    @Override
    public Result<ApplicationDocument> search(SearchCriteria.ApplicationDocumentSearchCriteria applicationDocumentSearchCriteria) {
        return this.applicationDocumentSearchSP.execute(applicationDocumentSearchCriteria);
    }

    @Override
    public void deleteByUUID(UUID uuid) {
        this.applicationDocumentDeleteByUUIDSP.execute(uuid);
    }
}
