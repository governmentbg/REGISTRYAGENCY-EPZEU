package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.LanguageDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class LanguageNomenclatureCache extends BaseCache<String, LanguageDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public LanguageNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
