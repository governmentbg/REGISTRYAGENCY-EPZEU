package bg.registryagency.epzeu.pr.integration.i18n;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LabelMessageFormat extends MessageFormat {

    private static final Pattern placeholderEpzeuPattern = Pattern.compile("\\{(.+?)\\}");

    public LabelMessageFormat(String pattern) {
        super(pattern);
    }

    public LabelMessageFormat(String pattern, Locale locale) {
        super(pattern, locale);
    }

    @Override
    public void applyPattern(String pattern) {
        Matcher matcher = placeholderEpzeuPattern.matcher(pattern);

        int placeholderIndex = 0;
        StringBuilder sb = new StringBuilder();

        while (matcher.find()) {
            String replacement = "{" + placeholderIndex + "}";

            matcher.appendReplacement(sb, replacement);
            placeholderIndex++;
        }
        matcher.appendTail(sb);

        super.applyPattern(sb.toString());
    }
}
