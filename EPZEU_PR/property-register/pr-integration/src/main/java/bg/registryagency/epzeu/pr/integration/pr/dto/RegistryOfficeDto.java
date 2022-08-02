package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;

/**
 * Контейнер на данни за служба по вписванията.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "RegistryOfficeDto", description = "Контейнер на данни за служба по вписванията.")
public class RegistryOfficeDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private String id;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Идентификатор на типа. */
    @Schema(name = "typeId", description = "Идентификатор на типа.")
    private String typeId;

    /** Начална дата за водене на регистър. */
    @Schema(name = "startDate", description = "Начална дата за водене на регистър.")
    private LocalDate startDate;

    public RegistryOfficeDto(String id) {
        this.id = id;
    }
}
