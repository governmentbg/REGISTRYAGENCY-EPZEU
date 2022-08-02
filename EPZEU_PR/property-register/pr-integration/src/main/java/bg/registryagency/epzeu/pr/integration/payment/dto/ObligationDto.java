package bg.registryagency.epzeu.pr.integration.payment.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Контейнер на данни за задължение.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ObligationDto", description = "Контейнер на данни за задължение.")
public class ObligationDto {

    /** Номер на задължение. */
    @Schema(name = "obligationNumber", description = "Номер на задължение.")
    private long obligationNumber;

    /** Стойност на задължението. */
    @Schema(name = "obligationAmount", description = "Стойност на задължението.")
    private BigDecimal obligationAmount;

    /** Статус на задължението. */
    @Schema(name = "status", description = "Статус на задължението.")
    private String status;

    /** Платена сума по задължението. */
    @Schema(name = "paidAmount", description = "Платена сума по задължението.")
    private BigDecimal paidAmount;

    /** Стойност за връщане. */
    @Schema(name = "reversalAmount", description = "Стойност за връщане.")
    private BigDecimal reversalAmount;

    /** Номер на заявление. */
    @Schema(name = "applicationNumber", description = "Номер на заявление.")
    private String applicationNumber;

    /** Вид на заявление. */
    @Schema(name = "applicationType", description = "Вид на заявление.")
    private String applicationType;

    /** Регистър, за което е задължението. */
    @Schema(name = "register", description = "Регистър, за което е задължението.")
    private String register;

    /** Референтен номер. */
    @Schema(name = "referenceNumber", description = "Референтен номер.")
    private String referenceNumber;

    /** Идентификатор на адрес за обратна връзка. */
    @Schema(name = "callbackAddressID", description = "Идентификатор на адрес за обратна връзка.")
    private Long callbackAddressID;
}
