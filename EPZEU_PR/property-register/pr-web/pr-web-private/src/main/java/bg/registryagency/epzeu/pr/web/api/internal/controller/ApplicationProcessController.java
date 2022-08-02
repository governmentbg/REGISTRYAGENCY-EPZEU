package bg.registryagency.epzeu.pr.web.api.internal.controller;

import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessService;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.UrlConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.EpzeuApplicationDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Контролер реализиращ уеб услуги за управление на процеса по заявяване.
 */
@Tag(name = "ApplicationProcessController", description = "Контролер реализиращ уеб услуги за управление на процеса по заявяване.")
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + UrlConstants.APPLICATION_PROCESS_URL)
@RequiredArgsConstructor
@Validated
public class ApplicationProcessController {
    private final ApplicationProcessService applicationProcessService;

    /**
     * Операзия за уведомяване на отказване на процес по подписване.
     * @param signingGiud Идентификатор на процес по подписване.
     */
    @Operation(summary = "Операзия за уведомяване на отказване на процес по подписване.")
    @PostMapping("/SigningRejected")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void rejectSigning(@Parameter(description = "Идентификатор на процес по подписване.") @RequestParam final UUID signingGiud) {
        applicationProcessService.rejectSigning(signingGiud);
    }

    /**
     * Операция за уведомяване за успешно завършване на процес по подписване.
     * @param signingGiud Идентификатор на процес по подписване.
     * @param userCIN КИН на потребителя.
     * @param ipAddress IP адрес.
     * @param userSessionID Идентификатор на сесията на потребителя.
     * @param loginSessionID Идентификатор на логин сесията.
     * @param request Заявка съдържаща, подписаното съдържание на заявлението.
     * @throws IOException
     */
    @Operation(summary = "Операция за уведомяване за успешно завършване на процес по подписване.")
    @PostMapping("/SigningCompleted")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void completeSigning(@Parameter(description = "") @RequestParam final UUID signingGiud,
                                      @Parameter(description = "КИН на потребителя.") @RequestParam final int userCIN,
                                      @Parameter(description = "IP адрес.") @RequestParam final String ipAddress,
                                      @Parameter(description = "Идентификатор на сесията на потребителя.") @RequestParam final String userSessionID,
                                      @Parameter(description = "Идентификатор на логин сесията.") @RequestParam final String loginSessionID,
                                      @Parameter(description = "Заявка съдържаща, подписаното съдържание на заявлението.") MultipartHttpServletRequest request) throws IOException {

        applicationProcessService.completeSigning(signingGiud, userCIN, ipAddress, userSessionID, loginSessionID, request.getFile("file").getBytes());
    }

    /**
     * Операция за уведомяване на успешно регистриране на заявление или група от заявления подадени едновременно.
     * @param registeredAppInfos Списък със информация на успешно регистрираните заявления.
     * @return HTTP код 200, с който се съобщава, че операцията е завършила успешно.
     */
    @Operation(summary = "Операция за уведомяване на успешно регистриране на заявление или група от заявления подадени едновременно.")
    @PostMapping("/Registered")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public HttpStatus applicationRegistered(@Parameter(description = "Списък със информация на успешно регистрираните заявления.") @RequestBody final List<ApplicationInfo> registeredAppInfos) {
        applicationProcessService.completeApplicationRegistration(registeredAppInfos);

        return HttpStatus.OK;
    }
}
