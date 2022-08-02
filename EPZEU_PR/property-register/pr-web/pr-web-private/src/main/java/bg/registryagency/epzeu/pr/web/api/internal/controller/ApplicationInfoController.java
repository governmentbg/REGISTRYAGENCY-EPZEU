package bg.registryagency.epzeu.pr.web.api.internal.controller;

import bg.registryagency.epzeu.pr.domain.adapter.EpzeuApplicationAdapter;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.UrlConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.client.MyApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.EpzeuApplicationDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationInfo;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

/**
 * Контролер реализиращ уеб услуги за работа с регистрирани заявления.
 */
@Tag(name = "ApplicationInfoController", description = "Контролер реализиращ уеб услуги за работа с регистрирани заявления.")
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + UrlConstants.APPLICATIONS_URL)
@RequiredArgsConstructor
@Validated
public class ApplicationInfoController {
    private final ApplicationProcessService applicationProcessService;

    private final MyApplicationWebClient myApplicationWebClient;
    private final EpzeuApplicationAdapter epzeuApplicationAdapter;

    /**
     * Операция за промяна на статус на заявление.
     * @param applicationInfo Данни за заявлението.
     */
    @Operation(summary = "Операция за промяна на статус на заявление.")
    @PostMapping(value = "/Status", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<Void> applyStatusChange(@Parameter(description = "Данни за заявлението.") @RequestBody ApplicationInfo applicationInfo) {
        return myApplicationWebClient.updateMyApplication(epzeuApplicationAdapter.toEpzeuApplicationUpdate(applicationInfo), TokenGrantType.CLIENT_CREDENTIALS);
    }

    /**
     * Операция за търсене на чернови.
     *
     * @param cin КИН на потребителя, по който ще бъдат търсени черновите.
     * @return Данни за чернови.
     */
    @Operation(summary = "Операция за търсене на чернови.")
    @GetMapping("/Drafts")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Данни за чернови.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = EpzeuApplicationDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<EpzeuApplicationDto> getApplicationDrafts(@Parameter(description = "КИН на потребителя, по който ще бъдат търсени черновите.") @Positive @RequestParam final int cin) {
        List<ApplicationProcess> applicationProcesses = applicationProcessService.search(SearchCriteria.ApplicationProcessSearchCriteria
            .builder()
            .applicantCin(cin)
            .build()).getObjects();

        var drafts = new ArrayList<EpzeuApplicationDto>();

        if (applicationProcesses != null && !applicationProcesses.isEmpty()) {
            for (ApplicationProcess applicationProcess : applicationProcesses) {
                if (applicationProcess.getStatus() != ApplicationProcess.Status.COMPLETED) {
                    var draftDto = new EpzeuApplicationDto();

                    draftDto.setApplicantCin(cin);
                    draftDto.setRegisterId(ApplicationConstants.REGISTER_ID);
                    draftDto.setApplicationTypeId(applicationProcess.getMainApplication().getType().getCode());
                    draftDto.setApplicationDisplayUrl(String.format("baseApplicationURL/Applications%s/%s", UrlConstants.APPLICATION_PROCESS_URL, applicationProcess.getMainApplication().getType().getCodeName()));
                    draftDto.setResultHtml("{GL_DRAFT_APPLICATION_L}");
                    draftDto.setDraftDate(applicationProcess.getUpdatedOn());

                    drafts.add(draftDto);
                }
            }
        }

        return drafts;
    }
}
