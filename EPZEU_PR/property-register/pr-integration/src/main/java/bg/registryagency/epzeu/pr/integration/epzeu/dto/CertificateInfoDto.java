package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за сертификат.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "CertificateInfoDto", description = "Контейнер на данни за сертификат.")
public class CertificateInfoDto {

    /** Идентификатор на сертификат. */
    @Schema(name = "certificateID", description = "Идентификатор на сертификат.")
    private Integer certificateID;

    /** Наименование */
    @Schema(name = "names", description = "Наименование")
    private String names;

    /** Сериен Номер */
    @Schema(name = "serialNumber", description = "Сериен Номер")
    private String serialNumber;

    /** ХЕШ на сертификата */
    @Schema(name = "certHash", description = "ХЕШ на сертификата")
    private String certHash;

    /** Издател */
    @Schema(name = "issuer", description = "Издател")
    private String issuer;

    /** Съдържание */
    @Schema(name = "content", description = "Съдържание")
    private byte[] content;

    /** Идентификатор на организация */
    @Schema(name = "organizationIdentifier", description = "Идентификатор на организация")
    private String organizationIdentifier;
}
