package bg.registryagency.epzeu.pr.domain.repository.impl;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationProcessRepository;
import bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess.ApplicationProcessesCreateSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess.ApplicationProcessesDeleteSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess.ApplicationProcessesSearchSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess.ApplicationProcessesUpdateSP;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

/**
 * Реализация на интерфейс ApplicationProcessRepository за поддържане и съхранение на обекти от тип ApplicationProcess.
 */
@Repository
public class ApplicationProcessRepositoryImpl implements ApplicationProcessRepository {
    private final ApplicationProcessesCreateSP applicationProcessesCreateSP;
    private final ApplicationProcessesDeleteSP applicationProcessesDeleteSP;
    private final ApplicationProcessesUpdateSP applicationProcessesUpdateSP;
    private final ApplicationProcessesSearchSP applicationProcessesSearchSP;

    public ApplicationProcessRepositoryImpl(DataSource dataSource) {
        this.applicationProcessesCreateSP = new ApplicationProcessesCreateSP(dataSource);
        this.applicationProcessesDeleteSP = new ApplicationProcessesDeleteSP(dataSource);
        this.applicationProcessesUpdateSP = new ApplicationProcessesUpdateSP(dataSource);
        this.applicationProcessesSearchSP = new ApplicationProcessesSearchSP(dataSource);
    }

    @Override
    public ApplicationProcess create(ApplicationProcess applicationProcess) {
        applicationProcess.setApplicationProcessId(this.applicationProcessesCreateSP.execute(applicationProcess));
        return applicationProcess;
    }

    @Override
    public void delete(Long applicationProcessId) {
        this.applicationProcessesDeleteSP.execute(applicationProcessId);
    }

    @Override
    public void update(ApplicationProcess applicationProcess) {
        this.applicationProcessesUpdateSP.execute(applicationProcess);
    }

    @Override
    public Result<ApplicationProcess> search(SearchCriteria.ApplicationProcessSearchCriteria applicationProcessSearchCriteria) {
        return this.applicationProcessesSearchSP.execute(applicationProcessSearchCriteria);
    }
}
