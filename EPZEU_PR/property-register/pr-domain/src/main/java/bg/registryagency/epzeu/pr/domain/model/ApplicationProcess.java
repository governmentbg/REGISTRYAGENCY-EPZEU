package bg.registryagency.epzeu.pr.domain.model;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

/**
 * <div class="bg">Модел на данни за процес на заявяване на услуга.</div>
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class ApplicationProcess {
    /**
     * <div class="bg">Уникален идентификатор на данни за процес на заявяване на услуга.</div>
     */
    private Long applicationProcessId;
    /**
     * <div class="bg">
     * Статус на процеса:
     * <li>{@link ApplicationProcess.Status#IN_PROCESS}</li>
     * <li>{@link ApplicationProcess.Status#SIGNING}</li>
     * <li>{@link ApplicationProcess.Status#ERROR_IN_SIGNING}</li>
     * <li>{@link ApplicationProcess.Status#WAIT_PREREGISTRATION_COMPLETION}</li>
     * <li>{@link ApplicationProcess.Status#READY_FOR_SENDING}</li>
     * <li>{@link ApplicationProcess.Status#SENDING}</li>
     * <li>{@link ApplicationProcess.Status#ACCEPTED}</li>
     * <li>{@link ApplicationProcess.Status#ERROR_IN_ACCEPTING}</li>
     * <li>{@link ApplicationProcess.Status#COMPLETED}</li>
     * </div>
     */
    private ApplicationProcess.Status status;
    /**
     * <div class="bg">Заявителят на услугата стартирал процеса по заявяване.</div>
     */
    private User user;
    /**
     * <div class="bg">Идентификатор на заявката за подписване в модула за подписване.</div>
     */
    private UUID signingGuid;
    /**
     * <div class="bg">Дата на създаване на процеса.</div>
     */
    private LocalDateTime createdOn;
    /**
     * <div class="bg">Дата на последна промяна на процеса.</div>
     */
    private LocalDateTime updatedOn;
    /**
     * <div class="bg">Входящи номера на заявления в рамките на процес в PR.</div>
     */
    private String[] incomingNumbers;
    /**
     * <div class="bg">Съобщение за грешка при обработката на процеса.</div>
     */
    private String errorMessage;
    /** <div class="bg">Допълнителни данни за заявление.</div> */
    private ObjectNode additionalData;

    /**
     * <div class="bg">Основно заявление на Процеса на заяваване на услуга. Основното заявление е заявлението, с което се стартира процеса по заявяване.</div>
     */
    private Application mainApplication;
    /**
     * <div class="bg">Списък със заявленията свързани с процеса по заявяване на услуга.</div>
     */
    private List<Application> applications;
    /**
     * <div class="bg">Списък със съдържанията на заявленията.</div>
     */
    private List<ApplicationProcessContent> applicationProcessContents;
    /**
     * <div class="bg">Индикира дали има направени промени по номенклатурите.</div>
     */
    private boolean hasChangesInApplicationsNomenclature;
    /**
     * <div class="bg">Конструктор за създаване на Процес по заявяване на услуга.</div>
     *
     * @param applicationProcessId <div class="bg">�?дентификатор на Процес по заявяване на услуга.</div>
     */
    public ApplicationProcess(Long applicationProcessId) {
        this.applicationProcessId = applicationProcessId;
    }

    public List<Application> getApplications() {
        if (this.applications == null) {
            this.applications = new ArrayList<>();
        }
        return this.applications;
    }

    /**
     * <div class="bg">Добавя заявление към Процеса на заявяване на услуга.</div>
     *
     * @param application <div class="bg">Заявление, което да бъде дабавено.</div>
     */
    public void addApplication(Application application) {
        if (this.applications == null) {
            this.applications = new ArrayList<>();
        }
        this.applications.add(application);
    }

    /**
     * <div class="bg">Добавяне на заявления към Процеса на заявяване на услуга.</div>
     *
     * @param applications <div class="bg">Списък със заявления, които да бъдат добавени.</div>
     */
    public void addApplications(List<Application> applications) {
        if (this.applications == null) {
            this.applications = new ArrayList<>();
        }
        this.applications.addAll(applications);
    }

    /**
     * <div class="bg">Добавяне на съдържанието на заявления към Процеса на заявяване на услуга.</div>
     *
     * @param applicationProcessContent <div class="bg">Съдържание на заявление, което да бъдат добавено.</div>
     */
    public void addApplicationProcessContent(ApplicationProcessContent applicationProcessContent) {
        if (this.applicationProcessContents == null) {
            this.applicationProcessContents = new ArrayList<>();
        }
        this.applicationProcessContents.add(applicationProcessContent);
    }

    /**
     * <div class="bg">Добавяне на списък със съдържания на заявления към Процеса на заявяване на услуга.</div>
     *
     * @param applicationProcessContents <div class="bg">Списък със съдържания на заявления, които да бъдат добавени.</div>
     */
    public void addApplicationProcessContents(List<ApplicationProcessContent> applicationProcessContents) {
        if (this.applicationProcessContents == null) {
            this.applicationProcessContents = new ArrayList<>();
        }
        this.applicationProcessContents.addAll(applicationProcessContents);
    }

    /**
     * <div class="bg">
     * Статус на Процес на заявяване на услуга
     * <li>{@link #IN_PROCESS}</li>
     * <li>{@link #SIGNING}</li>
     * <li>{@link #ERROR_IN_SIGNING}</li>
     * <li>{@link #WAIT_PREREGISTRATION_COMPLETION}</li>
     * <li>{@link #READY_FOR_SENDING}</li>
     * <li>{@link #SENDING}</li>
     * <li>{@link #ACCEPTED}</li>
     * <li>{@link #ERROR_IN_ACCEPTING}</li>
     * <li>{@link #COMPLETED}</li>
     * </div>
     */
    @Getter
    public enum Status {
        /**
         * <div class="bg">В процес на попълване</div>
         */
        IN_PROCESS(1),
        /**
         * <div class="bg">В процес на подписване</div>
         */
        SIGNING(2),
        /**
         * <div class="bg">Грешка при подписване</div>
         */
        ERROR_IN_SIGNING(3),
        /**
         * <div class="bg">Чака приключване на пререгистрация</div>
         */
        WAIT_PREREGISTRATION_COMPLETION(4),
        /**
         * <div class="bg">Готово за изпращане</div>
         */
        READY_FOR_SENDING(5),
        /**
         * <div class="bg">В процес на изпращане</div>
         */
        SENDING(6),
        /**
         * <div class="bg">Прието</div>
         */
        ACCEPTED(7),
        /**
         * <div class="bg">Грешка при приемане</div>
         */
        ERROR_IN_ACCEPTING(8),
        /**
         * <div class="bg">Приключен</div>
         */
        COMPLETED(9);

        final static Map<Integer, Status> types = new HashMap<>();

        static {
            types.put(IN_PROCESS.id, IN_PROCESS);
            types.put(SIGNING.id, SIGNING);
            types.put(ERROR_IN_SIGNING.id, ERROR_IN_SIGNING);
            types.put(WAIT_PREREGISTRATION_COMPLETION.id, WAIT_PREREGISTRATION_COMPLETION);
            types.put(READY_FOR_SENDING.id, READY_FOR_SENDING);
            types.put(SENDING.id, SENDING);
            types.put(ACCEPTED.id, ACCEPTED);
            types.put(ERROR_IN_ACCEPTING.id, ERROR_IN_ACCEPTING);
            types.put(COMPLETED.id, COMPLETED);
        }

        private int id;

        Status(int id) {
            this.id = id;
        }

        public static Status fromInteger(int id) {
            Status type = types.get(id);

            if (type == null) {
                throw new EnumConstantNotPresentException(Status.class, Integer.toString(id));
            }

            return type;
        }
    }
}
