package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.ApplicantDataOfReport;
import bg.registryagency.epzeu.pr.application.segment.DocumentOfReport;
import bg.registryagency.epzeu.pr.application.segment.PeriodForReport;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.*;

/**
 * Искане за справка чрез отдалечен достъп за документ от Имотен регистър
 *
 * <p>Java class for RequestForReportOfDocumentFromPropertyRegister complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="RequestForReportOfDocumentFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Document" type="{DocumentOfReport}DocumentOfReport"/&gt;
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
@XmlRootElement(name = "RequestForReportOfDocumentFromPropertyRegister")
@XmlType(name = "RequestForReportOfDocumentFromPropertyRegister", propOrder = {
    "document",
    "applicantData",
    "gdprAgreement"
})
public class RequestForReportOfDocument extends BaseRequestForReport {

    protected DocumentOfReport document;

    @XmlElement(name = "Document", required = true)
    public DocumentOfReport getDocument() {
        return document;
    }

    @Override
    public Object getSubjectOfReport() {
        return document;
    }
}
