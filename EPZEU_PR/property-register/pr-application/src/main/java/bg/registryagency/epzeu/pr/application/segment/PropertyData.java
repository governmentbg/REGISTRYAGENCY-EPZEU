package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Данни за имот
 * 
 * <p>Java class for PropertyData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PropertyData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="RequestedProperty" type="{Property}Property"/&gt;
 *         &lt;element name="CurrentOwners" type="{Owners}Owners"/&gt;
 *         &lt;element name="PreviousOwners" type="{Owners}Owners"/&gt;
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
@XmlType(name = "PropertyData", propOrder = {
    "requestedProperty",
    "currentOwners",
    "previousOwners"
})
public class PropertyData {

    @XmlElement(name = "RequestedProperty", required = true)
    protected Property requestedProperty;
    @XmlElement(name = "CurrentOwners", required = true)
    protected Owners currentOwners;
    @XmlElement(name = "PreviousOwners", required = true)
    protected Owners previousOwners;

}
