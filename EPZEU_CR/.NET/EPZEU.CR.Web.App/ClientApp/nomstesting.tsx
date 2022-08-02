import 'babel-polyfill';
import 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from "mobx-react";
import { observable, action, runInAction, computed } from "mobx";
import { NomenclaturesDataService } from './EPZEU.Core/Services/NomenclaturesDataService';
import { Nomenclatures } from './EPZEU.Core/Cache/Nomenclatures';
import { Country } from './EPZEU.Core/Models';

@observer class NomsTesting extends React.Component {
    constructor(props: any) {
        super(props);
        this._countries = [];

        this.handleCountriesClick = this.handleCountriesClick.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    }

    @observable private _countries: Country[];

    @action private handleCountriesClick() {

        Nomenclatures.getCountries().then(cc => {

            this._countries = cc;
        });
    }

    @action private handleSearchBoxChange(event: any) {

        const search = event.target.value;

        var namePredicate = function (c: Country) {
            return c.name.toLowerCase().indexOf(search) != -1;
        };

        Nomenclatures.getCountries(namePredicate).then(cc => {

            this._countries = cc;
        });
    }

    render() {

        let c: any = null;

        if (this._countries.length > 0) {
            c = this._countries.map((item: Country, index: number) => {
                return <li key={item.id}>{item.code} {item.name}</li>;
            });
            c = <ul>{c}</ul>;
        }

        return (
            <div>
                <section className='form-group col-3'>
                    <button onClick={this.handleCountriesClick}>Load countries</button>
                    <br />
                    or filter:
                    <input type="text" className='form-control' onChange={this.handleSearchBoxChange} />
                    {c}
                </section>
            </div>
        );
    }
}

ReactDOM.render(<NomsTesting />, document.getElementById('react-app'));