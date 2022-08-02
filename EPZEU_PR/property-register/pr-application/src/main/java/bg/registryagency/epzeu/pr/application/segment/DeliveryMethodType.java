package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Начин на получаване
 *
 * <p>Java class for DeliveryMethodType complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="DeliveryMethodType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Id" type="{http://www.registryagency.bg/schemas/property-register/values}DeliveryMethodTypeId"/&gt;
 *         &lt;element name="Name" type="{http://www.registryagency.bg/schemas/property-register/values}DeliveryMethodTypeId"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@Getter
@Setter
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DeliveryMethodType", propOrder = {
    "id",
    "name"
})
public class DeliveryMethodType {
    @XmlElement(name = "Id", required = true)
    protected String id;
    @XmlElement(name = "Name", required = true)
    protected String name;

    public DeliveryMethodType(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
