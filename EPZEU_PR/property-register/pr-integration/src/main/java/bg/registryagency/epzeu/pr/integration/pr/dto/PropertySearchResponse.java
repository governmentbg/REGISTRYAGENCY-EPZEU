package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за резултат от търсене на имот.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertySearchResponse", description = "Контейнер на данни за резултат от търсене на имот.")
public class PropertySearchResponse {

    /** Идентификатор на имот */
    @Schema(name = "propertyId", description = "Идентификатор на имот")
    private String propertyId;

    /** Идентификатор на служба */
    @Schema(name = "siteId", description = "Идентификатор на служба")
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

    /** ж.к */
    @Schema(name = "housingEstate", description = "ж.к")
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

    /** Забележка */
    @Schema(name = "remark", description = "Забележка")
    private String remark;

    /** Парцел */
    @Schema(name = "parcel", description = "Парцел")
    private String parcel;

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


    public PropertyOfReportDto asProperty() {
        PropertyOfReportDto property = new PropertyOfReportDto();
        property.setPropertyId(this.propertyId);
        property.setRegistryOffice(new RegistryOfficeDto(this.siteId));
        property.setPlace(this.countrySide);
        property.setStreet(this.street);
        property.setStreetNumber(this.streetNumber);
        property.setHousingEstate(this.housingEstate);
        property.setDistrict(this.district);
        property.setBuilding(this.block);
        property.setEntrance(this.entrance);
        property.setFloor(this.floor);
        property.setFlat(this.apartment);
        property.setSettlement(new PlaceNomenclaturePrDto(this.placeId));
        property.setCadastralIdentifier(this.cadastreNumber);
        property.setCadastreNumber(this.plotIdentifier);
        property.setRegulatedNeighborhood(this.regulatedQuarter);
        property.setPlot(this.parcel);
        property.setRemark(this.remark);
        property.setAccountNumber(this.lotNumber);
        property.setAreaByDocuments((this.surfaceArea != null) ? Float.parseFloat(this.surfaceArea) : null);
        property.setPropertyType(new PropertyTypeNomDto(this.propertyTypeId));
        property.setOldAccountNumber(this.oldLotNumber);
        property.setPermanentUsage(new PermanentUsageDto(this.permanentUsageId));

        return property;
    }
}
