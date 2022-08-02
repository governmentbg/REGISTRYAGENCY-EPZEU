package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за метод за предоставяне на услугата.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DeliveryMethodTypeDto", description = "Контейнер на данни за метод за предоставяне на услугата.")
public class DeliveryMethodTypeDto {

    /** Идентификатор на метод. */
    @Schema(name = "id", description = "Идентификатор на метод.")
    private String id;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;
}
