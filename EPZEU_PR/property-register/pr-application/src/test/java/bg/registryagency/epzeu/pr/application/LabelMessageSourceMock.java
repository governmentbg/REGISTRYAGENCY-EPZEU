package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.integration.cache.LabelNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import org.springframework.context.NoSuchMessageException;

public class LabelMessageSourceMock extends LabelMessageSource {
    public LabelMessageSourceMock(LabelNomenclatureCache labelNomenclatureCache) {
        super(labelNomenclatureCache);
    }

    @Override
    public String getMessage(String code) throws NoSuchMessageException {
        return "Mock message";
    }
}
