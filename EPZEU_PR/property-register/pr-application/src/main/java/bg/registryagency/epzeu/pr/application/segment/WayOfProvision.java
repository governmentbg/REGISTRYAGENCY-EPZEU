package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;

/**
 * Начин на предоставяне на услуга
 *
 * <p>Java class for WayOfProvision complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="WayOfProvision"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{WayOfProvisionBaseData}WayOfProvisionBaseData"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ReceivingOffice" type="{RegistryOffice}RegistryOffice"/&gt;
 *         &lt;element name="ServiceTypeId" type="{ServiceTypeId}ServiceTypeId"/&gt;
 *         &lt;element name="ServiceTypeEpzeu" type="{ServiceTypeEpzeu}ServiceTypeEpzeu"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
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
@XmlType(name = "WayOfProvision", propOrder = {
    "receivingOffice",
    "serviceTypeId",
    "serviceTypeEpzeu"
})
public class WayOfProvision extends WayOfProvisionBaseData {
    @XmlElement(name = "ReceivingOffice")
    protected RegistryOffice receivingOffice;
    @XmlElement(name = "ServiceTypeId", required = true)
    protected String serviceTypeId;
    @XmlElement(name = "ServiceTypeEpzeu", required = true)
    protected ServiceType serviceTypeEpzeu;
}
