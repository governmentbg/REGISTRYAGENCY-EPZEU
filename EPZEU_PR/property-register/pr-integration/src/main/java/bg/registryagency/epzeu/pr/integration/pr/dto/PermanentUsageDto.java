package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер на данни за номенклатура на начин на трайно ползване.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "PermanentUsageDto", description = "Контейнер на данни за номенклатура на начин на трайно ползване.")
public class PermanentUsageDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private String id;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Идентификатор на типа. */
    @Schema(name = "typeId", description = "Идентификатор на типа.")
    private String typeId;

    /** Код */
    @Schema(name = "code", description = "Код")
    private Integer code;

    public PermanentUsageDto(String id) {
        this.id = id;
    }
}
