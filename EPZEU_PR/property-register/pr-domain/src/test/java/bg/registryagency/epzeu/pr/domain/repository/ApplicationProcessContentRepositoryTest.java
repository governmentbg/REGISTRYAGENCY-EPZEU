package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.domain.conf.DomainRepositoryTestConfiguration;
import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomainRepositoryTestConfiguration.class)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, TransactionalTestExecutionListener.class})
@Transactional
public class ApplicationProcessContentRepositoryTest {

    @Autowired
    private ApplicationProcessContentRepository applicationProcessContentRepository;
    @Autowired
    private ApplicationProcessRepository applicationProcessRepository;
    @Autowired
    private ApplicationRepository applicationRepository;

    @Test
    public void testCreate() {
        createApplicationProcessContent(createApplicationProcess().getApplicationProcessId(), ApplicationProcessContent.Type.XML);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateWithoutApplicationProcessId() {
        createApplicationProcessContent(null, ApplicationProcessContent.Type.XML);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateWithoutApplicationProcessContentType() {
        createApplicationProcessContent(createApplicationProcess().getApplicationProcessId(), null);
    }

    @Test
    public void testFullUploadAndRead() throws IOException {
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(createApplicationProcess().getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        File xmlFile = BootstrapDataUtils.getFile();
        byte[] contentBytes = Files.readAllBytes(xmlFile.toPath());

        applicationProcessContentRepository.uploadFull(applicationProcessContent.getApplicationProcessContentId(), contentBytes);

        byte[] readBytes = applicationProcessContentRepository.readContent(applicationProcessContent.getApplicationProcessContentId());

        assertThat(readBytes).isNotEmpty();
        assertThat(readBytes).isEqualTo(contentBytes);
    }

    @Test
    public void testUploadFileByStream() throws IOException, SQLException {
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(createApplicationProcess().getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        File xmlFile = BootstrapDataUtils.getFile();

        FileInputStream fileInputStream = new FileInputStream(xmlFile);

        applicationProcessContentRepository.uploadFull(applicationProcessContent.getApplicationProcessContentId(),createApplicationProcess().getApplicationProcessId(), fileInputStream);

        byte[] bytes = applicationProcessContentRepository.readContent(applicationProcessContent.getApplicationProcessContentId());

        assertThat(bytes).isNotEmpty();
    }

    @Test
    public void testChunkUploadAndRead()  throws IOException{
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(createApplicationProcess().getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        File xmlFile = BootstrapDataUtils.getFile();
        byte[] contentBytes = Files.readAllBytes(xmlFile.toPath());

        int chunkSize = 3;
        int numberOfChunks = (contentBytes.length + chunkSize - 1) / chunkSize;

        byte[] chunk;

        for (int i = 1; i < numberOfChunks; i++) {
            int offset = ((i - 1) * chunkSize);
            chunk = Arrays.copyOfRange(contentBytes, offset, offset + chunkSize);
            applicationProcessContentRepository.uploadChunk(applicationProcessContent.getApplicationProcessContentId(),
                chunk, offset + 1, chunk.length);
        }

        // Upload last chunk
        int end;
        if (contentBytes.length % chunkSize == 0) {
            end = contentBytes.length;
        } else {
            end = contentBytes.length % chunkSize + chunkSize * (numberOfChunks - 1);
        }

        int offset = ((numberOfChunks - 1) * chunkSize);

        chunk = Arrays.copyOfRange(contentBytes, offset, end);

        applicationProcessContentRepository.uploadChunk(applicationProcessContent.getApplicationProcessContentId(),
            chunk, offset + 1, chunk.length);

        byte[] readBytes = applicationProcessContentRepository.readContent(applicationProcessContent.getApplicationProcessContentId());

        assertThat(readBytes).isNotEmpty();
        assertThat(readBytes).isEqualTo(contentBytes);
    }

    @Test
    public void testDelete() {
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(createApplicationProcess().getApplicationProcessId(), ApplicationProcessContent.Type.XML);

        applicationProcessContentRepository.delete(applicationProcessContent.getApplicationProcessContentId());

        byte[] readBytes = applicationProcessContentRepository.readContent(applicationProcessContent.getApplicationProcessContentId());

        assertThat(readBytes).isNull();
    }

    @Test
    public void testSearchWithApplicationProcessId() {
        Long applicationProcessId = createApplicationProcess().getApplicationProcessId();
        ApplicationProcessContent firstApplicationProcessContent = createApplicationProcessContent(applicationProcessId, ApplicationProcessContent.Type.XML);
        ApplicationProcessContent secondApplicationProcessContent = createApplicationProcessContent(applicationProcessId, ApplicationProcessContent.Type.XML);

        List<ApplicationProcessContent> applicationProcessContents = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .build()).getObjects();

        assertThat(applicationProcessContents).isNotEmpty();
        assertThat(applicationProcessContents.size()).isEqualTo(2);
        assertThat(applicationProcessContents).contains(firstApplicationProcessContent);
        assertThat(applicationProcessContents).contains(secondApplicationProcessContent);
    }

    @Test
    public void testSearchWithApplicationIds() {
        ApplicationProcess firstApplicationProcess = createApplicationProcess();
        ApplicationProcessContent firstApplicationProcessContent = createApplicationProcessContent(firstApplicationProcess.getApplicationProcessId(),
            ApplicationProcessContent.Type.XML);
        ApplicationProcessContent secondApplicationProcessContent = createApplicationProcessContent(firstApplicationProcess.getApplicationProcessId(),
            ApplicationProcessContent.Type.XML);

        ApplicationProcess secondApplicationProcess = createApplicationProcess();
        ApplicationProcessContent thirdApplicationProcessContent = createApplicationProcessContent(secondApplicationProcess.getApplicationProcessId(),
            ApplicationProcessContent.Type.JSON);

        //Create Applications
        Application firstApplication = new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, firstApplicationProcess, firstApplicationProcessContent, null);
        Application secondApplication = new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 2, firstApplicationProcess, secondApplicationProcessContent, null);
        Application thirdApplication = new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, secondApplicationProcess, thirdApplicationProcessContent, null);

        firstApplication = applicationRepository.create(firstApplication);
        secondApplication = applicationRepository.create(secondApplication);
        thirdApplication = applicationRepository.create(thirdApplication);


        List<ApplicationProcessContent> applicationProcessContents = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationIds(firstApplication.getApplicationId(), secondApplication.getApplicationId(), thirdApplication.getApplicationId())
            .build()).getObjects();

        assertThat(applicationProcessContents).isNotEmpty();
        assertThat(applicationProcessContents.size()).isEqualTo(3);
        assertThat(applicationProcessContents).contains(firstApplicationProcessContent);
        assertThat(applicationProcessContents).contains(secondApplicationProcessContent);
        assertThat(applicationProcessContents).contains(thirdApplicationProcessContent);
    }

    @Test
    public void testSearchWithApplicationIdsAndType() {
        //TODO
        //Create Application process.
        ApplicationProcess applicationProcess = createApplicationProcess();
        //Create Application process content.
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(applicationProcess.getApplicationProcessId(),
            ApplicationProcessContent.Type.XML);

        //Create Application
        Application application = new Application(ApplicationType.APPLICATION_CERTIFICATE_PERSON, 1, applicationProcess, applicationProcessContent, null);
        application = applicationRepository.create(application);

        //Read application process contents with applicationIds and Type.
        List<ApplicationProcessContent> applicationProcessContents = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationIds(application.getApplicationId())
            .type(applicationProcessContent.getType())
            .build()).getObjects();

        assertThat(applicationProcessContents).isNotEmpty();
        assertThat(applicationProcessContents.size()).isEqualTo(1);
        assertThat(applicationProcessContents.get(0).getApplicationProcessContentId()).isEqualTo(applicationProcessContent.getApplicationProcessContentId());
        assertThat(applicationProcessContents.get(0).getType()).isEqualTo(applicationProcessContent.getType());
        assertThat(applicationProcessContents).contains(applicationProcessContent);
    }

    @Test
    public void testUpdate() {
        Long applicationProcessId = createApplicationProcess().getApplicationProcessId();
        ApplicationProcessContent applicationProcessContent = createApplicationProcessContent(applicationProcessId, ApplicationProcessContent.Type.XML);

        ApplicationProcessContent readApplicationProcessContent = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .build()).single();

        assertThat(readApplicationProcessContent).isNotNull();
        assertThat(readApplicationProcessContent.getType()).isEqualTo(applicationProcessContent.getType());

        ApplicationProcessContent.Type newType = ApplicationProcessContent.Type.JSON;
        applicationProcessContent.setType(newType);

        applicationProcessContentRepository.update(applicationProcessContent);

        ApplicationProcessContent updatedApplicationProcessContent = applicationProcessContentRepository.search(SearchCriteria
            .ApplicationProcessContentSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .build()).single();

        assertThat(updatedApplicationProcessContent).isNotNull();
        assertThat(updatedApplicationProcessContent.getType()).isEqualTo(newType);
    }

    private ApplicationProcess createApplicationProcess() {
        ApplicationProcess applicationProcess = BootstrapDataUtils.createApplicationProcess(new User(1), ApplicationProcess.Status.IN_PROCESS);
        applicationProcess = applicationProcessRepository.create(applicationProcess);

        return applicationProcess;
    }

    private ApplicationProcessContent createApplicationProcessContent(Long applicationProcessId, ApplicationProcessContent.Type type) {
        ApplicationProcessContent applicationProcessContent = applicationProcessContentRepository.create(applicationProcessId, type);

        assertThat(applicationProcessContent.getApplicationProcessContentId()).isNotNull();

        return applicationProcessContent;
    }
}
