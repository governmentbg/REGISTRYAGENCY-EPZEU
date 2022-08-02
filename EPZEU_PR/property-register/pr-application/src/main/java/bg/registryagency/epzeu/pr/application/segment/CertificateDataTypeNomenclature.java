package bg.registryagency.epzeu.pr.application.segment;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for CertificateDataTypeNomenclature.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="CertificateDataTypeNomenclature"&gt;
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *     &lt;enumeration value="PERSON"/&gt;
 *     &lt;enumeration value="PROPERTY"/&gt;
 *   &lt;/restriction&gt;
 * &lt;/simpleType&gt;
 * </pre>
 * 
 */
@XmlType(name = "CertificateDataTypeNomenclature")
@XmlEnum
public enum CertificateDataTypeNomenclature {
    PERSON,
    PROPERTY;

    public String value() {
        return name();
    }

    public static CertificateDataTypeNomenclature fromValue(String v) {
        return valueOf(v);
    }

}
