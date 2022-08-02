package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.ApplicantDataOfReport;
import bg.registryagency.epzeu.pr.application.segment.PeriodForReport;
import bg.registryagency.epzeu.pr.application.segment.PropertyOfReport;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.*;

/**
 * Искане за справка чрез отдалечен достъп за имот от Имотен регистър
 *
 * <p>Java class for RequestForReportOfPropertyFromPropertyRegister complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="RequestForReportOfPropertyFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Property" type="{PropertyOfReport}PropertyOfReport"/&gt;
 *         &lt;element name="PeriodForReport" type="{PeriodForReport}PeriodForReport"/&gt;
 *         &lt;element name="ApplicantDataOfReport" type="{ApplicantDataOfReport}ApplicantDataOfReport"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@Setter
@NoArgsConstructor
@ToString(callSuper=true)
@XmlRootElement(name = "RequestForReportOfPropertyFromPropertyRegister")
@XmlType(name = "RequestForReportOfPropertyFromPropertyRegister", propOrder = {
    "property",
    "periodForReport",
    "applicantData",
    "gdprAgreement"
})
public class RequestForReportOfProperty extends BaseRequestForReport {

    protected PropertyOfReport property;
    protected PeriodForReport periodForReport;

    @XmlElement(name = "Property", required = true)
    public PropertyOfReport getProperty() {
        return property;
    }
    @XmlElement(name = "PeriodForReport", required = true)
    public PeriodForReport getPeriodForReport() {
        return periodForReport;
    }

    @Override
    public Object getSubjectOfReport() {
        return property;
    }
}
