package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за номенкалтура на специалните достъпи.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Schema(name = "SpecialAccessTypeDto", description = "Контейнер на данни за номенкалтура на специалните достъпи.")
public class SpecialAccessTypeDto {

    /** Идентификатор на тип на потребител. */
    @Schema(name = "userTypeId", description = "Идентификатор на тип на потребител.")
    private Integer userTypeId;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;
}
