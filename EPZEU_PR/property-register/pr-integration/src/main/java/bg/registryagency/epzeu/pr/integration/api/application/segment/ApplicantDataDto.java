package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.ApplicantCategoryDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за заявител.
 */
@Getter
@Setter
@Schema(name = "ApplicantDataDto", description = "Контейнер на данни за заявител.")
public class ApplicantDataDto {

    /** Данни за лицето. */
    @Schema(name = "individual", description = "Данни за лицето.")
    private IndividualDto individual;

    /** Вид на заявителя. */
    @Schema(name = "applicantType", description = "Вид на заявителя.")
    private Integer applicantType;

    /** Категория на заявителя. */
    @Schema(name = "applicantCategory", description = "Категория на заявителя.")
    private ApplicantCategoryDto applicantCategory;

    /** Данни за длъжностно лице. */
    @Schema(name = "dataForAnOfficial", description = "Данни за длъжностно лице.")
    private String dataForAnOfficial;

    /** Вид на специален достъп. */
    @Schema(name = "specialAccessType", description = "Вид на специален достъп.")
    private String specialAccessType;

    public ApplicantDataDto() {
        this(true);
    }

    public ApplicantDataDto(boolean createAll){
        if(createAll) {
            this.individual = new IndividualDto(createAll);
        }
    }
}
