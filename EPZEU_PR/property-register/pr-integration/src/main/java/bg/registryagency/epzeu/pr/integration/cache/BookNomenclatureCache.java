package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.BookDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class BookNomenclatureCache extends BaseCache<String, BookDto> {

    public BookNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
