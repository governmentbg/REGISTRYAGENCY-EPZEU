package bg.registryagency.epzeu.pr.application;

import java.util.Random;

class RandomGeneratorsUtil {
    private static final Random random = new Random();
    private static final char[] lettersCyrillic = "абвгдежзийклмнопрстуфхчцшщьъюяѝ".toCharArray();
    private static final char[] lettersLatin = "abcdefghijklmnopqrstuvwxyz".toCharArray();
    private static final int lettersCyrillicIndexMax  = lettersCyrillic.length-1;
    private static final int lettersLatinIndexMax = lettersLatin.length-1;

    public static String textCyrillic(boolean startWithCapital, int lenght) {
        StringBuilder tmp = new StringBuilder();
        for (int i = 0; i < lenght; i++) {
            if (i == 0 && startWithCapital) {
                tmp.append(Character.toUpperCase(lettersCyrillic[random.nextInt(lettersCyrillicIndexMax)]));
            } else {
                tmp.append(lettersCyrillic[random.nextInt(lettersCyrillicIndexMax)]);
            }
        }

        return tmp.toString();
    }

    public static String textLatin(boolean startWithCapital, int lenght) {
        StringBuilder tmp = new StringBuilder();
        for (int i = 0; i < lenght; i++) {
            if (i == 0 && startWithCapital) {
                tmp.append(Character.toUpperCase(lettersLatin[random.nextInt(lettersLatinIndexMax)]));
            } else {
                tmp.append(lettersLatin[random.nextInt(lettersLatinIndexMax)]);
            }
        }
        return tmp.toString();
    }

    public static String email(int charsBefore2, int charsAfter2) {
        StringBuilder tmp = new StringBuilder();
        for (int i = 0; i < charsBefore2; i++) {
            tmp.append(lettersLatin[random.nextInt(lettersLatinIndexMax)]);
        }
        tmp.append("@");
        for (int i = 0; i < charsAfter2; i++) {
            tmp.append(lettersLatin[random.nextInt(lettersLatinIndexMax)]);
        }
        return tmp.append(".bg").toString();
    }

    public static int numberInt(int min, int max) {
        return (min + random.nextInt((max - min) + 1));
    }

    public static double numberDouble(int min, int max) {
        return min + (max - min) * random.nextDouble();
    }

    public static float numberFloat(int min, int max) {
        return min + (max - min) * random.nextFloat();
    }

    public static Long numberLong(int min, int max) {
        return (long) (min + random.nextInt(max - min + 1));
    }

    public static String stringNumber(int min, int max) {
        int number = min + random.nextInt((max - min) + 1);
        return Integer.toString(number);
    }
}
