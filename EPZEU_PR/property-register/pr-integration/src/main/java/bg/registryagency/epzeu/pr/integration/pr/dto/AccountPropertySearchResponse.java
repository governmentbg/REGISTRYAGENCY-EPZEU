package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за резултат от търсене на електронна партида.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AccountPropertySearchResponse", description = "Контейнер на данни за резултат от търсене на електронна партида.")
public class AccountPropertySearchResponse {

    /** Идентификатор на имотна партида. */
    @Schema(name = "propertyLotId", description = "Идентификатор на имотна партида.")
    private String propertyLotId;

    /** Идентификатор на имот. */
    @Schema(name = "propertyId", description = "Идентификатор на имот.")
    private String propertyId;

    /** Идентификатор на служба по вписвания. */
    @Schema(name = "siteId", description = "Идентификатор на служба по вписвания.")
    private String siteId;

    /** Местност */
    @Schema(name = "countrySide", description = "Местност")
    private String countrySide;

    /** Улица */
    @Schema(name = "street", description = "Улица")
    private String street;

    /** Номер на улица */
    @Schema(name = "streetNumber", description = "Номер на улица")
    private String streetNumber;

    /** ж.к. */
    @Schema(name = "housingEstate", description = "ж.к.")
    private String housingEstate;

    /** Квартал */
    @Schema(name = "district", description = "Квартал")
    private String district;

    /** Блок */
    @Schema(name = "block", description = "Блок")
    private String block;

    /** Вход */
    @Schema(name = "entrance", description = "Вход")
    private String entrance;

    /** Етаж */
    @Schema(name = "floor", description = "Етаж")
    private String floor;

    /** Апартамент */
    @Schema(name = "apartment", description = "Апартамент")
    private String apartment;

    /** Идентификатор на населено място */
    @Schema(name = "placeId", description = "Идентификатор на населено място")
    private String placeId;

    /** Кадастрален идентификатор */
    @Schema(name = "cadastreNumber", description = "Кадастрален идентификатор")
    private String cadastreNumber;

    /** Планоснимачен номер */
    @Schema(name = "plotIdentifier", description = "Планоснимачен номер")
    private String plotIdentifier;

    /** Квартал, попадащ в регулация */
    @Schema(name = "regulatedQuarter", description = "Квартал, попадащ в регулация")
    private String regulatedQuarter;

    /** Парцел */
    @Schema(name = "parcel", description = "Парцел")
    private String parcel;

    /** Забележка */
    @Schema(name = "remark", description = "Забележка")
    private String remark;

    /** Номер на електронна партида */
    @Schema(name = "lotNumber", description = "Номер на електронна партида")
    private String lotNumber;

    /** Площ по документи */
    @Schema(name = "surfaceArea", description = "Площ по документи")
    private String surfaceArea;

    /** Идентификатор на вид на имот */
    @Schema(name = "propertyTypeId", description = "Идентификатор на вид на имот")
    private String propertyTypeId;

    /** Номер на стара имотна партида */
    @Schema(name = "oldLotNumber", description = "Номер на стара имотна партида")
    private String oldLotNumber;

    /** Начин на трайно ползване */
    @Schema(name = "permanentUsageId", description = "Начин на трайно ползване")
    private String permanentUsageId;


    public AccountPropertyOfReportDto asAccountProperty() {
        AccountPropertyOfReportDto accountProperty = new AccountPropertyOfReportDto();
        accountProperty.setAccountPropertyId(this.propertyLotId);
        accountProperty.setPropertyId(this.propertyId);
        accountProperty.setRegistryOffice(new RegistryOfficeDto(this.siteId));
        accountProperty.setPlace(this.countrySide);
        accountProperty.setStreet(this.street);
        accountProperty.setStreetNumber(this.streetNumber);
        accountProperty.setHousingEstate(this.housingEstate);
        accountProperty.setDistrict(this.district);
        accountProperty.setBuilding(this.block);
        accountProperty.setEntrance(this.entrance);
        accountProperty.setFloor(this.floor);
        accountProperty.setFlat(this.apartment);
        accountProperty.setSettlement(new PlaceNomenclaturePrDto(this.placeId));
        accountProperty.setCadastralIdentifier(this.cadastreNumber);
        accountProperty.setCadastreNumber(this.plotIdentifier);
        accountProperty.setRegulatedNeighborhood(this.regulatedQuarter);
        accountProperty.setPlot(this.parcel);
        accountProperty.setRemark(this.remark);
        accountProperty.setAccountNumber(this.lotNumber);
        accountProperty.setAreaByDocuments((this.surfaceArea != null) ? Float.parseFloat(this.surfaceArea) : null);
        accountProperty.setPropertyType(new PropertyTypeNomDto(this.propertyTypeId));
        accountProperty.setOldAccountNumber(this.oldLotNumber);
        accountProperty.setPermanentUsage(new PermanentUsageDto(this.permanentUsageId));

        return accountProperty;
    }
}
