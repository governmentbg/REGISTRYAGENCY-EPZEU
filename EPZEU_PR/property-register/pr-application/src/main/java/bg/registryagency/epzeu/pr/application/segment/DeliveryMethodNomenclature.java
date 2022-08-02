package bg.registryagency.epzeu.pr.application.segment;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Java class for DeliveryMethodNomenclature.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="DeliveryMethodNomenclature"&gt;
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
 *     &lt;enumeration value="AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT"/&gt;
 *     &lt;enumeration value="ON_THE_COUNTER"/&gt;
 *   &lt;/restriction&gt;
 * &lt;/simpleType&gt;
 * </pre>
 *
 */
@XmlType(name = "DeliveryMethodNomenclature")
@XmlEnum
@Getter
public enum DeliveryMethodNomenclature {
    AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT("20001100000000003002", "По електронен път"),
    ON_THE_COUNTER("20001100000000003001", "На гише в служба по вписванията"),
    ON_THE_COUNTER_AND_AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT("20001100000000003012", "На гише в СВ и по електронен път");

    private String id;
    private String name;

    DeliveryMethodNomenclature(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public DeliveryMethodType asDeliveryMethodType() {
        return new DeliveryMethodType(this.id, this.name);
    }

    public String value() {
        return name();
    }

    public static DeliveryMethodNomenclature fromValue(String v) {
        return valueOf(v);
    }
}
