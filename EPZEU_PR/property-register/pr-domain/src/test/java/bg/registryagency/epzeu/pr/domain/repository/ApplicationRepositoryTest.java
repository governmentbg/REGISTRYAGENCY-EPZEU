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
public class ApplicationRepositoryTest {
    @Autowired
    private ApplicationProcessRepository applicationProcessRepository;
    @Autowired
    private ApplicationProcessContentRepository applicationProcessContentRepository;
    @Autowired
    private ApplicationRepository applicationRepository;

    @Test
    public void testCreate() {
        createApplication();
    }

    @Test(expected = NullPointerException.class)
    public void testCreateWithInvalidParameters() {
        //TODO
        createApplication(null, null);
    }

    @Test
    public void testDelete() {
        Application application = createApplication();
        applicationRepository.delete(application.getApplicationId());

        List<Application> applications = applicationRepository.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationIds(application.getApplicationId())
            .build()).getObjects();

        assertThat(applications).isEmpty();
    }

    @Test(expected = UncategorizedSQLException.class)
    public void testDeleteWithInvalidParameters() {
        //TODO
        applicationRepository.delete(null);
    }

    @Test
    public void testUpdate() {
        Application application = createApplication();

        Integer oldOrder = application.getOrder();
        int newOrder = oldOrder + 1;
        application.setOrder(newOrder);
        applicationRepository.update(application);

        Application updatedApplication = applicationRepository.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationIds(application.getApplicationId())
            .build()).single();

        assertThat(updatedApplication).isNotNull();
        assertThat(updatedApplication.getOrder()).isEqualTo(newOrder);
    }

    @Test(expected = NullPointerException.class)
    public void testUpdateWithInvalidParameters() {
        //TODO
        applicationRepository.update(null);
    }

    @Test
    public void testSearchTwoApplications() {
        ApplicationProcess applicationProcess = createApplicationProcess();
        ApplicationProcessContent firstApplicationProcessContent = createApplicationProcessContent(applicationProcess);
        ApplicationProcessContent secondApplicationProcessContent = createApplicationProcessContent(applicationProcess);

        Application firstApplication = createApplication(applicationProcess, firstApplicationProcessContent);
        Application secondApplication = createApplication(applicationProcess, secondApplicationProcessContent);
        Application thirdApplication = createApplication();

        List<Application> applications = applicationRepository.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationIds(firstApplication.getApplicationId(), secondApplication.getApplicationId(), thirdApplication.getApplicationId())
            .build()).getObjects();

        assertThat(applications).isNotEmpty();
        assertThat(applications.size()).isEqualTo(3);
        assertThat(applications.get(0).getApplicationId()).isEqualTo(firstApplication.getApplicationId());
        assertThat(applications.get(1).getApplicationId()).isEqualTo(secondApplication.getApplicationId());
        assertThat(applications.get(2).getApplicationId()).isEqualTo(thirdApplication.getApplicationId());
    }

    @Test
    public void testSearchWithApplicationProcessId() {
        ApplicationProcess applicationProcess = createApplicationProcess();

        ApplicationProcessContent firstApplicationProcessContent = createApplicationProcessContent(applicationProcess);
        ApplicationProcessContent secondApplicationProcessContent = createApplicationProcessContent(applicationProcess);

        Application firstApplication = createApplication(applicationProcess, firstApplicationProcessContent);
        Application secondApplication = createApplication(applicationProcess, secondApplicationProcessContent);

        List<Application> applications = applicationRepository.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).getObjects();

        assertThat(applications).isNotEmpty();
        assertThat(applications.size()).isEqualTo(2);
        assertThat(applications.get(0).getApplicationId()).isEqualTo(firstApplication.getApplicationId());
        assertThat(applications.get(1).getApplicationId()).isEqualTo(secondApplication.getApplicationId());
    }

    @Test
    public void testSearchWithLoadApplicationDocuments() {
        //TODO
        Application application = createApplication();

        Application readApplication = applicationRepository.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationProcessId(application.getApplicationProcess().getApplicationProcessId())
            .loadApplicationDocuments(true)
            .build()).single();

        assertThat(readApplication).isNotNull();
        assertThat(readApplication.getApplicationId()).isEqualTo(application.getApplicationId());
        assertThat(readApplication.getApplicationDocuments()).isEqualTo(application.getApplicationDocuments());
    }

    @Test
    public void testSearchWithLoadApplicationContents() {
        Application application = createApplication();

        Application readApplication = applicationRepository.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationProcessId(application.getApplicationProcess().getApplicationProcessId())
            .loadApplicationContent(true)
            .build()).single();

        assertThat(readApplication).isNotNull();
        assertThat(readApplication.getApplicationId()).isEqualTo(application.getApplicationId());
        assertThat(readApplication.getApplicationProcessContent()).isNotNull();
        assertThat(readApplication.getApplicationProcessContent().getApplicationProcessContentId())
            .isEqualTo(application.getApplicationProcessContent().getApplicationProcessContentId());
    }

    private ApplicationProcess createApplicationProcess() {
        //Create Application Process
        ApplicationProcess applicationProcess = BootstrapDataUtils.createApplicationProcess(new User(1), ApplicationProcess.Status.IN_PROCESS);
        return applicationProcessRepository.create(applicationProcess);
    }

    private ApplicationProcessContent createApplicationProcessContent(ApplicationProcess applicationProcess) {
        //Create Application Process Content
        return applicationProcessContentRepository
            .create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);
    }

    private Application createApplication(ApplicationProcess applicationProcess, ApplicationProcessContent applicationProcessContent) {
        //Create Application
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
}
