package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за справка чрез отдалечен достъп от електронна партида за имот.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AccountPropertyOfReportDto", description = "Контейнер на данни за справка чрез отдалечен достъп от електронна партида за имот.")
public class AccountPropertyOfReportDto {

    /** Идентификатор на имотна партида. */
    @Schema(name = "accountPropertyId", description = "Идентификатор на имотна партида.")
    private String accountPropertyId;

    /** Идентификатор на имот. */
    @Schema(name = "propertyId", description = "Идентификатор на имот.")
    private String propertyId;

    /** Идентификатор на служба по вписвания. */
    @Schema(name = "registryOffice", description = "Идентификатор на служба по вписвания.")
    private RegistryOfficeDto registryOffice;

    /** Местност */
    @Schema(name = "place", description = "Местност")
    private String place;

    /** Улица */
    @Schema(name = "street", description = "Улица")
    private String street;

    /** Номер на улица. */
    @Schema(name = "streetNumber", description = "Номер на улица.")
    private String streetNumber;

    /** ж.к. */
    @Schema(name = "housingEstate", description = "ж.к.")
    private String housingEstate;

    /** Квартал */
    @Schema(name = "district", description = "Квартал")
    private String district;

    /** Блок */
    @Schema(name = "building", description = "Блок")
    private String building;

    /** Вход */
    @Schema(name = "entrance", description = "Вход")
    private String entrance;

    /** Етаж */
    @Schema(name = "floor", description = "Етаж")
    private String floor;

    /** Апартамент */
    @Schema(name = "flat", description = "Апартамент")
    private String flat;

    /** Населено място */
    @Schema(name = "settlement", description = "Населено място")
    private PlaceNomenclaturePrDto settlement;

    /** Кадастрален идентификатор */
    @Schema(name = "cadastralIdentifier", description = "Кадастрален идентификатор")
    private String cadastralIdentifier;

    /** Планоснимачен номер */
    @Schema(name = "cadastreNumber", description = "Планоснимачен номер")
    private String cadastreNumber;

    /** Квартал, попадащ в регулация */
    @Schema(name = "regulatedNeighborhood", description = "Квартал, попадащ в регулация")
    private String regulatedNeighborhood;

    /** Парцел */
    @Schema(name = "plot", description = "Парцел")
    private String plot;

    /** Забележка */
    @Schema(name = "remark", description = "Забележка")
    private String remark;

    /** Номер на електронна партида */
    @Schema(name = "accountNumber", description = "Номер на електронна партида")
    private String accountNumber;

    /** Площ по документи */
    @Schema(name = "areaByDocuments", description = "Площ по документи")
    private Float areaByDocuments;

    /** Вид на имот */
    @Schema(name = "propertyType", description = "Вид на имот")
    private PropertyTypeNomDto propertyType;

    /** Номер на стара имотна партида */
    @Schema(name = "oldAccountNumber", description = "Номер на стара имотна партида")
    private String oldAccountNumber;

    /** Начин на трайно ползване */
    @Schema(name = "permanentUsage", description = "Начин на трайно ползване")
    private PermanentUsageDto permanentUsage;
}
