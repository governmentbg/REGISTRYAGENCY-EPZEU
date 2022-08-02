package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за сделка за имот.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertyDealDto", description = "Контейнер на данни за сделка за имот.")
public class PropertyDealDto {

    /** Списък с кадастрални идентификатори. */
    @Schema(name = "cadastreNumbers", description = "Списък с кадастрални идентификатори.")
    String[] cadastreNumbers;

    /** Дата на сделката. */
    @Schema(name = "dealDate", description = "Дата на сделката.")
    String dealDate;

    /** Тип на сделката. */
    @Schema(name = "dealType", description = "Тип на сделката.")
    String dealType;

    /** Име на регистратор. */
    @Schema(name = "registratorName", description = "Име на регистратор.")
    String registratorName;

    /** Идентификатор на роля на регистратор. */
    @Schema(name = "registratorRoleId", description = "Идентификатор на роля на регистратор.")
    String registratorRoleId;

    /** Уникален идентификатор на регистратор. */
    @Schema(name = "registratorUID", description = "Уникален идентификатор на регистратор.")
    String registratorUID;
}
