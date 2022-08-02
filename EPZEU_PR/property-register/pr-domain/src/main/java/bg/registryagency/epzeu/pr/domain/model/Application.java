package bg.registryagency.epzeu.pr.domain.model;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * <div class="bg">Модел на заявление.</div>
 */
@Getter
@Setter
@NoArgsConstructor
public class Application {
    /** <div class="bg">Уникален идентификатор на заявление.</div> */
    private Long applicationId;
    /** <div class="bg">Номер на заявлението.</div> */
    private Integer order;
    /** <div class="bg">Тип на заявление.</div> */
    private ApplicationType type;

    /** <div class="bg">Процес на заявяване, в който участва заявлението.</div> */
    private ApplicationProcess applicationProcess;
    /** <div class="bg">Съдържание на заявлението.</div> */
    private ApplicationProcessContent applicationProcessContent;
    /** <div class="bg">Списък с прикачени документи.</div> */
    private List<ApplicationDocument> applicationDocuments;
    /** <div class="bg">Допълнителни данни за заявление.</div> */
    private ObjectNode additionalData;
    /**
     * <div class="bg">Конструктор за създаване на Заявление.</div>
     *
     * @param applicationId <div class="bg">Уникален идентификатор на заявление.</div>
     */
    public Application(Long applicationId) {
        this.applicationId = applicationId;
    }

    /**
     * <div class="bg">Конструктор за създаване на Заявление.</div>
     * @param applicationId <div class="bg">Уникален идентификатор на заявление.</div>
     * @param type <div class="bg">Тип на заявление.</div>
     */
    public Application(Long applicationId, ApplicationType type) {
        this.applicationId = applicationId;
        this.type = type;
    }

    /**
     * <div class="bg">Конструктор за създаване на Заявление.</div>
     * @param type <div class="bg">Тип на заявление.</div>
     * @param order <div class="bg">Номер на заявлението.</div>
     * @param applicationProcess <div class="bg">Процес на заяваване, в който участва заявлението.</div>
     * @param applicationProcessContent <div class="bg">Съдържание на заявлението.</div>
     */
    public Application(ApplicationType type, Integer order,
                       ApplicationProcess applicationProcess,
                       ApplicationProcessContent applicationProcessContent,
                       ObjectNode additionalData) {
        this.type = type;
        this.order = order;
        this.applicationProcess = applicationProcess;
        this.applicationProcessContent = applicationProcessContent;
        this.additionalData = additionalData;
    }

    /**
     * <div class="bg">Добавя прикачен документ към заявлението.</div>
     * @param applicationDocument <div class="bg">Документ, който да бъде добавен към заявлението.</div>
     */
    public void addApplicationDocument(ApplicationDocument applicationDocument) {
        if (this.applicationDocuments == null) {
            this.applicationDocuments = new ArrayList<>();
        }
        this.applicationDocuments.add(applicationDocument);
    }

    /**
     * <div class="bg">Добавяне на прикачени документи към заявлението.</div>
     * @param applicationDocuments <div class="bg">Списък от документи за добавяне в заявлението.</div>
     */
    public void addApplicationDocuments(List<ApplicationDocument> applicationDocuments) {
        if (this.applicationDocuments == null) {
            this.applicationDocuments = new ArrayList<>();
        }
        this.applicationDocuments.addAll(applicationDocuments);
    }
}
