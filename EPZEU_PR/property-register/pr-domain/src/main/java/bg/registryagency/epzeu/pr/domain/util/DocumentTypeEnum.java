package bg.registryagency.epzeu.pr.domain.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * This enum is used only for mapping needed Document Types to labels for i18n purposes.
 */
@Getter
@RequiredArgsConstructor
public enum DocumentTypeEnum {
    SCANNED_ACT("20001100000000000001", "Сканиран акт", "PR_SCANNED_ACT_L"),
    CERTIFICATE("20001100000000002005", "Удостоверение", "PR_CERTIFICATE_L"),
    JUDGE_RESOLUTION("20001100000000002006", "Резолюция на съдия по вписванията", "PR_JUDGE_RESOLUTION_L");

    final String id;
    final String name;
    final String label;

    public static String fromIdToLabel(String id) {
        String type = null;
        switch (id) {
            case "20001100000000000001":
                type = SCANNED_ACT.label;
                break;
            case "20001100000000002005":
                type = CERTIFICATE.label;
                break;
            case "20001100000000002006":
                type = JUDGE_RESOLUTION.label;
                break;
        }

        return type;
    }
}
