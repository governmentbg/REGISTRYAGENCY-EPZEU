package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за акт, от който се иска препис.
 */
@Getter
@Setter
@Schema(name = "ActRequestingACopyDto", description = "Контейнер на данни за акт, от който се иска препис.")
public class ActRequestingACopyDto {

    /** Основание за преписа. */
    @Schema(name = "copyReason", description = "Основание за преписа.")
    private String copyReason;

    /** Служба по вписванията. */
    @Schema(name = "registryOffice", description = "Служба по вписванията.")
    private RegistryOfficeDto registryOffice;

    /** Данни за акт. */
    @Schema(name = "actData", description = "Данни за акт.")
    private ActDataDto actData;

    /** Данни за стар акт. */
    @Schema(name = "actOldData", description = "Данни за стар акт.")
    private ActOldDataDto actOldData;

    /** Флаг указващ дали актът е преди стартова дата за водене на регистър в избраната служба по вписвания. */
    @Schema(name = "isBeforeStartDate", description = "Флаг указващ дали актът е преди стартова дата за водене на регистър в избраната служба по вписвания.")
    private boolean isBeforeStartDate;

    public ActRequestingACopyDto() {
        this(true);
    }

    public ActRequestingACopyDto(boolean createAll) {
        if(createAll) {
            this.registryOffice = new RegistryOfficeDto();
            this.actData = new ActDataDto(createAll);
            this.actOldData = new ActOldDataDto();
        }
    }

    public boolean getIsBeforeStartDate() {
        return isBeforeStartDate;
    }

    public void setIsBeforeStartDate(boolean isBeforeStartDate) {
        this.isBeforeStartDate = isBeforeStartDate;
    }
}
