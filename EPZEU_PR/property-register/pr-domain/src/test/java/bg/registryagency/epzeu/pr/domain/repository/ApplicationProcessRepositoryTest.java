package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.domain.conf.DomainRepositoryTestConfiguration;
import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.service.UserService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.LongNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomainRepositoryTestConfiguration.class)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, TransactionalTestExecutionListener.class})
@Transactional
public class ApplicationProcessRepositoryTest {
    @Autowired
    private ApplicationProcessRepository applicationProcessRepository;
    @Autowired
    private ApplicationProcessContentRepository applicationProcessContentRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ApplicationDocumentRepository applicationDocumentRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testCreate() {
        createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        ObjectNode jsonObject = BootstrapDataUtils.createObjectNode();

        ApplicationProcess applicationProcess = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
        }};

        ApplicationProcess applicationProcess2 = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
            setSigningGuid(UUID.randomUUID());
            setIncomingNumbers(new String[]{"1"});
            setErrorMessage("error");
            setAdditionalData(jsonObject);
        }};

        ApplicationProcess applicationProcess3 = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
            setIncomingNumbers(new String[]{"12", "22"});
            setErrorMessage("error");
            setAdditionalData(jsonObject);
        }};

        ApplicationProcess applicationProcess4 = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
            setSigningGuid(UUID.randomUUID());
            setIncomingNumbers(new String[]{"12", "22"});
            setErrorMessage("error");
        }};

        ApplicationProcess applicationProcess5 = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
            setAdditionalData(jsonObject);
        }};

        ApplicationProcess applicationProcess6 = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
            setSigningGuid(UUID.randomUUID());
        }};

        ApplicationProcess applicationProcess7 = new ApplicationProcess(){{
            setStatus(Status.IN_PROCESS);
            setUser(ensureUser());
            setSigningGuid(UUID.randomUUID());
            setIncomingNumbers(new String[]{"123", "233"});
            setErrorMessage("error");
            setAdditionalData(jsonObject);
        }};

        applicationProcess = applicationProcessRepository.create(applicationProcess);
        applicationProcess2 = applicationProcessRepository.create(applicationProcess2);
        applicationProcess3 = applicationProcessRepository.create(applicationProcess3);
        applicationProcess4 = applicationProcessRepository.create(applicationProcess4);
        applicationProcess5 = applicationProcessRepository.create(applicationProcess5);
        applicationProcess6 = applicationProcessRepository.create(applicationProcess6);
        applicationProcess7 = applicationProcessRepository.create(applicationProcess7);

        assertThat(applicationProcess.getApplicationProcessId()).isNotNull();
        assertThat(applicationProcess2.getApplicationProcessId()).isNotNull();
        assertThat(applicationProcess3.getApplicationProcessId()).isNotNull();
        assertThat(applicationProcess4.getApplicationProcessId()).isNotNull();
        assertThat(applicationProcess5.getApplicationProcessId()).isNotNull();
        assertThat(applicationProcess6.getApplicationProcessId()).isNotNull();
        assertThat(applicationProcess7.getApplicationProcessId()).isNotNull();
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateWithInvalidParameters() {
        //TODO
        createApplicationProcess(null, null);
    }

    @Test
    public void testDelete() {
        //Create Application Process
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        //Read Application Process from DB
        Result<ApplicationProcess> applicationProcessesPage =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .build());

        List<ApplicationProcess> applicationProcesses = applicationProcessesPage.getObjects();

        assertThat(applicationProcesses.size()).isEqualTo(1);
        assertThat(applicationProcesses.get(0).getApplicationProcessId()).isEqualTo(applicationProcess.getApplicationProcessId());

        //Delete Application Process
        applicationProcessRepository.delete(applicationProcess.getApplicationProcessId());

        //Try to get deleted Application Process
        ApplicationProcess resultAfterDeletion =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .build()).single();

        assertThat(resultAfterDeletion).isNull();
    }

    @Test
    public void testUpdate() {
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);
        applicationProcess.setStatus(ApplicationProcess.Status.SIGNING);
        applicationProcess.setSigningGuid(UUID.randomUUID());

        applicationProcessRepository.update(applicationProcess);

        ApplicationProcess updatedApplicationProcess = applicationProcessRepository.search(SearchCriteria.
            ApplicationProcessSearchCriteria.builder()
            .signingGuid(applicationProcess.getSigningGuid())
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(updatedApplicationProcess).isNotNull();
        assertThat(updatedApplicationProcess.getSigningGuid()).isEqualTo(applicationProcess.getSigningGuid());
        assertThat(updatedApplicationProcess.getStatus()).isEqualTo(ApplicationProcess.Status.SIGNING);

        applicationProcess.setStatus(ApplicationProcess.Status.IN_PROCESS);
        applicationProcess.setSigningGuid(null);

        applicationProcessRepository.update(applicationProcess);

        updatedApplicationProcess = applicationProcessRepository.search(SearchCriteria.
            ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(updatedApplicationProcess).isNotNull();
        assertThat(updatedApplicationProcess.getSigningGuid()).isNull();
        assertThat(updatedApplicationProcess.getStatus()).isEqualTo(ApplicationProcess.Status.IN_PROCESS);

        ObjectNode jsonObject = new ObjectNode(JsonNodeFactory.instance);
        jsonObject.set("longField", new LongNode(10));
        jsonObject.set("textField", new TextNode("text"));

        applicationProcess.setAdditionalData(jsonObject);

        applicationProcessRepository.update(applicationProcess);

        updatedApplicationProcess = applicationProcessRepository.search(SearchCriteria.
            ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(updatedApplicationProcess).isNotNull();
        assertThat(updatedApplicationProcess.getAdditionalData().toString())
            .isEqualTo(applicationProcess.getAdditionalData().toString());

        applicationProcess.setSigningGuid(UUID.randomUUID());

        applicationProcessRepository.update(applicationProcess);

        updatedApplicationProcess = applicationProcessRepository.search(SearchCriteria.
            ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(updatedApplicationProcess).isNotNull();
        assertThat(updatedApplicationProcess.getAdditionalData().toString())
            .isEqualTo(applicationProcess.getAdditionalData().toString());
        assertThat(updatedApplicationProcess.getSigningGuid()).isEqualTo(applicationProcess.getSigningGuid());

        applicationProcess.setSigningGuid(null);
        applicationProcess.setAdditionalData(null);

        applicationProcessRepository.update(applicationProcess);

        updatedApplicationProcess = applicationProcessRepository.search(SearchCriteria.
            ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(updatedApplicationProcess).isNotNull();
        assertThat(updatedApplicationProcess.getSigningGuid()).isNull();
        assertThat(updatedApplicationProcess.getAdditionalData()).isNull();

        String[] incomingNumbers = {"1", "2"};
        applicationProcess.setIncomingNumbers(incomingNumbers);

        applicationProcessRepository.update(applicationProcess);

        updatedApplicationProcess = applicationProcessRepository.search(SearchCriteria.
            ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(updatedApplicationProcess).isNotNull();
        assertThat(updatedApplicationProcess.getIncomingNumbers()).isNotNull();
        assertThat(updatedApplicationProcess.getIncomingNumbers().equals(incomingNumbers)).isNotNull();
    }

    @Test(expected = UncategorizedSQLException.class)
    public void testUpdateWithInvalidParameter() {
        //TODO
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        applicationProcess.setApplicationProcessId(null);

        applicationProcessRepository.update(applicationProcess);
    }

    @Test
    public void testSearchWithApplicationProcessId() {
        //Create Application Process
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        //Read Application Process from DB
        List<ApplicationProcess> applicationProcesses =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .build()).getObjects();

        assertThat(applicationProcesses.size()).isEqualTo(1);
        assertThat(applicationProcesses.get(0).getApplicationProcessId()).isEqualTo(applicationProcess.getApplicationProcessId());
    }

    @Test
    public void testSearchWithApplicationProcessIdAndLoadApplications() {
        //Create Application Process
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        //Create Application Process Contents
        ApplicationProcessContent firstApplicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);
        ApplicationProcessContent secondApplicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        //Create Applications
        Application firstApplication = new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, applicationProcess, firstApplicationProcessContent, null);
        Application secondApplication = new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 2, applicationProcess, secondApplicationProcessContent, null);

        firstApplication = applicationRepository.create(firstApplication);
        secondApplication = applicationRepository.create(secondApplication);

        applicationProcess.setMainApplication(firstApplication);
        applicationProcessRepository.update(applicationProcess);

        //Read Application Process from DB
        ApplicationProcess readApplicationProcess =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .loadApplications(true)
                .build()).single();

        assertThat(readApplicationProcess).isNotNull();
        assertThat(readApplicationProcess.getApplicationProcessId()).isEqualTo(applicationProcess.getApplicationProcessId());

        List<Application> applications = readApplicationProcess.getApplications();
        assertThat(applications).isNotEmpty();
        assertThat(applications.size()).isEqualTo(2);
        assertThat(applications.get(0).getApplicationId()).isEqualTo(firstApplication.getApplicationId());
        assertThat(applications.get(1).getApplicationId()).isEqualTo(secondApplication.getApplicationId());
    }

    @Test
    public void testSearchWithApplicationProcessIdAndLoadApplicationDocuments() {
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        ApplicationProcessContent applicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        Application application = applicationRepository.create(new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, applicationProcess, applicationProcessContent, null));

        ApplicationDocument firstApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));
        ApplicationDocument secondApplicationDocument = applicationDocumentRepository.create(BootstrapDataUtils.createApplicationDocument(application));

        applicationProcess.setMainApplication(application);
        applicationProcessRepository.update(applicationProcess);

        //Read Application Process from DB
        ApplicationProcess readApplicationProcess =
            applicationProcessRepository.search(SearchCriteria.ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .loadApplications(true)
                .loadApplicationDocuments(true)
                .build()).single();

        assertThat(readApplicationProcess).isNotNull();
        assertThat(readApplicationProcess.getApplicationProcessId()).isEqualTo(applicationProcess.getApplicationProcessId());

        List<Application> applications = readApplicationProcess.getApplications();
        Application readApplication = applications.get(0);

        assertThat(applications).isNotEmpty();
        assertThat(applications.size()).isEqualTo(1);
        assertThat(readApplication.getApplicationId()).isEqualTo(application.getApplicationId());

        List<ApplicationDocument> applicationDocuments = readApplication.getApplicationDocuments();

        assertThat(applicationDocuments).isNotEmpty();
        assertThat(applicationDocuments.size()).isEqualTo(2);
        assertThat(applicationDocuments.stream()
            .anyMatch(document -> document.getApplicationDocumentId().equals(firstApplicationDocument.getApplicationDocumentId())));
        assertThat(applicationDocuments.stream()
            .anyMatch(document -> document.getApplicationDocumentId().equals(secondApplicationDocument.getApplicationDocumentId())));
    }

    @Test
    public void testSearchWithApplicationProcessIdAndLoadApplicationContents() {
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        //Create Application Process Contents
        ApplicationProcessContent firstApplicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);
        ApplicationProcessContent secondApplicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        //Read Application Process from DB
        ApplicationProcess readApplicationProcess =
            applicationProcessRepository.search(SearchCriteria.ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .loadApplicationContents(true)
                .build()).single();

        assertThat(readApplicationProcess).isNotNull();
        assertThat(readApplicationProcess.getApplicationProcessId()).isEqualTo(applicationProcess.getApplicationProcessId());

        List<ApplicationProcessContent> contents = readApplicationProcess.getApplicationProcessContents();

        assertThat(contents).isNotEmpty();
        assertThat(contents.size()).isEqualTo(2);
        assertThat(contents).contains(firstApplicationProcessContent);
        assertThat(contents).contains(secondApplicationProcessContent);
    }


    @Test
    public void testSearchWithApplicationProcessIdAndLoadAllRelations() {
        //TODO
        //Create ApplicationProcess.
        ApplicationProcess applicationProcess = createApplicationProcess(ensureUser(), ApplicationProcess.Status.IN_PROCESS);

        //Create ApplicationContent.
        ApplicationProcessContent firstApplicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);
        ApplicationProcessContent secondApplicationProcessContent = applicationProcessContentRepository.
            create(applicationProcess.getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        //Create Applications.
        Application firstApplication = applicationRepository.
            create(new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, applicationProcess, firstApplicationProcessContent, null));

        Application secondApplication = applicationRepository.
            create(new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 2, applicationProcess, secondApplicationProcessContent, null));

        applicationProcess.setMainApplication(firstApplication);
        applicationProcessRepository.update(applicationProcess);

        //Create Application Document.
        ApplicationDocument applicationDocument = applicationDocumentRepository.
            create(BootstrapDataUtils.createApplicationDocument(firstApplication));

        //Read ApplicationProcess from Db with relations loaded.
        ApplicationProcess readApplicationProcess =
            applicationProcessRepository.search(SearchCriteria.ApplicationProcessSearchCriteria.builder()
                .applicationProcessId(applicationProcess.getApplicationProcessId())
                .loadApplicationContents(true)
                .loadApplicationDocuments(true)
                .loadApplications(true)
                .build()).single();

        assertThat(readApplicationProcess).isNotNull();
        assertThat(readApplicationProcess.getApplicationProcessId()).isEqualTo(applicationProcess.getApplicationProcessId());

        List<Application> applications = readApplicationProcess.getApplications();

        assertThat(applications).isNotEmpty();
        assertThat(applications.size()).isEqualTo(2);
        assertThat(applications.get(0).getApplicationId()).isEqualTo(firstApplication.getApplicationId());
        assertThat(applications.get(1).getApplicationId()).isEqualTo(secondApplication.getApplicationId());

        List<ApplicationDocument> applicationDocuments = applications.get(0).getApplicationDocuments();

        assertThat(applicationDocuments).isNotEmpty();
        assertThat(applicationDocuments.size()).isEqualTo(1);
        assertThat(applicationDocuments.stream()
            .anyMatch(document -> document.getApplicationDocumentId().equals(applicationDocument.getApplicationDocumentId())));

        List<ApplicationProcessContent> contents = readApplicationProcess.getApplicationProcessContents();

        assertThat(contents).isNotEmpty();
        assertThat(contents.size()).isEqualTo(2);
        assertThat(contents).contains(firstApplicationProcessContent);
        assertThat(contents).contains(secondApplicationProcessContent);
    }

    @Test
    public void testSearch() {
        ObjectNode jsonObject = BootstrapDataUtils.createObjectNode();

        var applicationProcess = new ApplicationProcess(){{
            setStatus(Status.SIGNING);
            setUser(ensureUser());
            setSigningGuid(UUID.randomUUID());
            setIncomingNumbers(new String[]{"12", "22"});
            setErrorMessage("error");
            setAdditionalData(jsonObject);
        }};

        applicationProcessRepository.create(applicationProcess);

        var foundApplicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(jsonObject.toString()).isEqualTo(foundApplicationProcess.getAdditionalData().toString());

        foundApplicationProcess = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .signingGuid(applicationProcess.getSigningGuid())
            .applicationProcessId(applicationProcess.getApplicationProcessId())
            .build()).single();

        assertThat(applicationProcess.getSigningGuid()).isEqualTo(foundApplicationProcess.getSigningGuid());

        var applicationProcesses = applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicantCin(applicationProcess.getUser().getCin())
            .build()).getObjects();

        final ApplicationProcess apf = applicationProcess;
        assertThat(applicationProcesses.stream()
            .anyMatch(ap -> ap.getApplicationProcessId().equals(apf.getApplicationProcessId())));

        applicationProcessRepository.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .signingGuid(applicationProcess.getSigningGuid())
            .applicantCin(applicationProcess.getUser().getCin())
            .build()).single();

        assertThat(applicationProcess.getSigningGuid()).isEqualTo(foundApplicationProcess.getSigningGuid());
    }

    @Test
    public void testSearchWithApplicantId() {
        User user = ensureUser();

        ApplicationProcess firstApplicationProcess = createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS);
        ApplicationProcess secondApplicationProcess = createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS);

        //Read Application Processes from DB
        List<ApplicationProcess> applicationProcesses =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicantCin(user.getCin())
                .build()).getObjects();

        assertThat(applicationProcesses.stream()
            .filter(process -> process.getUser().getUserId().equals(user.getUserId()) && process.getApplicationProcessId().equals(firstApplicationProcess.getApplicationProcessId()))
            .findAny()
            .orElse(null))
            .isNotNull();
        assertThat(applicationProcesses.stream()
            .filter(process -> process.getUser().getUserId().equals(user.getUserId()) && process.getApplicationProcessId().equals(secondApplicationProcess.getApplicationProcessId()))
            .findAny()
            .orElse(null))
            .isNotNull();
    }

    @Test
    public void testSearchWithApplicantIdAndPagination() {
        User user = ensureUser();

        //Create 5 Processes
        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();
        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();
        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();
        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();
        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();

        int pageSize = 2;
        int startIndex = 1;

        //Read the first page of Application Process
        Result<ApplicationProcess> applicationProcessesPage =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicantCin(user.getCin())
                .startIndex(startIndex)
                .pageSize(pageSize)
                .calculateCount(true)
                .build());

        assertThat(applicationProcessesPage).isNotNull();
        assertThat(applicationProcessesPage.getObjects()).isNotNull();
        assertThat(applicationProcessesPage.getObjects()).isNotEmpty();
        assertThat(applicationProcessesPage.getCount()).isNotNull();
        assertThat(applicationProcessesPage.getCount()).isNotNegative();

        int count = applicationProcessesPage.getCount();

        int numberOfPages = (int) Math.ceil(count / (double)pageSize);

        for (int page = 1; page < numberOfPages; page++) {
            applicationProcessesPage =
                applicationProcessRepository.search(SearchCriteria
                    .ApplicationProcessSearchCriteria.builder()
                    .applicantCin(user.getCin())
                    .startIndex((page * pageSize) + 1)
                    .pageSize(pageSize)
                    .build());

            assertThat(applicationProcessesPage).isNotNull();
            assertThat(applicationProcessesPage.getObjects()).isNotNull();
            assertThat(applicationProcessesPage.getObjects()).isNotEmpty();
            assertThat(applicationProcessesPage.getCount()).isNull();
        }
    }


    @Test(expected = DataIntegrityViolationException.class)
    public void testSearchWithInvalidPaginationParameters() {
        //TODO
        User user = ensureUser();

        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();

        int pageSize = -2;
        int startIndex = -1;

        Result<ApplicationProcess> applicationProcessesPage =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicantCin(user.getCin())
                .startIndex(startIndex)
                .pageSize(pageSize)
                .calculateCount(true)
                .build());
    }


    @Test(expected = UncategorizedSQLException.class)
    public void testSearchWithMissingPaginationParameter() {
        //TODO
        User user = ensureUser();

        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();

        Result<ApplicationProcess> applicationProcessesPage =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .build());
    }


    @Test(expected = NullPointerException.class)
    public void testSearchWithNullParameters() {
        //TODO
        User user = ensureUser();

        createApplicationProcess(user, ApplicationProcess.Status.IN_PROCESS).getApplicationProcessId();

        Result<ApplicationProcess> applicationProcessesPage =
            applicationProcessRepository.search(SearchCriteria
                .ApplicationProcessSearchCriteria.builder()
                .applicantCin(null)
                .maxNumberOfRecords(null)
                .startIndex(null)
                .pageSize(null)
                .calculateCount(null)
                .build());

        assertThat(applicationProcessesPage).isNotNull();
        assertThat(applicationProcessesPage.getObjects()).isNotNull();
        assertThat(applicationProcessesPage.getObjects()).isNotEmpty();
        assertThat(applicationProcessesPage.getCount()).isNotNull();

    }

    private ApplicationProcess createApplicationProcess(User user, ApplicationProcess.Status status) {
        ApplicationProcess applicationProcess = BootstrapDataUtils.createApplicationProcess(user, status);
        applicationProcess = applicationProcessRepository.create(applicationProcess);

        assertThat(applicationProcess.getApplicationProcessId()).isNotNull();

        return applicationProcess;
    }

    private User ensureUser() {
        User user = BootstrapDataUtils.createUser(1, 1);

        return userRepository.ensureUser(user);
    }
}
