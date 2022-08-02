package bg.registryagency.epzeu.pr.application.segment;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Юридическо лице обект на справка
 * 
 * <p>Java class for LegalEntityOfReport complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LegalEntityOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Country" type="{Country}Country"/&gt;
 *         &lt;element name="LegalEntityNumber" type="{LegalEntityNumber}LegalEntityNumber"/&gt;
 *         &lt;element name="CompanyName" type="{CompanyName}CompanyName"/&gt;
 *         &lt;element name="CompanyCase" type="{CompanyCase}CompanyCase" minOccurs="0"/&gt;
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
@XmlType(name = "LegalEntityOfReport", propOrder = {
    "country",
    "legalEntityNumber",
    "companyName",
    "companyCase"
})
public class LegalEntityOfReport {

    @XmlElement(name = "Country", required = true)
    protected Country country;
    @XmlElement(name = "LegalEntityNumber")
    protected String legalEntityNumber;
    @XmlElement(name = "CompanyName")
    protected String companyName;
    @XmlElement(name = "CompanyCase")
    protected CompanyCase companyCase;
}
