package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;

/**
 * Вид лице
 *
 * <p>Java class for Person complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="Person"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="PersonType" type="{PersonType}PersonType"/&gt;
 *         &lt;choice&gt;
 *           &lt;element name="Individual" type="{Individual}Individual"/&gt;
 *           &lt;element name="LegalEntity" type="{LegalEntity}LegalEntity"/&gt;
 *         &lt;/choice&gt;
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
@XmlType(name = "Person", propOrder = {
    "type",
    "individual",
    "legalEntity"
})
public class Person {
    @XmlElement(name = "Type", required = true)
    @XmlSchemaType(name = "string")
    protected PropertyRegisterPersonTypeNomenclature type;
    @XmlElement(name = "Individual")
    protected Individual individual;
    @XmlElement(name = "LegalEntity")
    protected LegalEntity legalEntity;

    /**
     * Property Register nomenclature which map Person types from Property Register back office.
     */
    @Getter
    @XmlType(name = "PropertyRegisterPersonTypeNomenclature")
    @XmlEnum
    public enum PropertyRegisterPersonTypeNomenclature {
        @XmlEnumValue("10000500000000000015")
        INDIVIDUAL,
        @XmlEnumValue("10000500000000000020")
        FOREIGN_PERSON_WITHOUT_LNCH,
        @XmlEnumValue("10000500000000000019")
        FOREIGN_PERSON_WITH_LNCH,
        @XmlEnumValue("10000500000000000017")
        LEGAL_ENTITY,
        @XmlEnumValue("10000500000000000018")
        LEGAL_ENTITY_WITHOUT_ID
    }
}
