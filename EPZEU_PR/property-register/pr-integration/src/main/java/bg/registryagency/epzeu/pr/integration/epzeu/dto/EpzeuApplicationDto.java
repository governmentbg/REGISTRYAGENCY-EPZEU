package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


/**
 * Контейнер на данни за заявление в ЕПЗЕУ.
 */
@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(name = "EpzeuApplicationDto", description = "Контейнер на данни за заявление в ЕПЗЕУ.")
public class EpzeuApplicationDto {

    /** Идентификатор на заявление. */
    @Schema(name = "applicationID", description = "Идентификатор на заявление.")
    @JsonProperty("applicationID")
    private Long applicationId;

    /** КИН на заявителя. */
    @Schema(name = "applicantCIN", description = "КИН на заявителя.")
    @JsonProperty("applicantCIN")
    private Integer applicantCin;

    /** Идентификатор на регистър. */
    @Schema(name = "register", description = "Идентификатор на регистър.")
    @JsonProperty("register")
    private Integer registerId;

    /** Идентификатор на тип на заявление. */
    @Schema(name = "applicationTypeID", description = "Идентификатор на тип на заявление.")
    @JsonProperty("applicationTypeID")
    private Integer applicationTypeId;

    /** Входящ номер. */
    @Schema(name = "incomingNumber", description = "Входящ номер.")
    @JsonProperty("incomingNumber")
    private String incomingNumber;

    /** Дата на регистриране. */
    @Schema(name = "registrationDate", description = "Дата на регистриране.")
    @JsonProperty("registrationDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private LocalDateTime registrationDate;

    /** URL за преглед на заявление. */
    @Schema(name = "applicationDisplayUrl", description = "URL за преглед на заявление.")
    @JsonProperty("applicationDisplayUrl")
    private String applicationDisplayUrl;

    /** HTML за визуализиране на резултата. */
    @Schema(name = "resultHTML", description = "HTML за визуализиране на резултата.")
    @JsonProperty("resultHTML")
    private String resultHtml;

    /** Дата на чернова. */
    @Schema(name = "draftDate", description = "Дата на чернова.")
    private LocalDateTime draftDate;
}
