package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.SpecialAccessTypeDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class SpecialAccessTypeNomenclatureCache extends BaseCache<Integer, SpecialAccessTypeDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public SpecialAccessTypeNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
