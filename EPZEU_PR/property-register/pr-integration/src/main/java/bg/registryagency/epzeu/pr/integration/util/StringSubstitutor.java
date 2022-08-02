package bg.registryagency.epzeu.pr.integration.util;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringSubstitutor {
    //Pattern for placeholders is: {some_placeholder}
    private static final Pattern placeholderPattern = Pattern.compile("\\$\\{(.+?)\\}");

    /**
     * Replace template with placeholders with passed values.
     * Placeholder is every match to ${some_placeholder_name}
     * @param template which consists placeholder for replacement.
     * @param placeholders map with placeholders for replacement. Key of the map if placeholder name, value is value which will be replaced on place of placeholder.
     *                     map have to consists all placeholders which template consists.
     * @return text with replaced all placeholders with passed values in @param placeholders.
     * @throws NullPointerException If template consist placeholder which is not passed in placeholders param for replacement. All placeholders in template have to be replaced.
     */
    public static String replace(String template, Map<String, String> placeholders) {
        Matcher matcher = placeholderPattern.matcher(template);

        StringBuilder sb = new StringBuilder();
        while (matcher.find()) {
            String var = matcher.group(1);
            String replacement = placeholders.get(var);

            matcher.appendReplacement(sb, replacement);
        }
        matcher.appendTail(sb);
        return sb.toString();
    }
}
