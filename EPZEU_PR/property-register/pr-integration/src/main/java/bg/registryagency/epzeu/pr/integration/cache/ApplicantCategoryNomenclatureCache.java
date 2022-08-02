package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.ApplicantCategoryDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class ApplicantCategoryNomenclatureCache extends BaseCache<String, ApplicantCategoryDto> {

    public ApplicantCategoryNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
