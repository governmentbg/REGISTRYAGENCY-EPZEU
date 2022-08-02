package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за заявка за търсене на имот.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertySearchRequest", description = "Контейнер на данни за заявка за търсене на имот.")
public class PropertySearchRequest {

    /** Идентификатор на служба */
    @Schema(name = "siteId", description = "Идентификатор на служба")
    protected String siteId;

    /** Идентификатор на населено място */
    @Schema(name = "placeId", description = "Идентификатор на населено място")
    protected String placeId;

    /** Номер на електронна партида */
    @Schema(name = "lotNumber", description = "Номер на електронна партида")
    protected String lotNumber;

    /** Номер на стара имотна партида */
    @Schema(name = "oldLotNumber", description = "Номер на стара имотна партида")
    protected String oldLotNumber;

    /** Квартал/ж.к */
    @Schema(name = "district", description = "Квартал/ж.к")
    protected String district;

    /** Улица */
    @Schema(name = "street", description = "Улица")
    protected String street;

    /** Номер на улица */
    @Schema(name = "streetNumber", description = "Номер на улица")
    protected String streetNumber;

    /** Блок */
    @Schema(name = "block", description = "Блок")
    protected String block;

    /** Вход */
    @Schema(name = "entrance", description = "Вход")
    protected String entrance;

    /** Етаж */
    @Schema(name = "floor", description = "Етаж")
    protected String floor;

    /** Апартамент */
    @Schema(name = "apartment", description = "Апартамент")
    protected String apartment;

    /** Местност */
    @Schema(name = "countrySide", description = "Местност")
    protected String countrySide;

    /** Кадастрален идентификатор */
    @Schema(name = "cadastreNumber", description = "Кадастрален идентификатор")
    protected String cadastreNumber;

    /** Планоснимачен номер */
    @Schema(name = "plotIdentifier", description = "Планоснимачен номер")
    protected String plotIdentifier;

    /** Забележка */
    @Schema(name = "remark", description = "Забележка")
    protected String remark;

    /** Парцел */
    @Schema(name = "parcel", description = "Парцел")
    protected String parcel;

    /** Площ по документи от */
    @Schema(name = "minArea", description = "Площ по документи от")
    protected Float minArea;

    /** Площ по документи до */
    @Schema(name = "maxArea", description = "Площ по документи до")
    protected Float maxArea;


    public PropertySearchRequest(PropertySearchCriteriaDto criteria) {
        this.siteId = criteria.getRegistryOfficeId();
        this.placeId = criteria.getSettlementId();
        this.lotNumber = criteria.getAccountNumber();
        this.oldLotNumber = criteria.getOldAccountNumber();
        this.district = criteria.getDistrict();
        this.street = criteria.getStreet();
        this.streetNumber = criteria.getStreetNumber();
        this.block = criteria.getBuilding();
        this.entrance = criteria.getEntrance();
        this.floor = criteria.getFloor();
        this.apartment = criteria.getFlat();
        this.countrySide = (criteria.getPlace() != null) ? criteria.getPlace().trim() : null;
        this.cadastreNumber = criteria.getCadastralIdentifier();
        this.plotIdentifier = criteria.getCadastreNumber();
        this.remark = criteria.getRemark();
        this.parcel = criteria.getPlot();
        this.minArea = criteria.getMinArea();
        this.maxArea = criteria.getMaxArea();
    }
}
