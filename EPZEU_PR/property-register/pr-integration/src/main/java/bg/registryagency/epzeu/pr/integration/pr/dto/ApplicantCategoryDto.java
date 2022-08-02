package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер на данни за категория заявител.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "ApplicantCategoryDto", description = "Контейнер на данни за категория заявител.")
public class ApplicantCategoryDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private String id;

    /** Име */
    @Schema(name = "name", description = "Име")
    private String name;
}
