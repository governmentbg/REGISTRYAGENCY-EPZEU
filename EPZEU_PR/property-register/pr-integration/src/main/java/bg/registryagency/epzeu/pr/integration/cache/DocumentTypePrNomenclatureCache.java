package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class DocumentTypePrNomenclatureCache extends BaseCache<String, DocumentTypePrDto> {

    public DocumentTypePrNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
