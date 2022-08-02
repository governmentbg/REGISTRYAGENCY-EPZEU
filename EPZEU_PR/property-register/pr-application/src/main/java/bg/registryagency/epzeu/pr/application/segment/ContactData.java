package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Данни за контакт
 *
 * <p>Java class for ContactData complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="ContactData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="AppEmailAddress" type="{AppEmailAddress}AppEmailAddress"/&gt;
 *         &lt;element name="Phone" type="{Phone}Phone"/&gt;
 *         &lt;element name="Address" type="{Address}Address"/&gt;
 *         &lt;element name="AppEmailAddressee" type="{AppEmailAddressee}AppEmailAddressee"/&gt;
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
@XmlType(name = "ContactData", propOrder = {
    "appEmailAddress",
    "phone",
    "address",
    "appAddressee"
})
public class ContactData {
    @XmlElement(name = "AppEmailAddress", required = true)
    protected String appEmailAddress;
    @XmlElement(name = "Phone", required = true)
    protected String phone;
    @XmlElement(name = "Address")
    protected Address address;
    @XmlElement(name = "AppAddressee")
    protected String appAddressee;

    public ContactData(String appEmailAddress, String phone, Address address, String appAddressee) {
        this.appEmailAddress = appEmailAddress;
        this.phone = phone;
        this.address = address;
        this.appAddressee = appAddressee;
    }
}
