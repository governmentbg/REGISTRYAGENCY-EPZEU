package bg.registryagency.epzeu.pr.integration.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

//@Component
public class PropertyRegisterNomenclatureCache<T> extends BaseCache<String, T> {

    PropertyRegisterNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
