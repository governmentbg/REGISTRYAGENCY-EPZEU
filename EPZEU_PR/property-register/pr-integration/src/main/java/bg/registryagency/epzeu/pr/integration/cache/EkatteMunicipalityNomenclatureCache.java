package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.EkatteDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class EkatteMunicipalityNomenclatureCache extends BaseCache<Integer, EkatteDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public EkatteMunicipalityNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
