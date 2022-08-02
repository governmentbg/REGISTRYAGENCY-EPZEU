import { AsyncUIProps, BaseProps, ViewMode, withAsyncFrame } from 'Cnsys.UI.React';
import { Area, attributesClassFormControl, attributesClassFormControlDisabled, attributesClassFormControlMaxL4, AutoComplete, BG_COUNTRY_ID, Country, DisabledContentContext, EPZEUBaseComponent, Nomenclatures, Settlement, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { Address } from "../Models";

interface AddressProps extends BaseProps, AsyncUIProps {
    disabledCountry?: boolean;
    excludeBGCountry?: boolean;
}

const valSummaryPropNames = ["", "address."];

@observer class AddressImpl extends EPZEUBaseComponent<AddressProps, Address> {
    @observable settlementFull: string = "";
    @observable hasAreas: boolean;

    constructor(props?: any) {
        super(props);

        this.selectSettlement = this.selectSettlement.bind(this);
        this.selectArea = this.selectArea.bind(this);
        this.selectCountry = this.selectCountry.bind(this);

        this.showAreaValue = this.showAreaValue.bind(this);
        this.showSettlementValue = this.showSettlementValue.bind(this);
        this.showCountryValue = this.showCountryValue.bind(this);

        this.handleAreaSelectOption = this.handleAreaSelectOption.bind(this);
        this.handleSettlementSelectOption = this.handleSettlementSelectOption.bind(this);
        this.handleCountrySelectOption = this.handleCountrySelectOption.bind(this);

        this.clearEkkateData = this.clearEkkateData.bind(this);
        this.clearSettlementCtxData = this.clearSettlementCtxData.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
    }

    componentWillMount() {
        this.fillFullSettlement();
    }

    componentDidUpdate() {
        let that = this;

        if (this.model.settlement && this.model.settlement != "" && !this.model.isForeign) {

            this.props.registerAsyncOperation(Nomenclatures.getEkatteAreas(x => x.settlementID == this.model.settlementID).then((areas) => {
                if (areas && areas.length > 0)
                    that.hasAreas = true;
            }));

        } else
            that.hasAreas = false;

        this.fillFullSettlement();
    }

    componentDidMount() {
        if (this.props.viewMode == ViewMode.Edit && !this.model.isForeign) {
            Nomenclatures.getEkatteSettlements();
        }
    }

    renderEdit(): JSX.Element {
        let hasAreas = this.hasAreas;
        let hasSelectedArea = this.model.area && this.model.areaID && this.model.areaEkatte ? true : false;

        return <>
            <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
            <div className="row">
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.country, 'GL_COUNTRY_L')}
                    {this.props.disabledCountry
                        ? this.textBoxFor(m => m.country, attributesClassFormControlDisabled)
                        : <AutoComplete {...this.bind(m => m.country)}
                            selector={this.selectCountry}
                            showValue={this.showCountryValue}
                            handleSelectCallback={this.handleCountrySelectOption}
                            hasSelectedValue={this.model.countryCode && this.model.countryID ? true : false}
                            handleChangeCallback={this.handleCountryChange}
                            triggerLength={1}
                            attributes={attributesClassFormControl}/>
                    }
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.settlement, 'GL_PLACE_L')}
                    {
                        this.model.isForeign
                            ? this.textBoxFor(m => m.foreignPlace)
                            : <><AutoComplete {...this.bind(m => m.settlement)}
                                handleChangeCallback={this.clearSettlementCtxData}
                                selector={this.selectSettlement}
                                showValue={this.showSettlementValue}
                                hasSelectedValue={this.model.settlementID && this.model.settlement && this.model.settlement != "" ? true : false}
                                handleSelectCallback={this.handleSettlementSelectOption}
                                placeholder={this.getResource("GL_FILL_LEAST_THREE_CHAR_L")}
                                attributes={attributesClassFormControl} />
                                <div className="form-text">{this.model.settlementID ? this.settlementFull : null}</div>
                            </>
                    }
                </div>
                <div className="form-group col-sm-4">
                    {this.labelFor(m => m.area, 'GL_AREA_L')}
                    <DisabledContentContext.Consumer>
                        {
                            (hasDisabledContent: boolean) => {
                                return hasAreas && !hasDisabledContent
                                    ? <AutoComplete {...this.bind(m => m.area)}
                                        handleChangeCallback={this.handleAreaChange}
                                        selector={this.selectArea}
                                        showValue={this.showAreaValue}
                                        hasSelectedValue={hasSelectedArea}
                                        handleSelectCallback={this.handleAreaSelectOption}
                                        triggerLength={1}
                                        attributes={attributesClassFormControl} />
                                    : this.textBoxFor(m => m.area, attributesClassFormControlDisabled)
                            }
                        }
                    </DisabledContentContext.Consumer>
                </div>
                {
                    this.model.isForeign
                        ? null
                        : <div className="form-group col-6 col-sm-2">
                            {this.labelFor(m => m.postCode, 'GL_POST_CODE_L')}
                            {this.textBoxFor(m => m.postCode, attributesClassFormControlMaxL4)}
                        </div>
                }
            </div>
            <div className="row">
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.housingEstate, 'GL_RESIDENCE_ABBREVATION_L')}
                    {this.textBoxFor(m => m.housingEstate)}
                </div>
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.street, 'GL_STREET_ABBREVATION_L')}
                    {this.textBoxFor(m => m.street)}
                </div>
            </div>
            <div className="row">
                <div className="form-group col-6 col-sm-2">
                    {this.labelFor(m => m.streetNumber, 'GL_NUMBER_ABBREVATION_L')}
                    {this.textBoxFor(m => m.streetNumber)}
                </div>
                <div className="form-group col-6 col-sm-2">
                    {this.labelFor(m => m.block, 'GL_BUILDING_ABBREVATION_L')}
                    {this.textBoxFor(m => m.block)}
                </div>
                <div className="form-group col-6 col-sm-2">
                    {this.labelFor(m => m.entrance, 'GL_ENTRANCE_ABBREVATION_L')}
                    {this.textBoxFor(m => m.entrance)}
                </div>
                <div className="form-group col-6 col-sm-2">
                    {this.labelFor(m => m.floor, 'GL_FLOOR_ABBREVATION_L')}
                    {this.textBoxFor(m => m.floor)}
                </div>
                <div className="form-group col-6 col-sm-2">
                    {this.labelFor(m => m.apartment, 'GL_FLAT_ABBREVATION_L')}
                    {this.textBoxFor(m => m.apartment)}
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        // тези булеви ни трябват, за да знаем дали да слагаме <br/>
        const hasValueInLine2 = this.model.municipality || this.model.settlement || this.model.district || this.model.foreignPlace || this.model.area || this.model.postCode;
        const hasValueInLine3 = this.model.housingEstate || this.model.street || this.model.block || this.model.entrance || this.model.floor || this.model.apartment

        return <>
            {/*LINE 1 - Държава*/}
            {this.model.country && <>{this.getResource('GL_COUNTRY_L')}: {this.model.country}</>}
            {
                // слагаме <br/> само ако преди това сме render-нали нещо и след това ще render-нем нещо
                (
                    this.model.country &&
                    (hasValueInLine2 || hasValueInLine3)
                )
                && <br />
            }

            {/*LINE 2 - Област, община, населено място, район, пощенски код*/}
            {this.model.foreignPlace && <>{this.getResource('GL_PLACE_L')}: {this.model.foreignPlace}</>}
            {this.model.district && <>{this.getResource('GL_REGION_L')}: {this.model.district}</>}
            {/*дали да сложи запетайка*/(this.model.municipality && this.model.district) && <>, </>}
            {
                this.model.municipality &&
                <>
                    {this.getResource('GL_MUNICIPALITY_L')}: {this.model.municipality}
                </>
            }
            {/*дали да сложи запетайка*/this.model.settlement && <>, </>}
            {this.model.settlement && <>{this.model.settlement}</>}
            {/*дали да сложи запетайка*/this.model.area && <>, </>}
            {this.model.area}
            {/*дали да сложи запетайка*/this.model.postCode && <>, </>}
            {this.model.postCode && <> {this.getResource('GL_POST_CODE_L').toLocaleLowerCase()} {this.model.postCode}</>}
            {
                // слагаме <br/> само ако след последния <br/> сме render-нали нещо и след това ще render-нем нещо
                (hasValueInLine2 && hasValueInLine3)
                && <br />
            }

            {/*LINE 3 - жилищен комплекс, бул./ул, номер, блок, вход, етаж, апартамент*/}

            {
                this.model.housingEstate && <>{this.getResource('GL_RESIDENCE_ABBREVATION_L')} {this.model.housingEstate}</>
            }
            {
                /*дали да сложи запетайка*/
                (this.model.housingEstate && this.model.street) && <>, </>
            }
            {this.model.street && <>{this.getResource('GL_STREET_ABBREVATION_L').toLocaleLowerCase()} {this.model.street} </>}

            {(this.model.street && this.model.streetNumber) && <> <span>№</span> {this.model.streetNumber}</>}
            {
                /*дали да сложи запетайка*/
                ((this.model.street || this.model.housingEstate) && (this.model.block || this.model.entrance || this.model.floor || this.model.apartment)) && <>, </>
            }

            {this.model.block && <>{this.getResource('GL_BUILDING_ABBREVATION_L').toLocaleLowerCase()} {this.model.block}</>}
            {
                /*дали да сложи запетайка*/
                (this.model.block && (this.model.entrance || this.model.floor || this.model.apartment)) && <>, </>
            }

            {this.model.entrance && <>{this.getResource('GL_ENTRANCE_ABBREVATION_L').toLocaleLowerCase()} {this.model.entrance}</>}
            {
                /*дали да сложи запетайка*/
                (this.model.entrance && (this.model.floor || this.model.apartment)) && <>, </>
            }

            {this.model.floor && <>{this.getResource('GL_FLOOR_ABBREVATION_L').toLocaleLowerCase()} {this.model.floor}</>}
            {
                /*дали да сложи запетайка*/
                (this.model.floor && this.model.apartment) && <>, </>
            }

            {this.model.apartment && <>{this.getResource('GL_FLAT_ABBREVATION_L').toLocaleLowerCase()} {this.model.apartment}</>}
        </>
    }

    //#region
    //Country

    selectCountry(value: string): Promise<Country[]> {
        var valueLowerCase = value.toLowerCase();

        if (valueLowerCase.trim() != "") {
            if (this.props.excludeBGCountry)
                return Nomenclatures.getCountries().then(s => s.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) > -1 && s.id != BG_COUNTRY_ID));
            else
                return Nomenclatures.getCountries().then(s => s.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) > -1));
        } else
            return Promise.resolve([]);
    }

    showCountryValue(value: Country): string {
        return value.name;
    }

    @action handleAreaChange() {
        this.model.areaID = null;
        this.model.areaEkatte = null;
    }

    @action handleCountryChange() {
        this.clearEkkateData();
        this.model.countryCode = null;
        this.model.countryID = null;
        this.model.settlement = null;
        this.model.foreignPlace = null;
    }

    @action handleCountrySelectOption(value?: Country) {
        if (value) {
            this.clearEkkateData();
            this.model.country = value.name;
            this.model.countryCode = value.code;
            this.model.countryID = value.id;
        }
    }

    //#endregion

    //#region
    //Settlements

    selectSettlement(value: string): Promise<Settlement[]> {
        var valueLowerCase = value.toLowerCase();
        valueLowerCase = valueLowerCase.replace(/гр.\s+|с.\s+/, "");

        if (valueLowerCase.trim() != "")
            return Nomenclatures.getEkatteSettlements().then(s => s.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) == 0));
        else
            return Promise.resolve([]);
    }

    showSettlementValue(value: Settlement): string {
        return `${this.getResource('GL_REGION_ABBREVATION_L')} ${value.municipality.district.name},  ${this.getResource('GL_MUNICIPALITY_ABBREVATION_L')} ${value.municipality.name} ${value.settlementType + " " + value.name} `;
    }

    @action clearSettlementCtxData() {

        this.model.settlementID = null;
        this.model.settlementEKATTE = null;
        this.model.foreignPlace = null;

        this.model.municipality = null;
        this.model.municipalityid = null;
        this.model.municipalityEkatte = null;

        this.model.district = null;
        this.model.districtID = null;
        this.model.districtEkatte = null;

        this.model.area = null;
        this.model.areaID = null;
        this.model.areaEkatte = null;

        this.hasAreas = false;
        this.model.postCode = null;
        this.settlementFull = "";
    }


    @action clearEkkateData() {

        if (!this.model.country || this.model.country == "") {
            this.model.countryID = null;
            this.model.countryCode = null;
        }

        this.model.settlementID = null;
        this.model.settlementEKATTE = null;

        this.model.municipality = null;
        this.model.municipalityid = null;
        this.model.municipalityEkatte = null;

        this.model.district = null;
        this.model.districtID = null;
        this.model.districtEkatte = null;

        this.model.area = null;
        this.model.areaID = null;
        this.model.areaEkatte = null;

        this.hasAreas = false;
        this.model.postCode = null;
        this.model.housingEstate = null;
        this.model.street = null;
        this.model.streetNumber = null;
        this.model.block = null;
        this.model.entrance = null;
        this.model.floor = null;
        this.model.apartment = null;
        this.settlementFull = "";
    }

    @action handleSettlementSelectOption(value?: Settlement) {
        if (value) {
            this.model.settlement = value.settlementType + " " + value.name;
            this.model.settlementID = value.id;
            this.model.settlementEKATTE = value.ekatteCode;

            this.model.municipality = value.municipality.name;
            this.model.municipalityid = value.municipalityID;
            this.model.municipalityEkatte = value.municipality.ekatteCode;

            this.model.district = value.municipality.district.name;
            this.model.districtID = value.municipality.districtID;
            this.model.districtEkatte = value.municipality.district.ekatteCode;

            this.settlementFull = `${this.getResource('GL_MUNICIPALITY_L')} ${value.municipality.name}, ${this.getResource('GL_REGION_L')} ${value.municipality.district.name}`;
            this.model.area = null;
            this.hasAreas = value.areas && value.areas.length > 0
        } else {
            this.clearSettlementCtxData();
        }
    }

    //#endregion
    //#region
    //Areas

    selectArea(value: string): Promise<Area[]> {
        var valueLowerCase = value.toLowerCase();
        valueLowerCase = valueLowerCase.replace(/р-н\s+/, "");

        if (valueLowerCase.trim() != "")
            return Nomenclatures.getEkatteAreas(s => s.settlementID == this.model.settlementID).then((areas) => areas.filter((area) =>
                (area.name.replace(/р-н\s+/, "").toLowerCase()).indexOf(valueLowerCase) > -1));
        else
            return Promise.resolve([]);
    }

    showAreaValue(value: Area): string {
        return value.name;
    }

    @action handleAreaSelectOption(value?: Area) {
        if (value) {
            this.model.area = value.name;
            this.model.areaID = value.id;
            this.model.areaEkatte = value.ekatteCode;
        } else {
            this.model.area = null;
            this.model.areaID = null;
            this.model.areaEkatte = null;
        }
    }

    //#endregion

    //#region
    //Private helpers

    private fillFullSettlement() {
        if (this.props.viewMode == ViewMode.Edit && this.model.settlementID && !this.model.isForeign && !this.settlementFull) {

            this.props.registerAsyncOperation(Nomenclatures.getEkatteSettlements(x => x.id == this.model.settlementID).then((settlement) => {
                if (settlement && settlement.length) {
                    this.settlementFull = `${this.getResource('GL_MUNICIPALITY_L')} ${settlement[0].municipality.name}, ${this.getResource('GL_REGION_L')} ${settlement[0].municipality.district.name}`;
                }
            }));
        }
    }

    //#endregion
}

export const AddressUI = withAsyncFrame(AddressImpl);