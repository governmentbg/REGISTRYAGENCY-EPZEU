package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.AccountPropertyOfReport;
import bg.registryagency.epzeu.pr.application.segment.PropertyOfReport;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.*;

/**
 * Искане за справка чрез отдалечен достъп за електронна партида от Имотен регистър
 *
 * <p>Java class for RequestForReportOfAccountPropertyFromPropertyRegister complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="RequestForReportOfAccountPropertyFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Property" type="{PropertyOfReport}PropertyOfReport"/&gt;
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
@XmlRootElement(name = "RequestForReportOfAccountPropertyFromPropertyRegister")
@XmlType(name = "RequestForReportOfAccountPropertyFromPropertyRegister", propOrder = {
    "accountProperty",
    "applicantData",
    "gdprAgreement"
})
public class RequestForReportOfAccountProperty extends BaseRequestForReport {

    protected AccountPropertyOfReport accountProperty;

    @XmlElement(name = "AccountProperty", required = true)
    public AccountPropertyOfReport getAccountProperty() {
        return accountProperty;
    }

    @Override
    public Object getSubjectOfReport() {
        return accountProperty;
    }
}
