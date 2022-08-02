package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Данни за заявителя на справка
 *
 * <p>Java class for ApplicantDataOfReport complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="ApplicantDataOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="AuthenticationType" type="{http://www.registryagency.bg/schemas/property-register/values}AuthenticationType"/&gt;
 *         &lt;element name="PersonalIdentifier" type="{http://www.registryagency.bg/schemas/property-register/values}PersonalIdentifier"/&gt;
 *         &lt;element name="Names" type="{http://www.registryagency.bg/schemas/property-register/values}Names"/&gt;
 *         &lt;element name="SerialNumber" type="{http://www.registryagency.bg/schemas/property-register/values}SerialNumber"/&gt;
 *         &lt;element name="Issuer" type="{http://www.registryagency.bg/schemas/property-register/values}Issuer"/&gt;
 *         &lt;element name="CertificateHash" type="{http://www.registryagency.bg/schemas/property-register/values}CertificateHash"/&gt;
 *         &lt;element name="CertificateContent" type="{http://www.registryagency.bg/schemas/property-register/values}CertificateContent"/&gt;
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
@XmlType(name = "ApplicantDataOfReport", propOrder = {
    "authenticationType",
    "personalIdentifier",
    "names",
    "serialNumber",
    "issuer",
    "certificateHash",
    "certificateContent"
})
public class ApplicantDataOfReport {
    @XmlElement(name = "AuthenticationType", required = true)
    protected int authenticationType;
    @XmlElement(name = "PersonalIdentifier", required = true)
    protected String personalIdentifier;
    @XmlElement(name = "Names")
    protected String names;
    @XmlElement(name = "SerialNumber", required = true)
    protected String serialNumber;
    @XmlElement(name = "Issuer", required = true)
    protected String issuer;
    @XmlElement(name = "CertificateHash")
    protected String certificateHash;
    @XmlElement(name = "CertificateContent")
    protected byte[] certificateContent;
}
