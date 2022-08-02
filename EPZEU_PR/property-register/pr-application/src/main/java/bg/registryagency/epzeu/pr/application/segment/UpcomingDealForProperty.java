package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import bg.registryagency.epzeu.pr.application.adapter.LocalTimeAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


/**
 * Предстояща сделка с недвижим имот
 * 
 * <p>Java class for UpcomingDealForProperty complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="UpcomingDealForProperty"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="CadastralIds" type="{CadastralIds}CadastralIds" /&gt;
 *         &lt;element name="PropertyDealType" type="{PropertyDealType}PropertyDealType" /&gt;
 *         &lt;element name="PropertyDealDate" type="{PropertyDealDate}PropertyDealDate" /&gt;
 *         &lt;element name="PropertyDealTime" type="{PropertyDealTime}PropertyDealTime" minOccurs="0"/&gt;
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
@XmlType(name = "UpcomingDealForProperty", propOrder = {
    "cadastralIds",
    "propertyDealType",
    "propertyDealDate",
    "propertyDealTime"
})
public class UpcomingDealForProperty {

    @XmlElementWrapper(name = "CadastralIds")
    @XmlElement(name = "CadastralId", required = true)
    protected List<String> cadastralIds;
    @XmlElement(name = "PropertyDealType", required = true)
    protected String propertyDealType;
    @XmlElement(name = "PropertyDealDate", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    protected LocalDate propertyDealDate;
    @XmlElement(name = "PropertyDealTime")
    @XmlJavaTypeAdapter(LocalTimeAdapter.class)
    protected LocalTime propertyDealTime;

}
