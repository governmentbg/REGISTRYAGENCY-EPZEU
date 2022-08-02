package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.domain.model.Operation;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

/**
 * Интерфейс на услуга за работа с операции.
 *
 * {@link bg.registryagency.epzeu.pr.domain.model.Operation}
 */
public interface OperationService {
    /**
     * Създава операция.
     * @param type тип на операция.
     * @param additionalData допълнителни данни на операция.
     * @return създаденото операция с идентификационен номер.
     */
    Operation create(Operation.Type type, String additionalData);

    /**
     * Актуализира операция.
     * @param operation нова актуална версия на операция.
     */
    void update(Operation operation);

    /**
     * Търси операция по подадени критерии.
     * @param operationSearchCriteria критерии за търсене.
     * @return намерени операции по подадените критерии.
     */
    Result<Operation> search(SearchCriteria.OperationSearchCriteria operationSearchCriteria);
}
