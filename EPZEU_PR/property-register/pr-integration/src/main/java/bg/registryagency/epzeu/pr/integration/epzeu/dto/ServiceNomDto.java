package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;


/**
 * Контейнер на данни за номенклатура на услуга.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "ServiceNomDto", description = "Контейнер на данни за номенклатура на услуга.")
public class ServiceNomDto {

    /** Идентификатор на услуга. */
    @Schema(name = "serviceId", description = "Идентификатор на услуга.")
    @JsonAlias("serviceID")
    private Integer serviceId;

    /** Идентификатор на регистър. */
    @Schema(name = "registerId", description = "Идентификатор на регистър.")
    @JsonAlias("registerID")
    private Short registerId;

    /** Идентификатор на услугата в ИИСДА. */
    @Schema(name = "iisdaServiceId", description = "Идентификатор на услугата в ИИСДА.")
    @JsonAlias("iisdaServiceID")
    private Integer iisdaServiceId;

    /** Идентификатор на вид на заявлението. */
    @Schema(name = "appTypeId", description = "Идентификатор на вид на заявлението.")
    @JsonAlias("appTypeID")
    private Integer appTypeId;

    /** Списък от идентификатори на вид услуги. */
    @Schema(name = "serviceTypeIDs", description = "Списък от идентификатори на вид услуги.")
    private List<Short> serviceTypeIDs;

    /** Списък с идентификатори на видове плащания. */
    @Schema(name = "paymentTypeIDs", description = "Списък с идентификатори на видове плащания.")
    private List<Short> paymentTypeIDs;

    /** Статус */
    @Schema(name = "status", description = "Статус")
    private Short status;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Описание */
    @Schema(name = "description", description = "Описание")
    private String description;

    /** Кратко описание. */
    @Schema(name = "shortDescription", description = "Кратко описание.")
    private String shortDescription;

    /** Флаг, указващ дали услугата е административна. */
    @Schema(name = "isAdm", description = "Флаг, указващ дали услугата е административна.")
    private boolean isAdm;

    /** Номер на услугата. */
    @Schema(name = "serviceNumber", description = "Номер на услугата.")
    private Integer serviceNumber;
}
