package bg.registryagency.epzeu.pr.integration.i18n;

import bg.registryagency.epzeu.pr.integration.cache.LabelNomenclatureCache;
import lombok.RequiredArgsConstructor;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.AbstractMessageSource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Locale;


@Component("messageSource")
@RequiredArgsConstructor
public class LabelMessageSource extends AbstractMessageSource {
    private final LabelNomenclatureCache labelNomenclatureCache;

    @Override
    public MessageFormat resolveCode(String code, Locale locale) {

        String labelValue = labelNomenclatureCache.get(locale.getLanguage(), code);
        if(labelValue != null) {
            return new LabelMessageFormat(labelValue, locale);
        }

        return null;
    }

    public String getMessage(String code) throws NoSuchMessageException {
        return super.getMessage(code, null, LocaleContextHolder.getLocale());
    }

    public String getMessageOrDefault(String code, String defaultMessage) throws NoSuchMessageException {
        try {
            return super.getMessage(code, null, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException e) {
            return defaultMessage;
        }
    }

    public String getMessageOrDefault(String code, @Nullable Object[] args, String defaultMessage) {
        try {
            return super.getMessage(code, args, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException e) {
            return defaultMessage;
        }
    }
}
