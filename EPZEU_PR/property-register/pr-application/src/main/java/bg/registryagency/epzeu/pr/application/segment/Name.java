package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.StringUtils;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Имена
 *
 * <p>Java class for Name complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="Name"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="First" type="{FirstName}FirstName"/&gt;
 *         &lt;element name="Sur" type="{SurName}SurName" minOccurs="0"/&gt;
 *         &lt;element name="Family" type="{FamilyName}FamilyName"/&gt;
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
@XmlType(name = "Name", propOrder = {
    "firstName",
    "surName",
    "familyName"
})
public class Name {
    @XmlElement(name = "FirstName", required = true)
    protected String firstName;
    @XmlElement(name = "SurName")
    protected String surName;
    @XmlElement(name = "FamilyName", required = true)
    protected String familyName;

    public Name(String firstName, String surName, String familyName) {
        this.firstName = firstName;
        this.surName = surName;
        this.familyName = familyName;
    }

    @Override
    public String toString() {
        if(!StringUtils.isEmpty(surName)) {
            return String.format("%s %s %s", firstName, surName, familyName);
        } else {
            return firstName + " " + familyName;
        }
    }
}
