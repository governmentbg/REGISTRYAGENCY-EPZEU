package bg.registryagency.epzeu.pr.integration.api;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Контейнер на данни за поддържане на странициране.
 */
@Getter
@Setter
@Schema(name = "PageDto", description = "Контейнер на данни за поддържане на странициране.")
public class PageDto<T> {

    /**Брой на целия резултат(не на една страница)*/
    @Schema(name = "count", description = "Брой на целия резултат(не на една страница)")
    private final Integer count;

    /**Списък с данни за една страница*/
    @Schema(name = "objects", description = "Списък с данни за една страница")
    private final List<T> objects;

    public PageDto(Integer count, List<T> objects) {
        this.count = count;
        this.objects = objects;
    }
}
