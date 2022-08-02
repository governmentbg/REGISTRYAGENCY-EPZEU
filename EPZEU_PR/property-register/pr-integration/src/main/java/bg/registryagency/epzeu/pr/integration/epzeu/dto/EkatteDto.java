package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за територия по ЕКАТТЕ.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Schema(name = "EkatteDto", description = "Контейнер на данни за територия по ЕКАТТЕ.")
public class EkatteDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private Integer id;

    /** Код */
    @Schema(name = "ekatteCode", description = "Код")
    private String ekatteCode;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;
}
