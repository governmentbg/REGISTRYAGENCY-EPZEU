package bg.registryagency.epzeu.pr.web.api.controller;


import bg.registryagency.epzeu.pr.domain.service.NomenclaturesService;
import bg.registryagency.epzeu.pr.integration.api.LegalEntityIntegration;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import bg.registryagency.epzeu.pr.web.api.config.OpenApiConfiguration;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * Контролер реализиращ уеб услуги за управление на номенклатури.
 */
@Tag(name = "NomenclatureController", description = "Контролер реализиращ уеб услуги за управление на номенклатури.")
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/Nomenclatures")
@RequiredArgsConstructor
public class NomenclatureController {

    private final NomenclaturesService nomenclaturesService;

    /**
     * Операция за извличане на всички служби по вписвания от ИКАР.
     * @return Всички служби по вписвания от ИКАР.
     */
    @Operation(summary = "Операция за извличане на всички служби по вписвания от ИКАР.")
    @GetMapping("/registryOffice")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Всички служби по вписвания от ИКАР.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = RegistryOfficeDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<RegistryOfficeDto> getRegistryOffices() {
        return nomenclaturesService.getRegistryOffices();
    }

    /**
     * Операция за извличане на списък на всички книги от ИКАР.
     * @return Списък на всички книги от ИКАР.
     */
    @Operation(summary = "Операция за извличане на всички книги от ИКАР.")
    @GetMapping("/book")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички книги от ИКАР.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = BookDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<BookDto> getBooks() {
        return nomenclaturesService.getBooks();
    }

    /**
     * Операция за извличане на списък на всички актове по книги от ИКАР.
     * @return Списък на всички актове по книги от ИКАР.
     */
    @Operation(summary = "Операция за извличане на всички актове по книги от ИКАР.")
    @GetMapping("/actsByBook")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички актове по книги от ИКАР.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ActDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Set<ActDto> getActsByBook(@RequestParam String bookId) {
        return nomenclaturesService.getActsByBook(bookId);
    }

    /**
     * Операция за извличане на списък на всички населени места, общини и области от ИКАР. Това включва и връзка между населено място и служба.
     * @return Списък на всички населени места, общини и области.
     */
    @Operation(summary = "Операция за извличане на списък на всички населени места, общини и области от ИКАР. Това включва и връзка между населено място и служба.")
    @GetMapping("/place")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички населени места, общини и области.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = PlaceNomenclaturePrDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<PlaceNomenclaturePrDto> getPlaces() {
        return nomenclaturesService.getPlaces();
    }

    /**
     * Операция за извличане на списък на всички Видове Имоти от Имотен Регистър.
     * @return Списък на всички Видове Имоти.
     */
    @SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
    @Operation(summary = "Операция за извличане на списък на всички Видове Имоти от Имотен Регистър.")
    @GetMapping("/propertyType")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Видове Имоти.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = PropertyTypeNomDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<PropertyTypeNomDto> getPropertyTypes() {
        return nomenclaturesService.getPropertyTypes();
    }

    /**
     * Операция за извличане на списък на всички Видове Заявления от РЕАУ.
     * @return Списък на всички Видове Заявления.
     */
    @Operation(summary = "Операция за извличане на списък на всички Видове Заявления от РЕАУ.")
    @GetMapping("/applicationTypes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Видове Заявления.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApplicationTypeReauNomDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<ApplicationTypeReauNomDto> getApplicationTypes() {
        return nomenclaturesService.getApplicationTypes();
    }

    /**
     * Операция за извличане на списък на всички Видове Статуси на Заявление от РЕАУ и Имотен Регистър.
     * @return Списък на всички Видове Статуси на Заявление.
     */
    @Operation(summary = "Операция за извличане на списък на всички Видове Статуси на Заявление от РЕАУ и Имотен Регистър.")
    @GetMapping("/applicationStatuses")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Видове Статуси на Заявление.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApplicationStatusNomDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<ApplicationStatusNomDto> getApplicationStatuses() {
        return nomenclaturesService.getApplicationStatuses();
    }

    /**
     * Операция за извличане на списък на всички Категории Заявители от Имотен Регистър.
     * @return Списък на всички Категории Заявители.
     */
    @SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
    @Operation(summary = "Операция за извличане на списък на всички Категории Заявители от Имотен Регистър.")
    @GetMapping("/applicantCategories")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Категории Заявители.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApplicantCategoryDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<ApplicantCategoryDto> getApplicantCategories() {
        return nomenclaturesService.getApplicantCategories();
    }

    /**
     * Операция за извличане на списък на всички Категории Заявители за Предстояща Сделка от Имотен Регистър.
     * @return Списък на всички Категории Заявители.
     */
    @Operation(summary = "Операция за извличане на списък на всички Категории Заявители за Предстояща Сделка от Имотен Регистър.")
    @GetMapping("/applicantCategoriesForUpcomingDeal")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Категории Заявители.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApplicantCategoryDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<ApplicantCategoryDto> getApplicantCategoriesForUpcomingDeal() {
        return nomenclaturesService.getApplicantCategoriesForUpcomingDeal();
    }

    /**
     * Операция за извличане на списък на всички Видове Регистри от Имотен Регистър.
     * @return Списък на всички Видове Регистри.
     */
    @Operation(summary = "Операция за извличане на списък на всички Видове Регистри от Имотен Регистър.")
    @GetMapping("/registerTypes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Видове Регистри.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = RegisterTypeDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<RegisterTypeDto> getRegisterTypes() {
        return nomenclaturesService.getRegisterTypes();
    }

    /**
     * Операция за извличане на списък на всички Видове Документи от Имотен Регистър.
     * @return Списък на всички Видове Документи.
     */
    @SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
    @Operation(summary = "Операция за извличане на списък на всички Видове Документи от Имотен Регистър.")
    @GetMapping("/documentTypes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички Видове Документи.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = DocumentTypePrDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<DocumentTypePrDto> getDocumentTypes() {
        return nomenclaturesService.getDocumentTypes();
    }

    /**
     * Операция за извличане на списък на всички номенклатури на Трайно ползване от Имотен Регистър.
     * @return Списък на всички номенклатури на Трайно ползване.
     */
    @SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
    @GetMapping("/permanentUsages")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък на всички номенклатури на Трайно ползване.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = PermanentUsageDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public List<PermanentUsageDto> getPermanentUsages() {
        return nomenclaturesService.getPermanentUsages();
    }
}
