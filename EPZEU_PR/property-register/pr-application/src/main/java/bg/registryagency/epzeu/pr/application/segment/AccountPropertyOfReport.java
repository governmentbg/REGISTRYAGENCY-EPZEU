package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Данни за имотна партида обект на справка
 *
 * <p>Java class for AccountPropertyOfReport complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="AccountPropertyOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="AccountPropertyId" type="{AccountPropertyId}AccountPropertyId"/&gt;
 *         &lt;element name="PropertyId" type="{PropertyId}PropertyId"/&gt;
 *         &lt;element name="RegistryOffice" type="{RegistryOffice}RegistryOffice"/&gt;
 *         &lt;element name="Type" type="{PropertyType}PropertyType"/&gt;
 *         &lt;element name="CountrySide" type="{CountrySide}CountrySide"/&gt;
 *         &lt;element name="Street" type="{Street}Street"/&gt;
 *         &lt;element name="StreetNumber" type="{StreetNumber}StreetNumber"/&gt;
 *         &lt;element name="HousingEstate" type="{HousingEstate}HousingEstate"/&gt;
 *         &lt;element name="District" type="{District}District"/&gt;
 *         &lt;element name="Block" type="{Block}Block"/&gt;
 *         &lt;element name="Entrance" type="{Entrance}Entrance"/&gt;
 *         &lt;element name="Floor" type="{Floor}Floor"/&gt;
 *         &lt;element name="Apartment" type="{Apartment}Apartment"/&gt;
 *         &lt;element name="Settlement" type="{Place}Place"/&gt;
 *         &lt;element name="Municipality" type="{Place}Place"/&gt;
 *         &lt;element name="Area" type="{Place}Place"/&gt;
 *         &lt;element name="CadastralId" type="{CadastralId}CadastralId"/&gt;
 *         &lt;element name="CadastreNumber" type="{CadastreNumber}CadastreNumber"/&gt;
 *         &lt;element name="RegulatedNeighborhood" type="{RegulatedNeighborhood}RegulatedNeighborhood"/&gt;
 *         &lt;element name="Plot" type="{Plot}Plot"/&gt;
 *         &lt;element name="Remark" type="{Remark}Remark"/&gt;
 *         &lt;element name="AccountNumber" type="{AccountNumber}AccountNumber"/&gt;
 *         &lt;element name="AreaByDocuments" type="{AreaByDocuments}AreaByDocuments"/&gt;
 *         &lt;element name="OldAccountNumber" type="{AccountNumber}AccountNumber"/&gt;
 *         &lt;element name="PermanentUsage" type="{PermanentUsage}PermanentUsage"/&gt;
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
@XmlType(name = "AccountPropertyOfReport", propOrder = {
    "accountPropertyId",
    "propertyId",
    "registryOffice",
    "type",
    "countrySide",
    "street",
    "streetNumber",
    "housingEstate",
    "district",
    "block",
    "entrance",
    "floor",
    "apartment",
    "settlement",
    "municipality",
    "area",
    "cadastralId",
    "cadastreNumber",
    "regulatedNeighborhood",
    "plot",
    "propertyRemark",
    "accountNumber",
    "areaByDocuments",
    "oldAccountNumber",
    "permanentUsage"
})
public class AccountPropertyOfReport {
    /** Идентификатор на имотна партида */
    @XmlElement(name = "AccountPropertyId", required = true)
    protected String accountPropertyId;
    /** Идентификатор на имот */
    @XmlElement(name = "PropertyId", required = true)
    protected String propertyId;
    /** Идентификатор на служба по вписвания */
    @XmlElement(name = "RegistryOffice", required = true)
    protected RegistryOffice registryOffice;
    /** Вид на имот */
    @XmlElement(name = "Type", required = true)
    protected PropertyType type;
    /** Местност */
    @XmlElement(name = "CountrySide")
    protected String countrySide;
    /** Улица */
    @XmlElement(name = "Street")
    protected String street;
    /** Номер на улица */
    @XmlElement(name = "StreetNumber")
    protected String streetNumber;
    /** ж.к. */
    @XmlElement(name = "HousingEstate")
    protected String housingEstate;
    /** Квартал */
    @XmlElement(name = "District")
    protected String district;
    /** Блок */
    @XmlElement(name = "Block")
    protected String block;
    /** Вход */
    @XmlElement(name = "Entrance")
    protected String entrance;
    /** Етаж */
    @XmlElement(name = "Floor")
    protected String floor;
    /** Апартамент */
    @XmlElement(name = "Apartment")
    protected String apartment;
    /** Населено място */
    @XmlElement(name = "Settlement")
    protected PlaceNomenclaturePr settlement;
    /** Община */
    @XmlElement(name = "Municipality")
    protected PlaceNomenclaturePr municipality;
    /** Област */
    @XmlElement(name = "Area")
    protected PlaceNomenclaturePr area;
    /** Кадастрален идентификатор */
    @XmlElement(name = "CadastralId")
    protected String cadastralId;
    /** Планоснимачен номер */
    @XmlElement(name = "CadastreNumber")
    protected String cadastreNumber;
    /** Квартал, попадащ в регулация */
    @XmlElement(name = "RegulatedNeighborhood")
    protected String regulatedNeighborhood;
    /** Парцел */
    @XmlElement(name = "Plot")
    protected String plot;
    /** Забележка */
    @XmlElement(name = "Remark")
    protected String propertyRemark;
    /** Номер на електронна партида */
    @XmlElement(name = "AccountNumber")
    protected String accountNumber;
    /** Площ по документи */
    @XmlElement(name = "AreaByDocuments")
    protected Float areaByDocuments;
    /** Номер на стара имотна партида */
    @XmlElement(name = "OldAccountNumber")
    protected String oldAccountNumber;
    /** Начин на трайно ползване */
    @XmlElement(name = "PermanentUsage")
    protected PermanentUsage permanentUsage;
}
