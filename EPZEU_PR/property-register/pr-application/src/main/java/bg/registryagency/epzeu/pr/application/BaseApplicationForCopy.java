package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.ActRequestingACopy;
import bg.registryagency.epzeu.pr.application.segment.ContactData;
import bg.registryagency.epzeu.pr.application.segment.WayOfProvisionBaseData;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

@ToString
@Setter
@NoArgsConstructor
@XmlTransient
public abstract class BaseApplicationForCopy extends BaseApplicationForm {
    protected ActRequestingACopy actRequestingACopy;
    protected WayOfProvisionBaseData wayOfProvision;
    protected ContactData contactData;

    @XmlElement(name = "ActRequestingACopy", required = true)
    public ActRequestingACopy getActRequestingACopy() {
        return actRequestingACopy;
    }
    @XmlElement(name = "WayOfProvision", required = true)
    public WayOfProvisionBaseData getWayOfProvision() {
        return wayOfProvision;
    }
    @XmlElement(name = "ContactData", required = true)
    public ContactData getContactData() {
        return contactData;
    }
}
