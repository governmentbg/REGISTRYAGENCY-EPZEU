package bg.registryagency.epzeu.pr.application.segment;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Данни за заявителя
 *
 * <p>Java class for ServiceRecipient complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="ServiceRecipient"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Person" type="{Person}Person"/&gt;
 *         &lt;element name="ApplicantCategory" type="{ApplicantCategory}ApplicantCategory"/&gt;
 *         &lt;element name="DataForAnOfficial" type="{DataForAnOfficial}DataForAnOfficial" minOccurs="0"/&gt;
 *         &lt;element name="SpecialAccessType" type="{SpecialAccessType}SpecialAccessType" minOccurs="0"/&gt;
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
@XmlType(name = "ServiceRecipient", propOrder = {
    "person",
    "applicantCategory",
    "dataForAnOfficial",
    "specialAccessType"
})
public class ServiceRecipient {

    @XmlElement(name = "Person", required = true)
    protected Person person;
    @XmlElement(name = "ApplicantCategory", required = true)
    protected ApplicantCategory applicantCategory;
    @XmlElement(name = "DataForAnOfficial")
    protected String dataForAnOfficial;
    @XmlElement(name = "SpecialAccessType")
    protected String specialAccessType;

}
