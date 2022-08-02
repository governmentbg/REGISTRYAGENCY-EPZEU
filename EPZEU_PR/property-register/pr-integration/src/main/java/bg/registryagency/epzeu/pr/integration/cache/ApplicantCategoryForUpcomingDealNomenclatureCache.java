package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.ApplicantCategoryDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class ApplicantCategoryForUpcomingDealNomenclatureCache extends BaseCache<String, ApplicantCategoryDto> {

    public ApplicantCategoryForUpcomingDealNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
