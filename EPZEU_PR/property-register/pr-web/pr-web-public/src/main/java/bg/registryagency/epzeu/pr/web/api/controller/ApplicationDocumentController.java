package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.service.ApplicationDocumentService;
import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessService;
import bg.registryagency.epzeu.pr.domain.util.ApplicationUtil;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.api.application.segment.AttachedDocumentDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationDocumentFileWebClient;
import bg.registryagency.epzeu.pr.web.api.config.OpenApiConfiguration;
import bg.registryagency.epzeu.pr.web.common.annotation.RateLimit;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

/**
 * Контролер реализиращ уеб услуги за управление на прикачени документи към чернова на заявление.
 */
@Tag(name = "ApplicationDocumentController", description = "Контролер реализиращ уеб услуги за управление на прикачени документи към чернова на заявление.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/ApplicationProcesses/{applicationProcessId}/Applications/{applicationId}/AttachedDocument")
@RequiredArgsConstructor
@Validated
@Slf4j
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class ApplicationDocumentController {
    private final ApplicationProcessService applicationProcessService;
    private final ApplicationDocumentService applicationDocumentService;
    private final ApplicationDocumentFileWebClient applicationDocumentFileWebClient;

    /**
     * Операция за създаване на прикачен документ към чернова на заявление.
     * @param applicationProcessId Идентификатор на процес по заявяване.
     * @param applicationId Идентификатор на чернова на заявление.
     * @param documentTypeId Идентификатор на вид на прикачения документ.
     * @param documentTypeName Име на вид на прикачения документ.
     * @param name Име на прикачения документ.
     * @param file Съдържание на прикачен документ.
     * @return Прикачен документ с идентификатор на прикачения документ.
     * @throws IOException в случай, че има проблеми свързани с достъпа до файла.
     */
    @Operation(summary = "Операция за създаване на прикачен документ към чернова на заявление.")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Прикачен документ с идентификатор на прикачения документ.", content = @Content(schema = @Schema(implementation = AttachedDocumentDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<AttachedDocumentDto> createApplicationDocument(@Parameter(description = "Идентификатор на процес по заявяване.") @PathVariable @Positive Long applicationProcessId,
                                                               @Parameter(description = "Идентификатор на чернова на заявление.") @PathVariable @Positive Long applicationId,
                                                               @NotNull String documentTypeId,
                                                               @NotNull String documentTypeName,
                                                               @NotNull String name,
                                                               MultipartFile file) throws IOException {
        applicationDocumentService.validateFile(file);

        final ApplicationDocument applicationDocument = new ApplicationDocument();
        applicationDocument.setDocumentTypeId(documentTypeId);
        applicationDocument.setName(name);
        applicationDocument.setApplication(new Application(applicationId));
        //int type will be always enough for size because files are not going to be big
        applicationDocument.setFileSize((int) file.getSize());

        Mono<AttachedDocumentDto> applicationDocumentMono = applicationDocumentFileWebClient.upload(file.getResource(), file.getOriginalFilename())
            .doOnSuccess(response -> {
                if (log.isDebugEnabled()) {
                    log.debug("File successfully uploaded: " + file.getOriginalFilename());
                }
            })
            .doOnError(error -> log.error("Problem occurred during uploading of file with fileName:" + file.getOriginalFilename()))
            .map(response -> {
                applicationDocument.setBackofficeGuid(response.getDocIdentifier());

                ApplicationDocument createdApplicationDoc = applicationDocumentService.create(applicationDocument);

                AttachedDocumentDto dto = new AttachedDocumentDto();
                dto.setDocumentTypeId(documentTypeId);
                dto.setDocumentTypeName(documentTypeName);
                dto.setName(name);

                dto.setDocumentUniqueId(createdApplicationDoc.getBackofficeGuid().toString());
                dto.setFileName(file.getOriginalFilename());
                dto.setContentType(file.getContentType());

                dto.setSize(Long.valueOf(createdApplicationDoc.getFileSize()));
                dto.setHashAlgorithm(response.getHashAlgorithm());
                dto.setHash(Base64.getDecoder().decode(response.getContentHash()));
                dto.setApplicationDocumentId(createdApplicationDoc.getApplicationDocumentId());

                return dto;
            });

        return applicationDocumentMono;
    }

    /**
     * Операция за обновяване на прикачен документ към чернова на заявление.
     * @param applicationDocumentId Идентификатор на документ.
     * @param attachedDocumentDto Модел на прикачен документ.
     */
    @Operation(summary = "Операция за обновяване на прикачен документ към заявление.")
    @PutMapping("/{applicationDocumentId}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void updateApplicationDocument(@Parameter(description = "Идентификатор на процес по заявяване.") @PathVariable @Positive Long applicationProcessId,
                                          @Parameter(description = "Идентификатор на чернова на заявление.") @PathVariable @Positive Long applicationId,
                                          @Parameter(description = "Идентификатор на документ.") @PathVariable @Positive Long applicationDocumentId,
                                          @Parameter(description = "Модел на прикачен документ.") @RequestBody AttachedDocumentDto attachedDocumentDto) {
        ApplicationDocument applicationDocument = applicationDocumentService.search(SearchCriteria.ApplicationDocumentSearchCriteria.builder()
            .applicationDocumentIds(applicationDocumentId).build()).single();

        applicationDocument.setName(attachedDocumentDto.getName());
        applicationDocument.setDocumentTypeId(attachedDocumentDto.getDocumentTypeId());

        applicationDocumentService.update(applicationDocument);
    }

    /**
     * Операция за изтриване на прикачен документ от чернова на заявление.
     * @param applicationProcessId Идентификатор на процес по заявяване.
     * @param uuidString идентификатор на прикачения документ.
     */
    @Operation(summary = "Операция за изтриване на прикачен документ от чернова на заявление.")
    @DeleteMapping("/{uuidString}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<Void> deleteApplicationDocument(@Parameter(description = "Идентификатор на процес по заявяване.") @PathVariable @Positive Long applicationProcessId,
                                                @Parameter(description = "Идентификатор на чернова на заявление.") @PathVariable @Positive Long applicationId,
                                                @Parameter(description = "Идентификатор на прикачения документ.") @PathVariable String uuidString) {
        ApplicationProcess applicationProcess = applicationProcessService.search(SearchCriteria.ApplicationProcessSearchCriteria
            .builder()
            .applicationProcessId(applicationProcessId)
            .loadApplications(true)
            .build()).single();

        UUID uuid = UUID.fromString(uuidString);

        if(applicationProcess.getStatus() != ApplicationProcess.Status.COMPLETED
            && !ApplicationUtil.isDocumentFromInitialApplication(applicationProcess.getMainApplication(), uuidString)) {

            return applicationDocumentFileWebClient.delete(uuid)
                .doOnSuccess(aVoid -> {
                    if(log.isDebugEnabled()) {
                        log.debug("Attached document was successfully deleted: " + uuid);
                    }

                    applicationDocumentService.delete(uuid);
                })
                .doOnError(error -> log.error("Problem occurred during deletion of file with uuid: " + uuid));
        } else {
            applicationDocumentService.delete(uuid);

            return Mono.empty();
        }
    }
}
