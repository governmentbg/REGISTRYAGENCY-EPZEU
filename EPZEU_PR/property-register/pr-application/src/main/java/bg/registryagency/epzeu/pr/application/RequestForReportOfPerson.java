package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.*;


/**
 * Искане за справка чрез отдалечен достъп за лице от Имотен регистър за избрана служба по вписвания
 * 
 * <p>Java class for RequestForReportOfPersonFromPropertyRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RequestForReportOfPersonFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Person" type="{PersonOfReport}PersonOfReport"/&gt;
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
@XmlRootElement(name = "RequestForReportOfPersonFromPropertyRegister")
@XmlType(name = "RequestForReportOfPersonFromPropertyRegister", propOrder = {
    "person",
    "periodForReport",
    "applicantData",
    "gdprAgreement"
})
public class RequestForReportOfPerson extends BaseRequestForReport {

    protected PersonOfReport person;
    protected PeriodForReport periodForReport;

    @XmlElement(name = "Person", required = true)
    public PersonOfReport getPerson() {
        return person;
    }

    @XmlElement(name = "PeriodForReport", required = true)
    public PeriodForReport getPeriodForReport() {
        return periodForReport;
    }

    @Override
    public Object getSubjectOfReport() {
        return person;
    }
}
