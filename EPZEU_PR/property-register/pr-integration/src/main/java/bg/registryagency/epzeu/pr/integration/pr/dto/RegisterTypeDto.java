package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер на данни за вид регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "RegisterTypeDto", description = "Контейнер на данни за вид регистър.")
public class RegisterTypeDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private String id;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;
}
