package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class PlaceNomenclatureCache extends BaseCache<String, PlaceNomenclaturePrDto> {

    public PlaceNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
