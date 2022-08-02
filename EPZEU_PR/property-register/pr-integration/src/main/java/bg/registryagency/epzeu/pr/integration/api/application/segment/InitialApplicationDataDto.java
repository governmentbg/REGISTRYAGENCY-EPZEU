package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.RegisterTypeDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Контейнер на данни за иницииращо заявление.
 */
@Getter
@Setter
@Schema(name = "InitialApplicationDataDto", description = "Контейнер на данни за иницииращо заявление.")
public class InitialApplicationDataDto {

    /** Входящ номер от РЕАУ. */
    @Schema(name = "incomingReauNumber", description = "Входящ номер от РЕАУ.")
    private String incomingReauNumber;

    /** Номер в Имотен Регистър. */
    @Schema(name = "registerNumber", description = "Номер в Имотен Регистър")
    private Integer registerNumber;

    /** Дата на регистриране в Имотен Регистър. */
    @Schema(name = "registerDate", description = "Дата на регистриране в Имотен Регистър.")
    private LocalDate registerDate;

    /** Вир регистър, в който е входирано заявлението. */
    @Schema(name = "registerType", description = "Вир регистър, в който е входирано заявлението.")
    private RegisterTypeDto registerType;

    /** Служба по вписванията. */
    @Schema(name = "registryOffice", description = "Служба по вписванията.")
    private RegistryOfficeDto registryOffice;

    public InitialApplicationDataDto() {
        this(true);
    }

    public InitialApplicationDataDto(boolean createAll) {
        if(createAll) {
            this.registerType = new RegisterTypeDto();
            this.registryOffice = new RegistryOfficeDto();
        }
    }
}
