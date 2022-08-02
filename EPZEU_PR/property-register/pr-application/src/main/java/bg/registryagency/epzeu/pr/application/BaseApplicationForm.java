package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.xmldsig.SignatureType;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

@ToString
@Setter
@XmlTransient
public abstract class BaseApplicationForm extends BaseApplication {
    protected SignatureType signature;

    @XmlElement(name = "Signature", namespace = "http://www.w3.org/2000/09/xmldsig#")
    public SignatureType getSignature() {
        return signature;
    }

    public abstract String getApplicantName();
    public abstract String getIdentity();
}
