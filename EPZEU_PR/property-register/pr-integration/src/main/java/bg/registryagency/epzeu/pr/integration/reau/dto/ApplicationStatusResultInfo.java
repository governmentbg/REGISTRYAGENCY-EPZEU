package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Контейнер на данни за информация свързана със статуса на заявлението.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationStatusResultInfo", description = "Контейнер на данни за информация свързана със статуса на заявлението.")
public class ApplicationStatusResultInfo {

    /** Идентификатор на вид на заявление. */
    @Schema(name = "applicationTypeId", description = "Идентификатор на вид на заявление.")
    private String applicationTypeId;

    /** Статус на заявление. */
    @Schema(name = "status", description = "Статус на заявление.")
    private Integer status;

    /** Време на настъпване на статуса на заявлението. */
    @Schema(name = "statusTime", description = "Време на настъпване на статуса на заявлението.")
    private LocalDateTime statusTime;

    /** Текс описващ или поясняващ статуса. */
    @Schema(name = "textContent", description = "Текс описващ или поясняващ статуса.")
    private String textContent;

    /** Списък от контейнери на данни на информация за прикачени документи свързани със статуса. */
    @Schema(name = "statusResultDocuments", description = "Списък от контейнери на данни на информация за прикачени документи свързани със статуса.")
    private List<AttachmentInfo> statusResultDocuments;

    /** Идентификатор на заявление, което е подадено за корегиране. */
    @Schema(name = "correctionIdentifier", description = "Идентификатор на заявление, което е подадено за корегиране.")
    private String correctionIdentifier;

    /** Идентификатор на статус. */
    @Schema(name = "serviceProcessActionId", description = "Идентификатор на статус.")
    private Long serviceProcessActionId;
}
