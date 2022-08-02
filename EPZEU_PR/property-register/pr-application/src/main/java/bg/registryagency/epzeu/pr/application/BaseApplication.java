package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.GdprAgreement;
import bg.registryagency.epzeu.pr.application.xmldsig.SignatureType;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

@ToString
@Setter
@XmlTransient
public abstract class BaseApplication implements ApplicationForm {
    protected GdprAgreement gdprAgreement;

    @XmlElement(name = "GDPRAgreement")
    public GdprAgreement getGdprAgreement() {
        return gdprAgreement;
    }
}
