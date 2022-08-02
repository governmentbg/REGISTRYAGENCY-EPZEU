package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.mapper.ApplicationProcessDtoMapper;
import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationDto;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationProcessDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.UrlConstants;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.payment.dto.ObligationDto;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.web.api.config.OpenApiConfiguration;
import bg.registryagency.epzeu.pr.web.common.annotation.RateLimit;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;
import reactor.core.publisher.Flux;

import javax.validation.constraints.Positive;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.util.UUID;

/**
 * Контролер реализиращ уеб услуги за управление на процеса по заявяване.
 */
@Tag(name = "ApplicationProcessController", description = "Контролер реализиращ уеб услуги за управление на процеса по заявяване.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + UrlConstants.APPLICATION_PROCESS_URL)
@RequiredArgsConstructor
@Validated
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class ApplicationProcessController {
    private final ApplicationProcessService applicationProcessService;
    private final LabelMessageSource labelMessageSource;

    /**
     * Операция за вземане на процес по заявяване.
     *
     * @param applicationType Тип на заявлението, за което ще бъде върнат процес по заявяване.
     * @return Процес по заявяване.
     */
    @Operation(summary = "Операция за вземане на процес по заявяване.")
    @GetMapping
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Процес по заявяване.", content = @Content(schema = @Schema(implementation = ApplicationProcessDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ApplicationDataException.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public ApplicationProcessDto getApplicationProcessByApplicationType(@Parameter(description = "Тип на заявлението, за което ще бъде върнат процес по заявяване.")
                                                                            @Positive @RequestParam final int applicationType,
                                                                        @Parameter(description = "Зареди всички данни.")
                                                                            @RequestParam(required = false) boolean loadAllData) throws ApplicationDataException {
        ApplicationType applicationTypeEnum = ApplicationType.fromInteger(applicationType);

        if(!applicationProcessService.isApplicationActive(applicationTypeEnum)) {
            throw new ApplicationDataException("GL_APPLICATION_CANNOT_SUBMITTED_E", labelMessageSource.getMessage("GL_APPLICATION_CANNOT_SUBMITTED_E"));
        }

        applicationProcessService.validateAuthenticationType(applicationTypeEnum);
        ApplicationProcess applicationProcess = applicationProcessService
            .getApplicationProcessByApplicationType(applicationTypeEnum, loadAllData);

        if(applicationProcess != null && applicationProcessService.hasChangesInApplicationsNomenclature(applicationProcess)) {
            applicationProcess.setHasChangesInApplicationsNomenclature(true);
        }

        var dto = ApplicationProcessDtoMapper.asDto(applicationProcess);
        if(dto != null && StringUtils.hasText(dto.getErrorMessage())) {
            //If there is error in Application Process, mask it before send to user
            dto.setErrorMessage(null);
        }

        return dto;
    }

    /**
     * Операция за вземане на процес по заявяване.
     *
     * @param applicationProcessId Идентификатор на процес по заявяване.
     * @return Процес по заявяване.
     */
    @Operation(summary = "Операция за вземане на процес по заявяване.")
    @GetMapping("/{applicationProcessId}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Процес по заявяване.", content = @Content(schema = @Schema(implementation = ApplicationProcessDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public ApplicationProcessDto getApplicationProcess(@Parameter(description = "Идентификатор на процес по заявяване.") @Positive @PathVariable final long applicationProcessId) {
        ApplicationProcess applicationProcess = applicationProcessService.search(SearchCriteria
            .ApplicationProcessSearchCriteria.builder()
            .applicationProcessId(applicationProcessId)
            .build()).single();

        var dto = ApplicationProcessDtoMapper.asDto(applicationProcess);
        if(dto != null && StringUtils.hasText(dto.getErrorMessage())) {
            //If there is error in Application Process, mask it before send to user
            dto.setErrorMessage(null);
        }

        return dto;
    }

    /**
     * Операция за създаване на процес по завяване.
     * @param applicationDto Контейнер на данни на заявление, което носи информация за процеса и заявлението в него, които ще бъдат създадени.
     * @return Процес по заявяване с идентификатор на процеса.
     * @throws JAXBException
     * @throws IOException
     * @throws ApplicationDataException
     */
    @Operation(summary = "Операция за създаване на процес по завяване.")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Процес по заявяване с идентификатор на процеса.", content = @Content(schema = @Schema(implementation = ApplicationProcessDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ApplicationError.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public ApplicationProcessDto createApplicationProcess(@Parameter(description = "Контейнер на данни на заявление, което носи информация за процеса и заявлението в него, които ще бъдат създадени.")
                                                              @RequestBody final ApplicationDto applicationDto)
        throws JAXBException, IOException, ApplicationDataException {

        ApplicationType applicationType = ApplicationType.fromInteger(applicationDto.getType());

        if(!applicationProcessService.isApplicationActive(applicationType)) {
            throw new ApplicationDataException("GL_APPLICATION_CANNOT_SUBMITTED_E", labelMessageSource.getMessage("GL_APPLICATION_CANNOT_SUBMITTED_E"));
        }

        applicationProcessService.validateAuthenticationType(applicationType);
        ApplicationProcess applicationProcess = applicationProcessService.create(applicationType,
            applicationDto.getAdditionalData());
        return ApplicationProcessDtoMapper.asDto(applicationProcess);
    }

    /**
     * Операция за изтриване на процес по заявяване.
     *
     * @param applicationProcessId Идентификатор на процес по заявяване.
     */
    @Operation(summary = "Операция за изтриване на процес по заявяване.")
    @DeleteMapping("/{applicationProcessId}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success"),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void deleteApplicationProcess(@Parameter(description = "Идентификатор на процес по заявяване.") @Positive @PathVariable final long applicationProcessId) {
        applicationProcessService.delete(applicationProcessId);
    }

    /**
     * Операция по стартиране на конструиране на всички заявление в процеса и изпращането им към бекофис система.
     * Процеса променя статуса си към "В процес на изпращане".
     * @param applicationProcessId Идентификатор на процес на заявление.
     * @return HTTP код 200, с който се съобщава, че операцията е завършила успешно.
     * @throws SAXException
     * @throws XMLStreamException
     * @throws IOException
     * @throws JAXBException
     * @throws ApplicationDataException
     */
    @Operation(summary = "Операция по стартиране на конструиране на всички заявление в процеса и изпращането им към бекофис система.")
    @PostMapping("/{applicationProcessId}/StartSending")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success"),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ApplicationError.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void startSending(@Parameter(description = "Идентификатор на процес на заявление.") @Positive @PathVariable final long applicationProcessId)
        throws SAXException, XMLStreamException, IOException, JAXBException, ApplicationDataException {

        applicationProcessService.startSending(applicationProcessId);
    }

    /**
     * Операция по стартиране на процес на подписване.
     * Процесът преминава в статус "В процес на подписване".
     * @param applicationProcessId Идентификатор на процес на заявление.
     * @return  Идентификатор на процес по подписване върнат от модула за подписване.
     * @throws SAXException
     * @throws XMLStreamException
     * @throws IOException
     * @throws JAXBException
     * @throws ApplicationDataException
     */
    @Operation(summary = "Операция по стартиране на подписване.")
    @PostMapping("/{applicationProcessId}/StartSigning")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Идентификатор на процес по подписване върнат от модула за подписване.",
            content = @Content(schema = @Schema(implementation = Object.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ApplicationError.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public UUID startSigning(@Parameter(description = "Идентификатор на процес на заявление.") @Positive @PathVariable final long applicationProcessId)
        throws SAXException, XMLStreamException, IOException, JAXBException, ApplicationDataException {

        return applicationProcessService.startSigning(applicationProcessId);
    }

    /**
     * Операция по връщане в начален статус на заявление.
     * @param applicationProcessId Идентификатор на процес на заявление.
     */
    @Operation(summary = "Операция по връщане в начален статус на заявление.")
    @PostMapping("{applicationProcessId}/ReturnToBeginningStatus")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void returnToBeginningStatus(@Parameter(description = "Идентификатор на процес на заявление.") @PathVariable final long applicationProcessId) {
        applicationProcessService.returnToBeginningStatus(applicationProcessId);
    }

    /**
     * Операция по вземане на задължения на заявление.
     * @param applicationProcessId Идентификатор на процес на заявление.
     * @return Списък със задължения.
     */
    @Operation(summary = "Операция по вземане на задължения на заявление.")
    @GetMapping("{applicationProcessId}/Obligations")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък със задължения.", content = @Content(array = @ArraySchema(schema = @Schema(implementation = ObligationDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<ObligationDto> getApplicationProcessObligations(@Parameter(description = "Идентификатор на процес на заявление.") @PathVariable final long applicationProcessId) {
        return applicationProcessService.searchApplicationProcessObligations(applicationProcessId);
    }
}
