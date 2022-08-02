package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Контейнер на данни за регистрирани заявления.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationREAUDto", description = "Контейнер на данни за регистрирани заявления.")
public class ApplicationREAUDto {

    /** Идентификатор на заявление. */
    @Schema(name = "applicationIdentifier", description = "Идентификатор на заявление.")
    private String applicationIdentifier;

    /** Контейнер на данни за информация свързана със статуса на заявлението. */
    @Schema(name = "applicationStatusResultInfo", description = "Контейнер на данни за информация свързана със статуса на заявлението.")
    private ApplicationStatusResultInfo applicationStatusResultInfo;

    /** Вид на заявление. */
    @Schema(name = "applicationType", description = "Вид на заявление.")
    private String applicationType;

    /** Време на регистриране на заявление в РЕАУ. */
    @Schema(name = "registrationTime", description = "Време на регистриране на заявление в РЕАУ.")
    private LocalDateTime registrationTime;

    /** КИН */
    @Schema(name = "cin", description = "КИН")
    private Integer cin;

    /** Входящ номер на заявлението в РЕАУ. */
    @Schema(name = "registerIncomingID", description = "Входящ номер на заявлението в РЕАУ.")
    private String registerIncomingID;

    /** Входящ номер на заявлението в Имотен регистър. */
    @Schema(name = "registerNumber", description = "Входящ номер на заявлението в Имотен регистър.")
    private String registerNumber;

    /** Време на регистриране на заявление в Имотен регистър. */
    @Schema(name = "registerDate", description = "Време на регистриране на заявление в Имотен регистър.")
    private LocalDateTime registerDate;

    /** Идентификатор на служпа по вписване. */
    @Schema(name = "registerSiteID", description = "Идентификатор на служпа по вписване.")
    private String registerSiteID;

    /** Вид регистър, в който е вписано заявлението. */
    @Schema(name = "registerTypeID", description = "Вид регистър, в който е вписано заявлението.")
    private String registerTypeID;

    /** Идентификатор на последно подаденото заявление, което е в статус "Без движение". */
    @Schema(name = "lastApplicationForCorrectionIdentifier", description = "Идентификатор на последно подаденото заявление, което е в статус \"Без движение\".")
    private String lastApplicationForCorrectionIdentifier;

    /** Време на регистриране на последно подаденото заявление, което е в статус "Без движение". */
    @Schema(name = "lastApplicationForCorrectionRegTime", description = "Време на регистриране на последно подаденото заявление, което е в статус \"Без движение\".")
    private LocalDateTime lastApplicationForCorrectionRegTime;

    public ApplicationREAUDto(String applicationIdentifier, Integer applicationType, LocalDateTime registrationTime, String condition) {
        this.applicationIdentifier = applicationIdentifier;
        this.registrationTime = registrationTime;
    }
}
