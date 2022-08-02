package bg.registryagency.epzeu.pr.domain.repository.impl;

import bg.registryagency.epzeu.pr.domain.model.Operation;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.OperationRepository;
import bg.registryagency.epzeu.pr.domain.repository.sp.operation.OperationCreateSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.operation.OperationSearchSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.operation.OperationUpdateSP;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

/**
 * Реализация на интерфейс OperationRepository за поддържане и съхранение на обекти от тип Operation.
 */
@Repository
public class OperationRepositoryImpl implements OperationRepository {
    private final OperationCreateSP operationCreateSP;
    private final OperationUpdateSP operationUpdateSP;
    private final OperationSearchSP operationSearchSP;

    public OperationRepositoryImpl(DataSource dataSource) {
        this.operationCreateSP = new OperationCreateSP(dataSource);
        this.operationUpdateSP = new OperationUpdateSP(dataSource);
        this.operationSearchSP = new OperationSearchSP(dataSource);
    }

    @Override
    public Operation create(Operation operation) {
        return this.operationCreateSP.execute(operation);
    }

    @Override
    public void update(Operation operation) {
        this.operationUpdateSP.execute(operation);
    }

    @Override
    public Result<Operation> search(SearchCriteria.OperationSearchCriteria operationSearchCriteria) {
        return this.operationSearchSP.execute(operationSearchCriteria);
    }
}
