package bg.registryagency.epzeu.pr.integration.api.application.segment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за адрес
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AddressDto", description = "Контейнер на данни за адрес.")
@JsonIgnoreProperties({ "hasAreas" })
public class AddressDto {

    /** Идентификатор на населено място. */
    @Schema(name = "settlementId", description = "Идентификатор на населено място.")
    private Integer settlementId;

    /** Наименование на населено място. */
    @Schema(name = "settlementName", description = "Наименование на населено място.")
    private String settlementName;

    /** Код на населено място по ЕКАТТЕ. */
    @Schema(name = "settlementEkatteCode", description = "Код на населено място по ЕКАТТЕ.")
    private String settlementEkatteCode;

    /** Идентификатор на община. */
    @Schema(name = "municipalityId", description = "Идентификатор на община.")
    private Integer municipalityId;

    /** Наименование на община. */
    @Schema(name = "municipalityName", description = "Наименование на община.")
    private String municipalityName;

    /** Код на община по ЕКАТТЕ. */
    @Schema(name = "municipalityEkatteCode", description = "Код на община по ЕКАТТЕ.")
    private String municipalityEkatteCode;

    /** Идентификатор на регион. */
    @Schema(name = "regionId", description = "Идентификатор на регион.")
    private Integer regionId;

    /** Име на регион. */
    @Schema(name = "regionName", description = "Име на регион.")
    private String regionName;

    /** Код на регион по ЕКАТТЕ. */
    @Schema(name = "regionEkatteCode", description = "Код на регион по ЕКАТТЕ.")
    private String regionEkatteCode;

    /** Идентификатор на област. */
    @Schema(name = "areaId", description = "Идентификатор на област.")
    private Integer areaId;

    /** Наименование на област. */
    @Schema(name = "areaName", description = "Наименование на област.")
    private String areaName;

    /** Код на област по ЕКАТТЕ. */
    @Schema(name = "areaEkatteCode", description = "Код на област по ЕКАТТЕ.")
    private String areaEkatteCode;

    /** Пощенски код. */
    @Schema(name = "postCode", description = "Пощенски код.")
    private Integer postCode;

    /** Улица */
    @Schema(name = "street", description = "Улица")
    private String street;

    /** ж.к. */
    @Schema(name = "housingEstate", description = "ж.к.")
    private String housingEstate;

    /** Номер */
    @Schema(name = "streetNumber", description = "Номер")
    private String streetNumber;

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
}
