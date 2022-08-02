package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за физическо или юридическо лице.
 */
@Getter
@Setter

@Schema(name = "PersonDto", description = "Контейнер на данни за физическо или юридическо лице.")
public class PersonDto {

    /** Вид на лицето (Физическо / Юридическо). */
    @Schema(name = "type", description = "Вид на лицето (Физическо / Юридическо).")
    protected Integer type;

    /** Данни за физическо лице. */
    @Schema(name = "individual", description = "Данни за физическо лице.")
    protected IndividualDto individual;

    /** Данни за юридическо лице. */
    @Schema(name = "legalEntity", description = "Данни за юридическо лице.")
    protected LegalEntityDto legalEntity;

    public PersonDto() {
        this(true);
    }

    public PersonDto(boolean createAll) {
        if(createAll) {
            this.individual = new IndividualDto(createAll);
            this.legalEntity = new LegalEntityDto(createAll);
        }
    }
}
