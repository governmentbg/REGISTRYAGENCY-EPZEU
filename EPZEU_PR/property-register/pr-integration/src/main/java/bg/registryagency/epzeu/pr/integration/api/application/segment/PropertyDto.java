package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyTypeNomDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


/**
 * Контейнер на данни за имот.
 */
@Getter
@Setter
@Schema(name = "PropertyDto", description = "Контейнер на данни за имот.")
@JsonIgnoreProperties({"isIssuingAuthorityChange"})
public class PropertyDto {

    /** Вид на имота. */
    @Schema(name = "type", description = "Вид на имота.")
    private PropertyTypeNomDto type;

    /** Населено място. */
    @Schema(name = "settlement", description = "Населено място.")
    private PlaceNomenclaturePrDto settlement;

    /** Местност */
    @Schema(name = "countrySide", description = "Местност")
    private String countrySide;

    /** Кадастрален идентификатор. */
    @Schema(name = "cadastralId", description = "Кадастрален идентификатор.")
    private String cadastralId;

    /** Номер на електронна партида. */
    @Schema(name = "accountNumber", description = "Номер на електронна партида.")
    private String accountNumber;

    /** Номер на стара електронна партида. */
    @Schema(name = "oldAccountNumber", description = "Номер на стара електронна партида.")
    private String oldAccountNumber;

    /** Площ по документ. */
    @Schema(name = "areaByDocuments", description = "Площ по документ.")
    private Float areaByDocuments;

    /** Граници на имота. */
    @Schema(name = "propertyLimits", description = "Граници на имота.")
    private String propertyLimits;

    /** Забележка */
    @Schema(name = "propertyRemark", description = "Забележка")
    private String propertyRemark;

    public PropertyDto() {
        this(true);
    }

    public PropertyDto(boolean createAll){
        if(createAll) {
            this.type = new PropertyTypeNomDto();
            this.settlement = new PlaceNomenclaturePrDto();
        }
    }
}
