package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Адрес на територията на страната за кореспонденция
 *
 * <p>Java class for Address complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="Address"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Settlement" type="{EKATTE}EKATTE"/&gt;
 *         &lt;element name="Area" type="{EKATTE}EKATTE"/&gt;
 *         &lt;element name="Municipality" type="{EKATTE}EKATTE"/&gt;
 *         &lt;element name="Region" type="{EKATTE}EKATTE"/&gt;
 *         &lt;element name="PostCode" type="{PostCode}PostCode"/&gt;
 *         &lt;element name="Street" type="{Street}Street"/&gt;
 *         &lt;element name="HousingEstate" type="{HousingEstate}HousingEstate"/&gt;
 *         &lt;element name="StreetNumber" type="{StreetNumber}StreetNumber"/&gt;
 *         &lt;element name="Block" type="{Block}Block"/&gt;
 *         &lt;element name="Entrance" type="{Entrance}Entrance"/&gt;
 *         &lt;element name="Floor" type="{Floor}Floor"/&gt;
 *         &lt;element name="Apartment" type="{Apartment}Apartment"/&gt
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
@XmlType(name = "Address", propOrder = {
    "settlement",
    "area",
    "municipality",
    "region",
    "postCode",
    "street",
    "housingEstate",
    "streetNumber",
    "block",
    "entrance",
    "floor",
    "apartment"
})
public class Address {
    @XmlElement(name = "Settlement", required = true)
    protected Ekatte settlement;
    @XmlElement(name = "Area")
    protected Ekatte area;
    @XmlElement(name = "Municipality", required = true)
    protected Ekatte municipality;
    @XmlElement(name = "Region", required = true)
    protected Ekatte region;
    @XmlElement(name = "PostCode", required = true)
    protected Integer postCode;
    @XmlElement(name = "HousingEstate")
    protected String housingEstate;
    @XmlElement(name = "Street")
    protected String street;
    @XmlElement(name = "StreetNumber")
    protected String streetNumber;
    @XmlElement(name = "Block")
    protected String block;
    @XmlElement(name = "Entrance")
    protected String entrance;
    @XmlElement(name = "Floor")
    protected String floor;
    @XmlElement(name = "Apartment")
    protected String apartment;

    public Address(Ekatte settlement, Ekatte area, Ekatte municipality, Ekatte region, Integer postCode, String street, String housingEstate,
                   String streetNumber, String block, String entrance, String floor, String apartment) {
        this.settlement = settlement;
        this.area = area;
        this.municipality = municipality;
        this.region = region;
        this.postCode = postCode;
        this.street = street;
        this.housingEstate = housingEstate;
        this.streetNumber = streetNumber;
        this.block = block;
        this.entrance = entrance;
        this.floor = floor;
        this.apartment = apartment;
    }
}
