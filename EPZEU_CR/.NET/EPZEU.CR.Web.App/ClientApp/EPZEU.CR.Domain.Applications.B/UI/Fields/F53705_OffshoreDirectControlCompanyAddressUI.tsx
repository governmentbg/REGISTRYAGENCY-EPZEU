﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { AddressUI, ContactsUI, FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F53705_OffshoreDirectControlCompanyAddress } from '../../Models/Fields/ModelsAutoGenerated';

class F53705_OffshoreDirectControlCompanyAddressUI extends EPZEUBaseComponent<FieldContainerProps, F53705_OffshoreDirectControlCompanyAddress> {

    renderEdit(): JSX.Element {
        return (<>
                <div className="row">
                    <div className="form-group col">
                        <AddressUI {...this.bind(m => m.address)} />
                        <ContactsUI {...this.bind(m => m.contacts)} />
                    </div>
                </div>
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<>
            <AddressUI {...this.bind(m => m.address)} />
            <ContactsUI {...this.bind(m => m.contacts)} />
        </>
        );
    }
}

export const F53705_OffshoreDirectControlCompanyAddressFieldUI = withFieldRecordContainer(F53705_OffshoreDirectControlCompanyAddressUI, {

});