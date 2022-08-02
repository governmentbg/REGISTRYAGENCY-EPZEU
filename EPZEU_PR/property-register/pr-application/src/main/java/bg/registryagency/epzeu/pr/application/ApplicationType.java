package bg.registryagency.epzeu.pr.application;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

/**
 * <div class="bg">
 *     Тип на заявлението.
 * </div>
 */
@Getter
public enum ApplicationType {
    /** <div class="bg">Справка за лице във всичко служби по вписвания</div*/
    REQUEST_FOR_REPORT_FOR_PERSON_IN_ALL_REGISTRY_OFFICES(81, "RequestForReportForPersonInAllRegistryOffices","Заявление за лице във всички служби по вписвания", false),
    /** <div class="bg">Удостоверение за лице от Имотен регистър</div>*/
    APPLICATION_CERTIFICATE_PERSON(43, "ApplicationForCertificateForPerson", "Заявление за издаване на удостоверение за лице от имотен регистър", true),
    /** <div class="bg">Удостоверение за имот от Имотен регистър</div>*/
    APPLICATION_CERTIFICATE_PROPERTY(73, "ApplicationForCertificateForProperty","Заявление за издаване на удостоверение за имот от имотен регистър", true),
    /** <div class="bg">Удостоверение за период от Имотен регистър</div>*/
    APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON(74, "ApplicationForCertificateForPeriodForPerson","Заявление за издаване на удостоверение за период за лице от имотен регистър", true),
    /** <div class="bg">Удостоверение за период от Имотен регистър</div>*/
    APPLICATION_CERTIFICATE_PERIOD_FOR_PROPERTY(77, "ApplicationForCertificateForPeriodForProperty","Заявление за издаване на удостоверение за период за имот от имотен регистър", true),
    /** <div class="bg">Удостоверение за заверен препис от Имотен регистър</div>*/
    APPLICATION_CERTIFIED_COPY(75, "ApplicationForCertifiedCopy","Заявление за издаване на заверен препис от имотен регистър", true),
    /** <div class="bg">Удостоверение за незаверен препис от Имотен регистър</div>*/
    APPLICATION_NOT_CERTIFIED_COPY(76, "ApplicationForNotCertifiedCopy","Заявление за издаване на незаверен препис от имотен регистър", true),
    /** <div class="bg">Заявление за деклариране на предстояща сделка с недвижим имот</div*/
    APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY(78, "ApplicationForDeclarationOfUpcomingDealWithProperty","Заявление за деклариране на предстояща сделка с недвижим имот", true),
    /** <div class="bg">Справка чрез отдалечен достъп за документ от Имотен регистър</div>*/
    REQUEST_FOR_REPORT_FOR_DOCUMENT(44, "RequestForReportForDocument","Заявление за справка чрез отдалечен достъп за документ от имотен регистър", false),
    /** <div class="bg">Справка чрез отдалечен достъп за електронна партида на имот от Имотен регистър</div>*/
    REQUEST_FOR_REPORT_FOR_ACCOUNT_PROPERTY(45, "RequestForReportForAccountProperty","Заявление за справка чрез отдалечен достъп от електронна партида за имот", false),
    /** <div class="bg">Справка чрез отдалечен достъп за за лице от Имотен регистър за избрана служба по вписвания</div*/
    REQUEST_FOR_REPORT_FOR_PERSON(46, "RequestForReportForPerson","Заявление за справка чрез отдалечен достъп за лице от имотен регистър за избрана служба по вписвания", false),
    /** <div class="bg">Справка чрез отдалечен достъп за за имот от Имотен регистър за избрана служба по вписвания</div*/
    REQUEST_FOR_REPORT_FOR_PROPERTY(62, "RequestForReportForProperty","Заявление за справка чрез отдалечен достъп за имот от Имотен регистър", false);
    /**
     * <div class="bg">
     *  Map за връзката на типовете на заявленията със съответните им идентификатори.
     *  В базата данни връзката с типа на заявлението се прави посредством идентификатора на типа на заявлението.
     *  Този map помага за бързото преобразуване на идентификатора на типа към съответния тип от enum-а.
     * </div>
     * */
    final static Map<Integer, ApplicationType> types = new HashMap<>();

    static {
        types.put(APPLICATION_CERTIFICATE_PERSON.code, APPLICATION_CERTIFICATE_PERSON);
        types.put(APPLICATION_CERTIFICATE_PROPERTY.code, APPLICATION_CERTIFICATE_PROPERTY);
        types.put(APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON.code, APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON);
        types.put(APPLICATION_CERTIFICATE_PERIOD_FOR_PROPERTY.code, APPLICATION_CERTIFICATE_PERIOD_FOR_PROPERTY);
        types.put(REQUEST_FOR_REPORT_FOR_DOCUMENT.code, REQUEST_FOR_REPORT_FOR_DOCUMENT);
        types.put(REQUEST_FOR_REPORT_FOR_ACCOUNT_PROPERTY.code, REQUEST_FOR_REPORT_FOR_ACCOUNT_PROPERTY);
        types.put(REQUEST_FOR_REPORT_FOR_PERSON.code, REQUEST_FOR_REPORT_FOR_PERSON);
        types.put(REQUEST_FOR_REPORT_FOR_PROPERTY.code, REQUEST_FOR_REPORT_FOR_PROPERTY);
        types.put(APPLICATION_CERTIFIED_COPY.code, APPLICATION_CERTIFIED_COPY);
        types.put(APPLICATION_NOT_CERTIFIED_COPY.code, APPLICATION_NOT_CERTIFIED_COPY);
        types.put(APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY.code, APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY);
        types.put(REQUEST_FOR_REPORT_FOR_PERSON_IN_ALL_REGISTRY_OFFICES.code, REQUEST_FOR_REPORT_FOR_PERSON_IN_ALL_REGISTRY_OFFICES);
    }

    /**
     * <div class="bg">Код на типа на заявление</div>
     */
    private int code;
    private String codeName;
    private String name;
    private boolean requireSigning;

    /**
     * <div class="bg">Конструктор за създаване на Тип на Заявление.</div>
     * @param code <div class="bg">Код на типа на заявление.</div>
     */
    ApplicationType(int code, String codeName, String name, boolean requireSigning) {
        this.code = code;
        this.codeName = codeName;
        this.name = name;
        this.requireSigning = requireSigning;
    }

    /**
     * <div class="bg">Преобразува идентификатор на тип на заявление в стойност от enum на Тип на Заявление.</div>
     * @param code <div class="bg">Код на типа на заявление.</div>
     * @return <div class="bg">Стойност от enum на Тип на Заявление.</div>
     */
    public static ApplicationType fromInteger(int code) {
        ApplicationType type = types.get(code);

        if (type == null) {
            throw new EnumConstantNotPresentException(ApplicationType.class, Integer.toString(code));
        }

        return type;
    }
}
