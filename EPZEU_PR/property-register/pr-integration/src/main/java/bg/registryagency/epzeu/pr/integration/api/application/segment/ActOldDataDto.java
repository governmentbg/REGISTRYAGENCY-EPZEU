package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за стар акт.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ActOldDataDto", description = "Контейнер на данни за стар акт.")
public class ActOldDataDto {

    /** Стар номер на акт. */
    @Schema(name = "actOldNumber", description = "Стар номер на акт.")
    private String actOldNumber;

    /** Стар том. */
    @Schema(name = "volumeOld", description = "Стар том.")
    private String volumeOld;

    /** Номер на фирмено дело. */
    @Schema(name = "caseNumber", description = "Номер на фирмено дело.")
    private String caseNumber;

    /** Година */
    @Schema(name = "year", description = "Година")
    private Short year;

    /** Допълнителни данни за акт. */
    @Schema(name = "actAdditionalData", description = "Допълнителни данни за акт.")
    private String actAdditionalData;
}
