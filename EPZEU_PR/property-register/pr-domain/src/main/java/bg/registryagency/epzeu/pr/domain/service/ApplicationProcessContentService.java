package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

/**
 * Интерфейс на услуга за работа със съдържание на заявление.
 *
 * {@link ApplicationProcessContent}
 */
public interface ApplicationProcessContentService {
    /**
     * Актуализира съдържанието на заявление.
     * @param applicationId идентификатор на заявление, което ще се актуализира.
     * @param content ново актуално съдържание за актуализация.
     */
    void updateContent(long applicationId, byte[] content);

    /**
     * Чете битовото съдържание на заявление.
     * @param applicationProcessContentId идентификатор на съдържанието на заявлението.
     * @return битов масив на съдържанието на заявлението.
     */
    byte[] readContent(Long applicationProcessContentId);

    /**
     * Създава съдържание на заявление.
     * @param applicationProcessId идентификатор на процес по заявяване, в който участва съответното съдържание на заявление.
     * @param type тип на съдържание на заявление.
     * @return създаденото съдържание на заявление с неговият идентификатор.
     */
    ApplicationProcessContent create(Long applicationProcessId, ApplicationProcessContent.Type type);

    /**
     * Създава съдържание на заявление.
     * @param applicationProcessId идентификатор на процес по заявяване, в който участва съответното съдържание на заявление.
     * @param type тип на съдържание на заявление.
     * @param content битово съдържание на заявление.
     * @return създаденото съдържание на заявление с неговият идентификатор.
     */
    ApplicationProcessContent create(Long applicationProcessId, ApplicationProcessContent.Type type, byte[] content);

    /**
     * Изтрива съдържание на заявление.
     * @param applicationProcessContentId идентификатор на съдържание на заявление, което да бъде изтрито.
     */
    void delete(Long applicationProcessContentId);

    void deleteByApplicationProcess(Long applicationProcessId);

    /**
     * Актуализира битовото съдържание на заявление.
     * @param applicationProcessContentId идентификационен номер на съдържанието.
     * @param content новото актуално битово съдържание.
     */
    void uploadFull(Long applicationProcessContentId, byte[] content);

    Result<ApplicationProcessContent> search(SearchCriteria.ApplicationProcessContentSearchCriteria searchCriteria);
}
