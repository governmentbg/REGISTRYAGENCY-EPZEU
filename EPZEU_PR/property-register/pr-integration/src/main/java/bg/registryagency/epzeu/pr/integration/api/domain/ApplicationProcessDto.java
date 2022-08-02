package bg.registryagency.epzeu.pr.integration.api.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

/**
 * Контейнер на данни за процес на заявяване.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationProcessDto", description = "Контейнер на данни за процес на заявяване.")
public class ApplicationProcessDto {

    /** Уникален идентификатор на данни за процес на заявяване на услуга. */
    @Schema(name = "applicationProcessId", description = "Уникален идентификатор на данни за процес на заявяване на услуга.")
    private Long applicationProcessId;
    /**
     *  Статус на процеса.
     */
    @Schema(name = "status", description = "Статус на процеса.")
    private Integer status;
    /** Заявителят на услугата стартирал процеса по заявяване. */
    @Schema(name = "user", description = "Заявителят на услугата стартирал процеса по заявяване.")
    private UserDto user;
    /** Основно заявление на Процеса на заяваване на услуга.
     * Основното заявление е заявлението, с което се стартира процеса по заявяване. */
    @Schema(name = "mainApplication", description = "Основно заявление на Процеса на заяваване на услуга.")
    private ApplicationDto mainApplication;
    /** Идентификатор на основното заявление на Процеса на заяваване на услуга.
     * Основното заявление е заявлението, с което се стартира процеса по заявяване. */
    @Schema(name = "mainApplicationId", description = "Идентификатор на основното заявление на Процеса на заяваване на услуга.")
    private Long mainApplicationId;

    /** Списък със заявленията свързани с процеса по заявяване на услуга. */
    @Schema(name = "applications", description = "Списък със заявленията свързани с процеса по заявяване на услуга.")
    private List<ApplicationDto> applications;

    /** Списък със съдържанията на заявленията. */
    @Schema(name = "applicationProcessContents", description = "Списък със съдържанията на заявленията.")
    private List<ApplicationProcessContentDto> applicationProcessContents;

    /** Идентификатор на заявката за подписване в модула за подписване. */
    @Schema(name = "signingGuid", description = "Идентификатор на заявката за подписване в модула за подписване.")
    private UUID signingGuid;

    /** Входящи номера на заявления в рамките на процес. */
    @Schema(name = "incomingNumbers", description = "Входящи номера на заявления в рамките на процес.")
    private String[] incomingNumbers;

    /** Съобщение за грешка при обработката на процеса. */
    @Schema(name = "errorMessage", description = "Съобщение за грешка при обработката на процеса.")
    private String errorMessage;

    /** Индикира дали има направени промени по номенклатурите. */
    @Schema(name = "hasChangesInApplicationsNomenclature", description = "Индикира дали има направени промени по номенклатурите.")
    private boolean hasChangesInApplicationsNomenclature;
}
