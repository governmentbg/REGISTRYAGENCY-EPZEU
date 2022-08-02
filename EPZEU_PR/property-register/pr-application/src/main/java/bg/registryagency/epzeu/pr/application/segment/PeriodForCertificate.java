package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;


/**
 * Период от време за издаване на удостоверение
 * 
 * <p>Java class for PeriodForCertificate complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PeriodForCertificate"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="PeriodForReport" type="{PeriodForReport}PeriodForReport"/&gt;
 *         &lt;element name="ExpectedRegistrationDate" type="{ExpectedRegistrationDate}ExpectedRegistrationDate"/&gt;
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
@XmlType(name = "PeriodForCertificate", propOrder = {
    "periodForReport",
    "expectedRegistrationDate"
})
public class PeriodForCertificate {

    @XmlElement(name = "PeriodForReport", required = true)
    protected PeriodForReport periodForReport;
    @XmlElement(name = "ExpectedRegistrationDate", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    protected LocalDate expectedRegistrationDate;

}
