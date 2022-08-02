package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;

/**
 * Фирмено дело
 *
 * <p>Java class for CompanyCase complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="CompanyCase"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="CompanyCaseNumber" type="{CompanyCaseNumber}CompanyCaseNumber"/&gt;
 *         &lt;element name="Year" type="{Year}Year"/&gt;
 *         &lt;element name="RegistrationCourt" type="{Court}Court"/&gt;
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
@XmlType(name = "CompanyCase", propOrder = {
    "number",
    "year",
    "registrationCourt"
})
public class CompanyCase {
    @XmlElement(name = "Number")
    protected String number;
    @XmlElement(name = "Year")
    @XmlSchemaType(name = "date")
    protected Short year;
    @XmlElement(name = "RegistrationCourt")
    protected Court registrationCourt;

}
