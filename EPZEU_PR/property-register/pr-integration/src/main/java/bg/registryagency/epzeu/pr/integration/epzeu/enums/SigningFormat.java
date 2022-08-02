package bg.registryagency.epzeu.pr.integration.epzeu.enums;

import lombok.Getter;

/**
 * Формати за е-подписа според файла за подписване.
 */
@Getter
public enum SigningFormat {
    CADES(0, "CAdES"),
    PADES(1, "PAdES"),
    XADES(2, "XAdES"),
    ASICS(3, "ASICS"),
    ASICE(4, "ASICE");

    private int code;
    private String name;

    SigningFormat(int code, String name) {
        this.code = code;
        this.name = name;
    }
}
