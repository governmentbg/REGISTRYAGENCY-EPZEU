package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.ApplicantDataOfReport;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

@Setter
@NoArgsConstructor
@XmlTransient
public abstract class BaseRequestForReport extends BaseApplication {

    protected ApplicantDataOfReport applicantData;

    @XmlElement(name = "ApplicantData", required = true)
    public ApplicantDataOfReport getApplicantData() {
        return applicantData;
    }

    public abstract Object getSubjectOfReport();
}
