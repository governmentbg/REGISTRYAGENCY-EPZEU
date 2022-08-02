package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.ApplicantCategoryDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за получателя на услугата.
 */
@Getter
@Setter
@Schema(name = "ServiceRecipientDto", description = "Контейнер на данни за получателя на услугата.")
public class ServiceRecipientDto {

    /** Данни за лицето получател на услугата. */
    @Schema(name = "person", description = "Данни за лицето получател на услугата.")
    private PersonDto person;

    /** Категория заявител.*/
    @Schema(name = "applicantCategory", description = "Категория заявител.")
    private ApplicantCategoryDto applicantCategory;

    /** Данни за длъжностно лице. */
    @Schema(name = "dataForAnOfficial", description = "Данни за длъжностно лице.")
    private String dataForAnOfficial;

    /** Вид на специален достъп. */
    @Schema(name = "specialAccessType", description = "Вид на специален достъп.")
    private String specialAccessType;

    public ServiceRecipientDto() {
        this(true);
    }

    public ServiceRecipientDto(boolean createAll) {
        if(createAll) {
            this.person = new PersonDto(createAll);
            this.applicantCategory = new ApplicantCategoryDto();
        }
    }
}
