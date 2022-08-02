package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за област.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AreaDto", description = "Контейнер на данни за област")
public class AreaDto extends EkatteDto {

    /** Идентификатор на населено място. */
    @Schema(name = "settlementID", description = "Идентификатор на населено място.")
    private Integer settlementID;
}
