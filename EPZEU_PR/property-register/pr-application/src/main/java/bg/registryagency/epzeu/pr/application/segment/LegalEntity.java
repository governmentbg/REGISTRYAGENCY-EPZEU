package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Фирмено дело
 *
 * <p>Java class for LegalEntity complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="LegalEntity"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Country" type="{Country}Country"/&gt;
 *         &lt;element name="LegalEntityNumber" type="{LegalEntityNumber}LegalEntityNumber"/&gt;
 *         &lt;element name="CompanyName" type="{CompanyName}CompanyName"/&gt;
 *         &lt;element name="CompanyCase" type="{CompanyCase}CompanyCase"/&gt;
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
@XmlType(name = "LegalEntity", propOrder = {
    "country",
    "legalEntityNumber",
    "companyName",
    "companyCase"
})
public class LegalEntity {
    @XmlElement(name = "Country", required = true)
    protected Country country;
    @XmlElement(name = "LegalEntityNumber")
    protected String legalEntityNumber;
    //Company name includes legalForm in the name
    @XmlElement(name = "CompanyName", required = true)
    protected String companyName;
    @XmlElement(name = "CompanyCase")
    protected CompanyCase companyCase;

}
