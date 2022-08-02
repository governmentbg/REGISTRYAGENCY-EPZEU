package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.EkatteDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LanguageDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class EkatteSettlementNomenclatureCache extends BaseCache<String, EkatteDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public EkatteSettlementNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
