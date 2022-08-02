package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

/**
 * Интерфейс за поддържане и съхранение на обекти от тип ApplicationProcess.
 */
public interface ApplicationProcessRepository {
    /**
     * Записва обект от тип ApplicationProcess в базата данни.
     * @param applicationProcess който ще бъде записан в базата данни.
     * @return записания обект със създаден за него идентификационен номер на обект.
     */
    ApplicationProcess create(ApplicationProcess applicationProcess);

    /**
     * Изтрива обект от тип ApplicationProcess от базата данни.
     * @param applicationProcessId идентификационен номер на обекта, който да бъде изтрит.
     */
    void delete(Long applicationProcessId);

    /**
     * Актуализира обект от тип ApplicationProcess в базата данни.
     * @param applicationProcess актуалният обект, който да бъде подменен от стария в базата данни.
     */
    void update(ApplicationProcess applicationProcess);

    /**
     * Търсене на обект или обекти от тип ApplicationProcess в базата данни.
     * @param applicationProcessSearchCriteria критериите, по които ще се търси.
     * @return списък с намерените обекти или един обект когато критериите на търсене отговарят на точно един обект.
     */
    Result<ApplicationProcess> search(SearchCriteria.ApplicationProcessSearchCriteria applicationProcessSearchCriteria);
}
