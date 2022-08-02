package bg.registryagency.epzeu.pr.integration.util;

public final class StringUtil {
    private StringUtil(){}

    public static String insertIntoStringBeforeKey(String str, String value, String key) {
        int position = str.indexOf(key);
        str = str.substring(0, position) + value + str.substring(position);

        return str;
    }

    public static String insertIntoStringAfterKey(String str, String value, String key) {
        int position = str.indexOf(key) + key.length();
        str = str.substring(0, position) + value + str.substring(position);

        return str;
    }
}
