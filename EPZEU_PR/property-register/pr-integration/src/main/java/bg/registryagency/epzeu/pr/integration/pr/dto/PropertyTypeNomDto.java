package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер на данни за вид на имот.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "PropertyTypeNomDto", description = "Контейнер на данни за вид на имот.")
public class PropertyTypeNomDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    protected String id;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    protected String name;

    /** Идентификатор на вида*/
    @Schema(name = "typeId", description = "Идентификатор на вида")
    protected String typeId;

    /** Код */
    @Schema(name = "code", description = "Код")
    protected Integer code;

    public PropertyTypeNomDto(String id) {
        this.id = id;
    }
}
