package bg.registryagency.epzeu.pr.domain.repository.impl;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationRepository;
import bg.registryagency.epzeu.pr.domain.repository.sp.application.ApplicationCreateSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.application.ApplicationDeleteSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.application.ApplicationSearchSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.application.ApplicationUpdateSP;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

/**
 * Реализация на интерфейс ApplicationRepository за поддържане и съхранение на обекти от тип Application.
 */
@Repository
public class ApplicationRepositoryImpl implements ApplicationRepository {
    private final ApplicationCreateSP applicationCreateSP;
    private final ApplicationDeleteSP applicationDeleteSP;
    private final ApplicationSearchSP applicationSearchSP;
    private final ApplicationUpdateSP applicationUpdateSP;

    public ApplicationRepositoryImpl(DataSource dataSource) {
        this.applicationCreateSP = new ApplicationCreateSP(dataSource);
        this.applicationDeleteSP = new ApplicationDeleteSP(dataSource);
        this.applicationSearchSP = new ApplicationSearchSP(dataSource);
        this.applicationUpdateSP = new ApplicationUpdateSP(dataSource);
    }

    @Override
    public Application create(Application application) {
        application.setApplicationId(this.applicationCreateSP.execute(application));
        return application;
    }

    @Override
    public void delete(Long applicationId) {
        this.applicationDeleteSP.execute(applicationId);
    }

    @Override
    public void update(Application application) {
        this.applicationUpdateSP.execute(application);
    }

    @Override
    public Result<Application> search(SearchCriteria.ApplicationSearchCriteria applicationSearchCriteria) {
        return this.applicationSearchSP.execute(applicationSearchCriteria);
    }
}
