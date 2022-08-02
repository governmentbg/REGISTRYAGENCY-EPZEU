package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.EkatteDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class EkatteDistrictNomenclatureCache extends BaseCache<Integer, EkatteDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public EkatteDistrictNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
