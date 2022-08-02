package bg.registryagency.epzeu.pr.domain.repository.impl;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationProcessContentRepository;
import bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocesscontent.*;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.io.InputStream;

/**
 * Реализация на интерфейс ApplicationProcessContentRepository за поддържане и съхранение на обекти от тип ApplicationProcessContent.
 */
@Repository
public class ApplicationProcessContentRepositoryImpl implements ApplicationProcessContentRepository {
    private final ApplicationProcessContentCreateSP applicationProcessesContentCreateSP;
    private final ApplicationProcessContentDeleteSP applicationProcessContentDeleteSP;
    private final ApplicationProcessContentReadSP applicationProcessContentReadSP;
    private final ApplicationProcessContentSearchSP applicationProcessContentSearchSP;
    private final ApplicationProcessContentUpdateSP applicationProcessContentUpdateSP;
    private final ApplicationProcessContentUploadSP applicationProcessContentUploadSP;

    public ApplicationProcessContentRepositoryImpl(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.applicationProcessesContentCreateSP = new ApplicationProcessContentCreateSP(dataSource);
        this.applicationProcessContentDeleteSP = new ApplicationProcessContentDeleteSP(dataSource);
        this.applicationProcessContentReadSP = new ApplicationProcessContentReadSP(dataSource);
        this.applicationProcessContentSearchSP = new ApplicationProcessContentSearchSP(dataSource);
        this.applicationProcessContentUpdateSP = new ApplicationProcessContentUpdateSP(dataSource);

        this.applicationProcessContentUploadSP = new ApplicationProcessContentUploadSP(jdbcTemplate);
    }

    @Override
    public ApplicationProcessContent create(ApplicationProcessContent applicationProcessContent) {
        applicationProcessContent.setApplicationProcessContentId(this.applicationProcessesContentCreateSP.execute(applicationProcessContent));
        return applicationProcessContent;
    }

    @Override
    public ApplicationProcessContent create(Long applicationProcessId, ApplicationProcessContent.Type type) {
        Long id = this.applicationProcessesContentCreateSP.execute(applicationProcessId, type);
        return new ApplicationProcessContent(id, type, applicationProcessId);
    }

    @Override
    public void delete(Long applicationProcessContentId) {
        this.applicationProcessContentDeleteSP.execute(applicationProcessContentId);
    }

    @Override
    public byte[] readContent(Long applicationProcessContentId) {
        return this.applicationProcessContentReadSP.execute(applicationProcessContentId);
    }

//    @Override
//    public InputStream readContentStream(Long applicationProcessContentId) {
//        return jdbcTemplate.execute(connection -> {
//            PreparedStatement ps = connection.prepareCall("{call AP.f_application_process_contents_read(?)}");
//            ps.setLong(1, applicationProcessContentId);
//
//            return ps;
//        }, new PreparedStatementCallback<InputStream>() {
//            @Override
//            public InputStream doInPreparedStatement(PreparedStatement ps) throws SQLException, DataAccessException {
//                ps.execute();
//                return ps.getResultSet().getBlob(1).getBinaryStream();
//            }
//        });
//
////        return this.applicationProcessContentReadSP.execute2(applicationProcessContentId);
//    }

    @Override
    public void update(ApplicationProcessContent applicationProcessContent) {
        this.applicationProcessContentUpdateSP.execute(applicationProcessContent);
    }

    @Override
    public Result<ApplicationProcessContent> search(SearchCriteria.ApplicationProcessContentSearchCriteria searchCriteria) {
        return applicationProcessContentSearchSP.execute(searchCriteria);
    }

    /**
     * Uploads content in chunks.
     * Uploading in chunks is useful if file is large if the file is small upload it in one chunk.
     * @param applicationProcessContentId Process Content ID which uploading content for.
     * @param content Content for uploading
     * @param offset Offset is start index when uploading in chunks. The first chunk always starts with offset 1, if uploading
     *               more than one chunks offset of the second chunk will start from offset of the last chunk + length
     * @param length Length of the chunk which is uploading
     */
    @Override
    public void uploadChunk(Long applicationProcessContentId, byte[] content, int offset, int length) {
        this.applicationProcessContentUploadSP.execute(applicationProcessContentId, content, offset, length);
    }

    /**
     * Uploads whole content.
     * Use this method if content to upload is not very large.
     * If the content is large then prefer using uploadChunk {@link bg.registryagency.epzeu.pr.domain.repository.impl.ApplicationProcessContentRepositoryImpl#uploadChunk}
     * @param applicationProcessContentId Process Content ID which uploading content for.
     * @param content Content for uploading.
     */
    @Override
    public void uploadFull(Long applicationProcessContentId, byte[] content) {
        this.applicationProcessContentUploadSP.execute(applicationProcessContentId, content, 1, content.length);
    }

    @Override
    public void uploadFull(Long applicationProcessContentId, Long applicationProcessId, InputStream contentStream) {
        this.applicationProcessContentUploadSP.execute(applicationProcessContentId, contentStream);
    }
}
