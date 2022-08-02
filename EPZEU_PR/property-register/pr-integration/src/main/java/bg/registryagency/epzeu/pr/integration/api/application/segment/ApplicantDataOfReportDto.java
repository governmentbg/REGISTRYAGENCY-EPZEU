package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за заявител в справка чрез отдалечен достъп.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicantDataOfReportDto", description = "Контейнер на данни за заявител в справка чрез отдалечен достъп.")
public class ApplicantDataOfReportDto {

    /** Вид автентикация. */
    @Schema(name = "authenticationType", description = "Вид автентикация.")
    protected int authenticationType;

    /** Персонален идентификатор. */
    @Schema(name = "personalIdentifier", description = "Персонален идентификатор.")
    protected String personalIdentifier;

    /** Имена на заявител.*/
    @Schema(name = "names", description = "Имена на заявител.")
    protected String names;

    /** Сериен номер от сертификат/КЕП. */
    @Schema(name = "serialNumber", description = "Сериен номер от сертификат/КЕП.")
    protected String serialNumber;

    /** Издател на сертификата. */
    @Schema(name = "issuer", description = "Издател на сертификата.")
    protected String issuer;

    /** ХЕШ на сертификата. */
    @Schema(name = "certificateHash", description = "ХЕШ на сертификата.")
    protected String certificateHash;

    /** Съдържание на сертификата. */
    @Schema(name = "certificateContent", description = "Съдържание на сертификата.")
    protected byte[] certificateContent;
}
