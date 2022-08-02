package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.DocumentTypeEpzeuDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class DocumentTypeEpzeuNomenclatureCache extends BaseCache<String, DocumentTypeEpzeuDto> {
    @Getter
    @Setter
    private String lastUpdatedDate;

    public DocumentTypeEpzeuNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
