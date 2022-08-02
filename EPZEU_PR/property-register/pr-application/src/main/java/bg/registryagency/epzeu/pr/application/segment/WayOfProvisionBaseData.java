package bg.registryagency.epzeu.pr.application.segment;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


/**
 * Базова информация за начин на предоставяне на услугата
 * 
 * <p>Java class for WayOfProvisionBaseData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="WayOfProvisionBaseData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="IssuingAuthority" type="{http://www.registryagency.bg/schemas/property-register/segments}RegistryOffice"/&gt;
 *         &lt;element name="DeliveryMethodType" type="{http://www.registryagency.bg/schemas/property-register/segments}DeliveryMethodType"/&gt;
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
@XmlType(name = "WayOfProvisionBaseData", propOrder = {
    "issuingAuthority",
    "deliveryMethodType"
})
@XmlSeeAlso({
    WayOfProvision.class
})
public class WayOfProvisionBaseData {

    @XmlElement(name = "IssuingAuthority", required = true)
    protected RegistryOffice issuingAuthority;
    @XmlElement(name = "DeliveryMethod", required = true)
    protected DeliveryMethodType deliveryMethodType;
}
