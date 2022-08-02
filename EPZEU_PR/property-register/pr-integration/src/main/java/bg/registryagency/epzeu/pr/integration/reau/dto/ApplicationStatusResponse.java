package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни на отговор с информация за статус на заявление.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationStatusResponse", description = "Контейнер на данни на отговор с информация за статус на заявление.")
public class ApplicationStatusResponse {

    /** Идентификатор на заявление. */
    @Schema(name = "applicationIdentifier", description = "Идентификатор на заявление.")
    private String applicationIdentifier;

    /** Вид на заявление. */
    @Schema(name = "applicationType", description = "Вид на заявление.")
    private Integer applicationType;

    /** Име на вид на заявление от имотен регистър. */
    @Schema(name = "applicationTypeNameFromPR", description = "Име на вид на заявление от имотен регистър.")
    private String applicationTypeNameFromPR;

    /** Време на регистриране на заявление в РЕАУ. */
    @Schema(name = "applicationRegTime", description = "Време на регистриране на заявление в РЕАУ.")
    private String applicationRegTime;

    /** Входящ номер на заявлението в Имотен регистър. */
    @Schema(name = "registerNumber", description = "Входящ номер на заявлението в Имотен регистър.")
    private String registerNumber;

    /** Време на регистриране на заявление в Имотен регистър. */
    @Schema(name = "registerDate", description = "Време на регистриране на заявление в Имотен регистър.")
    private String registerDate;

    /** Идентификатор на вид регистър. */
    @Schema(name = "registerIdentifier", description = "Идентификатор на вид регистър.")
    private String registerIdentifier;

    /** Идентификатор на служпа по вписване. */
    @Schema(name = "registerSiteId", description = "Идентификатор на служпа по вписване.")
    private String registerSiteId;

    /** Статус на заявление за услуга. */
    @Schema(name = "serviceStatus", description = "Статус на заявление за услуга.")
    private int serviceStatus;

    /** Вид на източника на приемане - ЕПЗЕУ, RegistryOffice */
    @Schema(name = "receptionType", description = "")
    private int receptionType;

    /** Време на настъпване на статуса. */
    @Schema(name = "serviceStatusTime", description = "Време на настъпване на статуса.")
    private String serviceStatusTime;
}
