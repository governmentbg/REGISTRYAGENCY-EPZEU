package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.model.Operation;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

/**
 * Интерфейс за поддържане и съхранение на операции.
 */
public interface OperationRepository {
    /**
     * Записва обект от тип Operation в базата данни.
     * @param operation който ще бъде записан в базата данни.
     * @return записания обект със създаден за него идентификационен номер на обект.
     */
    Operation create(Operation operation);

    /**
     * Актуализира обект от тип Operation в базата данни.
     * @param operation актуалният обект, който да бъде подменен в базата данни.
     */
    void update(Operation operation);

    /**
     * Търсене на обект или обекти от тип Operation в базата данни.
     * @param operationSearchCriteria критериите, по които ще се търси.
     * @return списък с намерените обекти или един обект когато критериите на търсене отговарят на точно един обект.
     */
    Result<Operation> search(SearchCriteria.OperationSearchCriteria operationSearchCriteria);
}
