package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.integration.cache.LanguageNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LanguageDto;
import bg.registryagency.epzeu.pr.web.api.DynamicPageProvider;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.stream.Stream;

/**
 * Контролер реализиращ функционалност за работа с динамични страници.
 */
@RestController
@RequestMapping
@RequiredArgsConstructor
@Validated
@Slf4j
//This controller couples back end with front end, think about another approach for covering requirements for dynamic page creation
public class DynamicPageController {

    private final DynamicPageProvider dynamicPageProvider;
    private final LanguageNomenclatureCache languageCache;

    /**
     * Операция за зареждане на страница FrontChannelLogout.
     * @return FrontChannelLogout страница.
     */
    @Operation(hidden = true)
    @GetMapping(value = "/Identity/FrontChannelLogout", produces = "text/html;charset=UTF-8")
    public String getFrontChannelLogout() {
        return dynamicPageProvider.getFrontChannelLogout();
    }

    /*
     * Операция по зареждане на index страница, която зарежда SPA(Single page application) приложение.
     */
    @Operation(hidden = true)
    @GetMapping(value = {"/", "/**/{path:[^.]*}"}, produces = "text/html;charset=UTF-8")
    public String getIndexPage(HttpServletRequest request) {
        String language = null;
        String[] pathVariables = Stream.of(request.getServletPath().split("/")).filter(w -> !w.isEmpty()).toArray(String[]::new);
        //If the first path variable is language pass it to forward
        if(pathVariables.length > 0 && pathVariables[0].length() == ApplicationConstants.LANGUAGE_CODE_LENGTH) {
            //Check pathVariable is it valid language
            LanguageDto languageDto = languageCache.get(pathVariables[0]);
            if(languageDto != null) {
                language = languageDto.getCode();
            }
        }

        return dynamicPageProvider.getIndex(StringUtils.hasText(language) ? language : ApplicationConstants.LANGUAGE_DEFAULT);
    }
}
