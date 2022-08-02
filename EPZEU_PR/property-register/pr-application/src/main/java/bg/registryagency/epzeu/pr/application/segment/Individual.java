package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Физическо лице
 *
 * <p>Java class for Individual complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="Individual"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="PersonNationality" type="{Country}Country"/&gt;
 *         &lt;element name="Identity" type="{Identity}Identity"/&gt;
 *         &lt;element name="Name" type="{Name}Name"/&gt;
 *         &lt;element name="BirthPlace" type="{BirthPlace}BirthPlace"/&gt;
 *         &lt;element name="Bulstat" type="{Bulstat}Bulstat"/&gt;
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
@XmlType(name = "Individual", propOrder = {
    "personNationality",
    "identity",
    "name",
    "birthPlace",
    "bulstat"
})
public class Individual {
    @XmlElement(name = "PersonNationality", required = true)
    protected Country personNationality;
    @XmlElement(name = "Identity", required = true)
    protected Identity identity;
    @XmlElement(name = "Name", required = true)
    protected Name name;
    @XmlElement(name = "BirthPlace")
    protected BirthPlace birthPlace;
    @XmlElement(name = "Bulstat")
    protected String bulstat;

}
