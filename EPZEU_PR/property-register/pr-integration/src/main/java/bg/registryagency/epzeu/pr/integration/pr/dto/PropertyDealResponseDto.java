package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за сделки с имоти.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertyDealResponseDto", description = "Контейнер на данни за сделки с имоти.")
public class PropertyDealResponseDto {

    /** Списък със сделки. */
    @Schema(name = "deals", description = "Списък със сделки.")
    PropertyDealDto[] deals;
}
