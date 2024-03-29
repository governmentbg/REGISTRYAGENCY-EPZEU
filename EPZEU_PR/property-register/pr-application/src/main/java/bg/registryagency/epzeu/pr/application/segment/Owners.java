//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2019.03.20 at 02:18:31 PM EET 
//


package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.List;


/**
 * Собственици на имот
 * 
 * <p>Java class for Owners complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Owners"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Persons" type="{Persons}Persons"/&gt;
 *         &lt;element name="PropertyDocuments" type="{PropertyDocuments}PropertyDocuments"/&gt;
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
@XmlType(name = "Owners", propOrder = {
    "persons",
    "propertyDocuments"
})
public class Owners {

    @XmlElementWrapper(name = "Persons")
    @XmlElement(name = "Person", required = true)
    protected List<Person> persons;

    @XmlElementWrapper(name = "PropertyDocuments")
    @XmlElement(name = "PropertyDocument", required = true)
    protected List<PropertyDocument> propertyDocuments;

}
