package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за начина на предоставяне услугатата.
 */
@Getter
@Setter
@Schema(name = "WayOfProvisionBaseDataDto", description = "Контейнер на данни за начина на предоставяне услугатата. ")
public class WayOfProvisionBaseDataDto {

    /** Служба по вписванията, от която да се издаде. */
    @Schema(name = "issuingAuthority", description = "Служба по вписванията, от който да се издаде.")
    private RegistryOfficeDto issuingAuthority;

    /** Да се предостави като електронен образ на хартиения оригинал.  */
    @Schema(name = "selectedElectronicImageDeliveryMethod", description = "Да се предостави като електронен образ на хартиения оригинал.")
    private Boolean selectedElectronicImageDeliveryMethod;

    /** Да се предостави на хартиен носител в посочената служба по вписванията. */
    @Schema(name = "selectedOnCornerDeliveryMethod", description = "Да се предостави на хартиен носител в посочената служба по вписванията.")
    private Boolean selectedOnCornerDeliveryMethod;

    /** Идентификатор на вид на услугата. */
    @Schema(name = "serviceTypeId", description = "Идентификатор на вид на услугата.")
    private Integer serviceTypeId;

    /** Вид на услугата (Обикновена / Бърза). */
    @Schema(name = "serviceType", description = "Вид на услугата (Обикновена / Бърза).")
    private String serviceType;

    public WayOfProvisionBaseDataDto() {
        this(true);
    }

    public WayOfProvisionBaseDataDto(boolean createAll) {
        if(createAll) {
            this.issuingAuthority = new RegistryOfficeDto();
        }
    }
}
