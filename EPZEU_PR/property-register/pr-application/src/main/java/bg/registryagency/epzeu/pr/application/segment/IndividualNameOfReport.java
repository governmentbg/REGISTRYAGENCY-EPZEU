package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Имена
 *
 * <p>Java class for IndividualNameOfReport complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="IndividualNameOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="First" type="{FirstName}FirstName minOccurs="0""/&gt;
 *         &lt;element name="Sur" type="{SurName}SurName" minOccurs="0"/&gt;
 *         &lt;element name="Family" type="{FamilyName}FamilyName" minOccurs="0"/&gt;
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
@XmlType(name = "IndividualNameOfReport", propOrder = {
    "firstName",
    "surName",
    "familyName"
})
public class IndividualNameOfReport {
    @XmlElement(name = "FirstName")
    protected String firstName;
    @XmlElement(name = "SurName")
    protected String surName;
    @XmlElement(name = "FamilyName")
    protected String familyName;

    public IndividualNameOfReport(String firstName, String surName, String familyName) {
        this.firstName = firstName;
        this.surName = surName;
        this.familyName = familyName;
    }
}
