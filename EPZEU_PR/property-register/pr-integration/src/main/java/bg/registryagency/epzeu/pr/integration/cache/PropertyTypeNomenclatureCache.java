package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyTypeNomDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class PropertyTypeNomenclatureCache extends BaseCache<String, PropertyTypeNomDto> {

    public PropertyTypeNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
