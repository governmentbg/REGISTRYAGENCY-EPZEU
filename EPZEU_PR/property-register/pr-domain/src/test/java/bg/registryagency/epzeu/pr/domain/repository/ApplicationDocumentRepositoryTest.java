package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.domain.conf.DomainRepositoryTestConfiguration;
import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomainRepositoryTestConfiguration.class)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, TransactionalTestExecutionListener.class})
@Transactional
public class ApplicationDocumentRepositoryTest {
    @Autowired
    private ApplicationProcessRepository applicationProcessRepository;
    @Autowired
    private ApplicationProcessContentRepository applicationProcessContentRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ApplicationDocumentRepository applicationDocumentRepository;

    @Test
    public void testCreate() {
        //TODO
        createApplicationDocument();
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateWithInvalidParameters() {
        //TODO
        ApplicationProcess applicationProcess = BootstrapDataUtils.createApplicationProcess(new User(-1), ApplicationProcess.Status.IN_PROCESS);

        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(applicationProcess);

        createApplicationDocument(applicationProcess, applicationProcessContent);
    }

    @Test
    public void testDelete() {
        //TODO
        //Create Application.
        Application application = createApplication();
        //Create Application Document.
        ApplicationDocument applicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));

        //Find Application Document before delete.
        ApplicationDocument foundApplicationDocument = applicationDocumentRepository.search(SearchCriteria.ApplicationDocumentSearchCriteria
            .builder()
            .applicationIds(application.getApplicationId())
            .applicationDocumentIds(applicationDocument.getApplicationDocumentId())
            .build()).single();

        assertThat(foundApplicationDocument).isNotNull();
        assertThat(foundApplicationDocument.getApplication().getApplicationId()).isEqualTo(application.getApplicationId());
        assertThat(foundApplicationDocument.getApplicationDocumentId()).isEqualTo(applicationDocument.getApplicationDocumentId());

        applicationDocumentRepository.delete(applicationDocument.getApplicationDocumentId());

        //Try to get Application Document after delete.
        ApplicationDocument deletedApplicationDocument = applicationDocumentRepository.search(SearchCriteria.ApplicationDocumentSearchCriteria
            .builder()
            .applicationIds(application.getApplicationId())
            .applicationDocumentIds(applicationDocument.getApplicationDocumentId()).build())
            .single();

        assertThat(deletedApplicationDocument).isNull();
    }

    @Test
    public void testDeleteByUUID() {
        //TODO
        //Create Application.
        Application application = createApplication();
        //Create Application Document.
        ApplicationDocument applicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));

        assertThat(applicationDocument.getBackofficeGuid()).isNotNull();

        applicationDocumentRepository.deleteByUUID(applicationDocument.getBackofficeGuid());

        //Try to get the deleted by UUID document.
        ApplicationDocument deletedByUUIDApplicationDocument = applicationDocumentRepository.search(SearchCriteria.ApplicationDocumentSearchCriteria
            .builder()
            .applicationIds(application.getApplicationId())
            .applicationDocumentIds(applicationDocument.getApplicationDocumentId()).build())
            .single();

        assertThat(deletedByUUIDApplicationDocument).isNull();
    }

    @Test(expected = UncategorizedSQLException.class)
    public void testDeleteWithInvalidParameters() {
        //TODO
        applicationDocumentRepository.delete(null);
    }

    @Test
    public void testUpdate() {
        //TODO
        ApplicationDocument applicationDocument = createApplicationDocument();
        String oldName = applicationDocument.getName();

        applicationDocument.setName(oldName + "test");

        applicationDocumentRepository.update(applicationDocument);

        ApplicationDocument updatedApplicationDocument = applicationDocumentRepository.search(SearchCriteria
            .ApplicationDocumentSearchCriteria
            .builder()
            .applicationDocumentIds(applicationDocument.getApplicationDocumentId()).build()).single();

        assertThat(updatedApplicationDocument.getName()).isEqualTo(applicationDocument.getName());
    }

    @Test(expected = UncategorizedSQLException.class)
    public void testUpdateWithInvalidParameters() {
        //TODO
        ApplicationDocument applicationDocument = createApplicationDocument();
        applicationDocument.setApplicationDocumentId(null);
        applicationDocument.setName(null);
        applicationDocument.setBackofficeGuid(null);
        applicationDocument.setApplication(new Application(0L));
        applicationDocument.setDocumentTypeId(null);
        applicationDocument.setFileSize(-2000);

        applicationDocumentRepository.update(applicationDocument);
    }

    @Test
    public void testSearchWithApplicationIds() {
        //TODO
        Application firstApplication = createApplication();
        Application secondApplication = createApplication();

        ApplicationDocument firstApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(firstApplication));
        ApplicationDocument secondApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(secondApplication));

        List<ApplicationDocument> applicationDocuments = applicationDocumentRepository.search(SearchCriteria
            .ApplicationDocumentSearchCriteria
            .builder()
            .applicationIds(firstApplicationDocument.getApplication().getApplicationId(),
                secondApplicationDocument.getApplication().getApplicationId())
            .build()).getObjects();

        Application foundFirstApplication = applicationDocuments.get(0).getApplication();
        Application foundSecondApplication = applicationDocuments.get(1).getApplication();

        assertThat(foundFirstApplication.getApplicationId()).isEqualTo(firstApplication.getApplicationId());
        assertThat(foundSecondApplication.getApplicationId()).isEqualTo(secondApplication.getApplicationId());
    }

    @Test
    public void testSearchWithApplicationDocumentIds() {
        //TODO
        Application application = createApplication();

        ApplicationDocument firstApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));
        ApplicationDocument secondApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));

        List<ApplicationDocument> foundApplicationDocuments = applicationDocumentRepository.search(SearchCriteria
            .ApplicationDocumentSearchCriteria
            .builder()
            .applicationDocumentIds(firstApplicationDocument.getApplicationDocumentId(), secondApplicationDocument.getApplicationDocumentId())
            .build()).getObjects();

        assertThat(foundApplicationDocuments).isNotEmpty();
        assertThat(foundApplicationDocuments).isNotNull();
        assertThat(foundApplicationDocuments.get(0).getApplicationDocumentId()).isEqualTo(firstApplicationDocument.getApplicationDocumentId());
        assertThat(foundApplicationDocuments.get(1).getApplicationDocumentId()).isEqualTo(secondApplicationDocument.getApplicationDocumentId());
    }

    @Test
    public void testSearchWithApplicationIdsAndApplicationDocumentIds() {
        //TODO
        Application firstApplication = createApplication();
        Application secondApplication = createApplication();

        ApplicationDocument firstApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(firstApplication));
        ApplicationDocument secondApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(secondApplication));

        List<ApplicationDocument> applicationDocuments = applicationDocumentRepository.search(SearchCriteria
            .ApplicationDocumentSearchCriteria
            .builder()
            .applicationDocumentIds(firstApplicationDocument.getApplicationDocumentId(),
                secondApplicationDocument.getApplicationDocumentId())
            .applicationIds(firstApplicationDocument.getApplication().getApplicationId(),
                secondApplicationDocument.getApplication().getApplicationId())
            .build()).getObjects();

        Application foundFirstApplication = applicationDocuments.get(0).getApplication();
        Application foundSecondApplication = applicationDocuments.get(1).getApplication();

        assertThat(applicationDocuments).isNotNull();
        assertThat(foundFirstApplication).isNotNull();
        assertThat(foundFirstApplication.getApplicationId()).isEqualTo(firstApplication.getApplicationId());
        assertThat(foundSecondApplication.getApplicationId()).isEqualTo(secondApplication.getApplicationId());
        assertThat(applicationDocuments.get(0).getApplicationDocumentId()).isEqualTo(firstApplicationDocument.getApplicationDocumentId());
        assertThat(applicationDocuments.get(1).getApplicationDocumentId()).isEqualTo(secondApplicationDocument.getApplicationDocumentId());
    }

    @Test(expected = UncategorizedSQLException.class)
    public void testSearchWithInvalidCriteria() {
        //TODO
        ApplicationDocument applicationDocument = createApplicationDocument();

        ApplicationDocument applicationDocuments = applicationDocumentRepository.search(SearchCriteria
            .ApplicationDocumentSearchCriteria
            .builder()
            .build()).single();
    }

    private ApplicationProcess createApplicationProcess() {
        ApplicationProcess applicationProcess = BootstrapDataUtils.createApplicationProcess(new User(1), ApplicationProcess.Status.IN_PROCESS);
        return applicationProcessRepository.create(applicationProcess);
    }

    private ApplicationProcessContent createApplicationProcessContent(ApplicationProcess applicationProcess) {
        return applicationProcessContentRepository
            .create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);
    }

    private Application createApplication(ApplicationProcess applicationProcess, ApplicationProcessContent applicationProcessContent) {
        Application application = applicationRepository
            .create(new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, applicationProcess, applicationProcessContent, null));

        assertThat(application.getApplicationId()).isNotNull();

        return application;
    }

    private Application createApplication() {
        ApplicationProcess applicationProcess = createApplicationProcess();
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(applicationProcess);

        return createApplication(applicationProcess, applicationProcessContent);
    }

    private ApplicationDocument createApplicationDocument(ApplicationProcess applicationProcess, ApplicationProcessContent applicationProcessContent) {
        Application application = applicationRepository
            .create(new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, applicationProcess, applicationProcessContent, null));

        assertThat(application.getApplicationId()).isNotNull();

        return applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));
    }

    private ApplicationDocument createApplicationDocument() {
        Application application = createApplication();

        return applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));
    }
}
