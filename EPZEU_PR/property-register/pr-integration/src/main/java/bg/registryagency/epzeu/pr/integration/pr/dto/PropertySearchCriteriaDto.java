package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за търсене на имот.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertySearchCriteriaDto", description = "Контейнер на данни за търсене на имот.")
public class PropertySearchCriteriaDto {

    /** Идентификатор на служба по вписвания. */
    @Schema(name = "registryOfficeId", description = "Идентификатор на служба по вписвания.")
    protected String registryOfficeId;

    /** Име на служба по вписвания. */
    @Schema(name = "registryOfficeId", description = "Име на служба по вписвания.")
    protected String registryOfficeName;

    /** Населено място */
    @Schema(name = "settlementId", description = "Населено място")
    protected String settlementId;

    /** Номер на електронна партида */
    @Schema(name = "accountNumber", description = "Номер на електронна партида")
    protected String accountNumber;

    /** Номер на стара имотна партида */
    @Schema(name = "oldAccountNumber", description = "Номер на стара имотна партида")
    protected String oldAccountNumber;

    /** Квартал */
    @Schema(name = "district", description = "Квартал")
    protected String district;

    /** Улица */
    @Schema(name = "street", description = "Улица")
    protected String street;

    /** Номер на улица. */
    @Schema(name = "streetNumber", description = "Номер на улица.")
    protected String streetNumber;

    /** Блок */
    @Schema(name = "building", description = "Блок")
    protected String building;

    /** Вход */
    @Schema(name = "entrance", description = "Вход")
    protected String entrance;

    /** Етаж */
    @Schema(name = "floor", description = "Етаж")
    protected String floor;

    /** Апартамент */
    @Schema(name = "flat", description = "Апартамент")
    protected String flat;

    /** Населено място */
    @Schema(name = "place", description = "Населено място")
    protected String place;

    /** Кадастрален идентификатор */
    @Schema(name = "cadastralIdentifier", description = "Кадастрален идентификатор")
    protected String cadastralIdentifier;

    /** Планоснимачен номер */
    @Schema(name = "cadastreNumber", description = "Планоснимачен номер")
    protected String cadastreNumber;

    /** Парцел */
    @Schema(name = "plot", description = "Парцел")
    protected String plot;

    /** Забележка */
    @Schema(name = "remark", description = "Забележка")
    protected String remark;

    /** Площ по документи от */
    @Schema(name = "minArea", description = "Площ по документи от")
    protected Float minArea;

    /** Площ по документи до */
    @Schema(name = "maxArea", description = "Площ по документи до")
    protected Float maxArea;
}
