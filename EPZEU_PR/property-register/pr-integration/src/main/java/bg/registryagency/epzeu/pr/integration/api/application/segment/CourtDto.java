package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за съд.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "CourtDto", description = "Контейнер на данни за съд.")
public class CourtDto {

    /** Идентификатор на съд.*/
    @Schema(name = "id", description = "Идентификатор на съд.")
    private Short id;

    /** Наименование на съд. */
    @Schema(name = "name", description = "Наименование на съд. ")
    private String name;
}
