package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за цена на услуга.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Schema(name = "ServicePriceDto", description = "Контейнер на данни за цена на услуга.")
public class ServicePriceDto {

    /** Цена */
    @Schema(name = "price", description = "Цена")
    private Float price;

    /** Идентификатор на тип на услугата в имотен регистър. */
    @Schema(name = "prServiceTypeID", description = "Идентификатор на тип на услугата в имотен регистър.")
    private String prServiceTypeID;

    /** Идентификатор на тип на услугата в ЕПЗЕУ. */
    @Schema(name = "epzeuServiceTypeID", description = "Идентификатор на тип на услугата в ЕПЗЕУ.")
    private Integer epzeuServiceTypeID;
}
