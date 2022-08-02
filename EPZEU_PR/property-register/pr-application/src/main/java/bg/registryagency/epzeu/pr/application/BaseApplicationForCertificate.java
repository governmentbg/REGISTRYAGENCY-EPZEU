package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.provider.DocumentAttachable;
import bg.registryagency.epzeu.pr.application.segment.*;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;

@ToString
@Setter
@NoArgsConstructor
@XmlTransient
public abstract class BaseApplicationForCertificate extends BaseApplicationForm implements DocumentAttachable {

    //Whether application is first application or for fixing of errors
    protected ApplicationContentType applicationContentType;
    protected InitialApplicationData initialApplicationData;
    protected Individual applicantData;
    protected WayOfProvision wayOfProvision;
    protected ContactData contactData;
    protected List<AttachedDocument> attachedDocuments;

    @XmlElement(name = "ApplicationType", required = true)
    @XmlSchemaType(name = "string")
    public ApplicationContentType getApplicationContentType() {
        return applicationContentType;
    }

    @XmlElement(name = "InitialApplicationData")
    public InitialApplicationData getInitialApplicationData() {
        return initialApplicationData;
    }
    @XmlElement(name = "ApplicantData", required = true)
    public Individual getApplicantData() {
        return applicantData;
    }
    @XmlElement(name = "WayOfProvision", required = true)
    public WayOfProvision getWayOfProvision() {
        return wayOfProvision;
    }
    @XmlElement(name = "ContactData", required = true)
    public ContactData getContactData() {
        return contactData;
    }
    @Override
    @XmlElementWrapper(name = "AttachedDocuments")
    @XmlElement(name = "AttachedDocument", namespace = "http://www.registryagency.bg/schemas/property-register/segments")
    public List<AttachedDocument> getAttachedDocuments() {
        return attachedDocuments;
    }
}
