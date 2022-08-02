import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core'
import { withFieldRecordContainer, FieldContainerProps, AddressUI, ContactsUI, F005_Seat, SectionInfoUI } from 'EPZEU.CR.Domain';

interface F005_SeatUIProps extends FieldContainerProps {
    enabledCountry?: boolean;
}

class F005_SeatUI extends EPZEUBaseComponent<F005_SeatUIProps, F005_Seat> {

    constructor(props?: F005_SeatUIProps) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return <>           
            <AddressUI {...this.bind(m => m.address)} disabledCountry={!this.props.enabledCountry} />
            <ContactsUI {...this.bind(m => m.contacts)} />
        </>
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <AddressUI {...this.bind(m => m.address)} disabledCountry={!this.props.enabledCountry} />
                <ContactsUI {...this.bind(m => m.contacts)} />
            </>);
    }
}

export const F005_SeatFieldUI = withFieldRecordContainer(F005_SeatUI,
    {
        fieldLabelTextKey: "CR_F_5_L",
        isMandatoryField: true
    });