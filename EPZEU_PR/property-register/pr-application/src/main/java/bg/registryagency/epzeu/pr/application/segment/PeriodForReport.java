package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.DateAdapter;
import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;


/**
 * Период на справка
 * 
 * <p>Java class for PeriodForReport complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PeriodForReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="StartDate" type="{ReportDate}ReportDate"/&gt;
 *         &lt;element name="EndDate" type="{ReportDate}ReportDate"/&gt;
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
@XmlType(name = "PeriodForReport", propOrder = {
    "startDate",
    "endDate"
})
public class PeriodForReport {

    @XmlElement(name = "StartDate",  required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    protected LocalDate startDate;
    @XmlElement(name = "EndDate", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    protected LocalDate endDate;

    public PeriodForReport(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
