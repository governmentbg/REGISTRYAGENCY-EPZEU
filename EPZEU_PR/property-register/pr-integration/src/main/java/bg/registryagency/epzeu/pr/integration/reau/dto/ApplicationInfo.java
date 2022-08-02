package bg.registryagency.epzeu.pr.integration.reau.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.UUID;

/**
 * Контейнер на данни за информация за заявление.
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@Schema(name = "ApplicationInfo", description = "Контейнер на данни за информация за заявление.")
public class ApplicationInfo {

    //Key which is useful for finding
    /** Служебен помощен ключ. */
    @Schema(name = "processKey", description = "Служебен помощен ключ.")
    private Long processKey;

    //Application Process Content's key for mapping incomingNumber to corresponding App Process Content
    /** Ключ, по койно се свързват входящния номер със съответния процес по заявяване. */
    @Schema(name = "contentKey", description = "Ключ, по койно се свързват входящния номер със съответния процес по заявяване.")
    private Long contentKey;

    //Incoming number of current application in REAU
    /** Входящ номер на текущото заявление в РЕАУ. */
    @Schema(name = "incomingNumber", description = "Входящ номер на текущото заявление в РЕАУ.")
    private String incomingNumber;

    //Initial incoming number is passed when current application is application for correction and this is REAU incoming number of related with it initial application
    /** Този параметър се подава при подаване на корегиращо заявление. Той свързва корегиращото заявление с неговия отигинал в РЕАУ. */
    @Schema(name = "initialIncomingNumber", description = "Този параметър се подава при подаване на корегиращо заявление. Той свързва корегиращото заявление с неговия оригинал в РЕАУ.")
    private String initialIncomingNumber;

    //Date of registration of application in REAU
    /** Дата на регистриране на заявление в РЕАУ. */
    @Schema(name = "registrationTime", description = "Дата на регистриране на заявление в РЕАУ.")
    private LocalDateTime registrationTime;

    //Correction Application Incoming Number
    /** Входящ номер на корегиращо заявление. */
    @Schema(name = "correctionApplicationNumber", description = "Входящ номер на корегиращо заявление.")
    private String correctionApplicationNumber;

    //Date of registration of correction application in REAU
    /** Дата на регистриране на корегиращо заявление в РЕАУ. */
    @Schema(name = "correctionApplicationRegTime", description = "Дата на регистриране на корегиращо заявление в РЕАУ. ")
    private LocalDateTime correctionApplicationRegTime;

    //Application Type Code in EPZEU
    /** Код на типа на заявлението в ЕПЗЕУ. */
    @Schema(name = "applicationTypeId", description = "Код на типа на заявлението в ЕПЗЕУ.")
    private Integer applicationTypeId;

    //Registry Office id
    /** Идентификатор на служба по вписванията. */
    @Schema(name = "registerSiteID", description = "Идентификатор на служба по вписванията.")
    @JsonProperty(value = "registerSiteID")
    private String registryOfficeId;

    //Application register type id in Property Register
    /** Вид регистърв Имотен Регистър. */
    @Schema(name = "registerTypeID", description = "Вид регистърв Имотен Регистър.")
    @JsonProperty(value = "registerTypeID")
    private String prRegisterTypeId;

    //Register Number in Property Register
    /** Входящ номер в регистър от Имотен Регистър. */
    @Schema(name = "registerNumber", description = "Входящ номер в регистър от Имотен Регистър.")
    private String registerNumber;

    //Registration Date in Property Register
    /** Дата на регистрация в имотен регистър. */
    @Schema(name = "registerDate", description = "Дата на регистрация в имотен регистър.")
    private LocalDateTime registerDate;

    //Current status of Application
    /** Текущ статус на заявление. */
    @Schema(name = "statusId", description = "Текущ статус на заявление.")
    private Integer statusId;

    //Judge Resolution
    /** Решение на съдия. */
    @Schema(name = "judgeResolution", description = "Решение на съдия.")
    private String judgeResolution;

    //Remark (explains the reason for cancellation)
    /** Забележка */
    @Schema(name = "remark", description = "Забележка")
    private String remark;

    //Client Identify Number
    /** КИН */
    @Schema(name = "applicantCIN", description = "КИН")
    private Integer applicantCIN;

    //Time when application's status is changed to current status
    /** Времето на последната промяна на статуса. */
    @Schema(name = "statusTime", description = "Времето на последната промяна на статуса.")
    @JsonProperty(value = "statusTime")
    private LocalDateTime statusDateTime;

    //Attachment Files Info related with status, one status is possible to have more than one attached files
    /** Прикачени файлове, асоциирани със статуса. */
    @Schema(name = "attachmentsInfo", description = "Прикачени файлове, асоциирани със статуса.")
    List<AttachmentInfo> attachmentsInfo;

    //UUID of document related with Result of OSS Report
    /** Уникален идентификатор на документ, свързан с резултата от справката. */
    @Schema(name = "reportResultDocumentGuid", description = "Уникален идентификатор на документ, свързан с резултата от справката.")
    private UUID reportResultDocumentGuid;

    //OSS Report result number
    /** Номер на резултат от справката. */
    @Schema(name = "reportResultNumber", description = "Номер на резултат от справката.")
    private Integer reportResultNumber;

    //OSS Report result date
    /** Дата на резултат от справката. */
    @Schema(name = "reportResultDate", description = "Дата на резултат от справката.")
    private LocalDate reportResultDate;


    public List<AttachmentInfo> getAttachmentsInfo() {
        if(this.attachmentsInfo == null) {
            this.attachmentsInfo = new ArrayList<>();
        }

        return this.attachmentsInfo;
    }
}
