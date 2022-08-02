package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CmsPageDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class CmsPageCache extends BaseCache<Integer, CmsPageDto> {

    @Getter @Setter
    private String lastUpdatedDate;

    public CmsPageCache() {
        super(Caffeine.newBuilder().build());
    }
}
