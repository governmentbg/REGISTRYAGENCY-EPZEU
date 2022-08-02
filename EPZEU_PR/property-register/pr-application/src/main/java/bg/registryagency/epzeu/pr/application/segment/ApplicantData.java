package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Данни за заявителя
 *
 * <p>Java class for ApplicantData complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="ApplicantData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Individual" type="{Individual}Individual"/&gt;
 *         &lt;element name="ApplicantType" type="{ApplicantType}ApplicantType"/&gt;
 *         &lt;element name="ApplicantCategory" type="{ApplicantCategory}ApplicantCategory"/&gt;
 *         &lt;element name="DataForAnOfficial" type="{DataForAnOfficial}DataForAnOfficial" minOccurs="0"/&gt;
 *         &lt;element name="SpecialAccessType" type="{SpecialAccessType}SpecialAccessType" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@Getter
@Setter
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ApplicantData", propOrder = {
    "individual",
    "applicantType",
    "applicantCategory",
    "dataForAnOfficial",
    "specialAccessType"
})
public class ApplicantData {
    @XmlElement(name = "Individual", required = true)
    protected Individual individual;
    @XmlElement(name = "ApplicantType", required = true)
    @XmlSchemaType(name = "string")
    protected ApplicantTypeNomenclature applicantType;
    @XmlElement(name = "ApplicantCategory", required = true)
    protected ApplicantCategory applicantCategory;
    @XmlElement(name = "DataForAnOfficial")
    protected String dataForAnOfficial;
    @XmlElement(name = "SpecialAccessType")
    protected String specialAccessType;

    /**
     * <p>Java class for ApplicantTypeNomenclature.
     *
     * <p>The following schema fragment specifies the expected content contained within this class.
     * <p>
     * <pre>
     * &lt;simpleType name="ApplicantTypeNomenclature"&gt;
     *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&gt;
     *     &lt;enumeration value="PERSONAL_QUALITY"/&gt;
     *     &lt;enumeration value="ATTORNEY"/&gt;
     *     &lt;enumeration value="LEGAL_REPRESENTATIVE"/&gt;
     *     &lt;enumeration value="OFFICIAL_PERSON"/&gt;
     *   &lt;/restriction&gt;
     * &lt;/simpleType&gt;
     * </pre>
     */
    @Getter
    @XmlType(name = "ApplicantTypeNomenclature", namespace = "http://www.registryagency.bg/schemas/property-register/nomenclatures")
    @XmlEnum
    public enum ApplicantTypeNomenclature {
        @XmlEnumValue("PERSONAL_QUALITY")
        PERSONAL_QUALITY(1),
        @XmlEnumValue("ATTORNEY")
        ATTORNEY(2),
        @XmlEnumValue("LEGAL_REPRESENTATIVE")
        LEGAL_REPRESENTATIVE(3),
        @XmlEnumValue("OFFICIAL_PERSON")
        OFFICIAL_PERSON(4);

        final static Map<Integer, ApplicantTypeNomenclature> types = new HashMap<>();

        static {
            types.put(PERSONAL_QUALITY.id, PERSONAL_QUALITY);
            types.put(ATTORNEY.id, ATTORNEY);
            types.put(LEGAL_REPRESENTATIVE.id, LEGAL_REPRESENTATIVE);
            types.put(OFFICIAL_PERSON.id, OFFICIAL_PERSON);
        }

        private int id;

        ApplicantTypeNomenclature(int id) {
            this.id = id;
        }

        public static ApplicantTypeNomenclature fromInteger(int id) {
            ApplicantTypeNomenclature type = types.get(id);

            if (type == null) {
                throw new EnumConstantNotPresentException(ApplicantTypeNomenclature.class, Integer.toString(id));
            }

            return type;
        }
    }

    public ApplicantData(Individual individual) {
        this.individual = individual;
    }
}
