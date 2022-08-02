package bg.registryagency.epzeu.pr.application;

import javax.xml.bind.annotation.XmlEnumValue;

public enum ApplicationContentType {
    //Първоначално заявление за предоставяне на електронна административна услуга
    @XmlEnumValue("0006-000121")
    INITIAL,
    //Заявление за отстраняване на нередовности или предоставяне на информация
    @XmlEnumValue("0006-000123")
    CORRECTIVE;
}
