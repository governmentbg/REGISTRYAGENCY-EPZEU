package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.repository.OperationRepository;
import bg.registryagency.epzeu.pr.domain.service.OperationService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Реализация на интерфейс OperationService за работа със операции.
 */
@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements OperationService {
    private final OperationRepository operationRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Operation create(Operation.Type type, String nextOperation) {
        Operation operation = new Operation();
        operation.setOperationId(UUID.randomUUID().toString());
        operation.setType(type);

        return operationRepository.create(operation);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Operation operation) {
        operationRepository.update(operation);
    }

    @Override
    @Transactional(readOnly = true)
    public Result<Operation> search(SearchCriteria.OperationSearchCriteria operationSearchCriteria) {
        return operationRepository.search(operationSearchCriteria);
    }
}
