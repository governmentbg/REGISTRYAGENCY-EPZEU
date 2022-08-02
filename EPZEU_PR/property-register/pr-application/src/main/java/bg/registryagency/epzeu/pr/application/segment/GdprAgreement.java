package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Информирано съгласие за предоставяне на лични данни при подаване на заявление
 * 
 * <p>Java class for GdprAgreement complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GDPRAgreement"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="GDPRAgreementText" type="{GDPRAgreementText}GDPRAgreementText" /&gt;
 *         &lt;element name="GDPRAgreementAcceptance" type="{GDPRAgreementAcceptance}GDPRAgreementAcceptance" /&gt;
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
@XmlType(name = "GDPRAgreement", propOrder = {
    "gdprAgreementText",
    "gdprAgreementAcceptance"
})
public class GdprAgreement {

    @XmlElement(name = "GDPRAgreementText")
    protected String gdprAgreementText;
    @XmlElement(name = "GDPRAgreementAcceptance")
    protected Boolean gdprAgreementAcceptance;
}
