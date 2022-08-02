package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

/**
 * Интерфейс за поддържане и съхранение на обекти от тип Application.
 */
public interface ApplicationRepository {
    /**
     * Записва обект от тип Application в базата данни.
     * @param application който ще бъде записан в базата данни.
     * @return записания обект със създаден за него идентификационен номер на обект.
     */
    Application create(Application application);

    /**
     * Изтрива обект от тип Application от базата данни.
     * @param applicationId идентификационен номер на обекта, който да бъде изтрит.
     */
    void delete(Long applicationId);

    /**
     * Актуализира обект от тип Application в базата данни.
     * @param application актуалният обект, който да бъде подменен от стария в базата данни.
     */
    void update(Application application);

    /**
     * Търсене на обект или обекти от тип Application в базата данни.
     * @param applicationSearchCriteria критериите, по които ще се търси.
     * @return списък с намерените обекти или един обект когато критериите на търсене отговарят на точно един обект.
     */
    Result<Application> search(SearchCriteria.ApplicationSearchCriteria applicationSearchCriteria);
}
