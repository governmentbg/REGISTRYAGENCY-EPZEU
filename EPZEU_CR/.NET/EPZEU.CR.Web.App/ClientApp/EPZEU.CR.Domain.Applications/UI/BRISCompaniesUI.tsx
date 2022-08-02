import * as React from "react";
import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ListItemsContainerProps, PersonTypes, PersonUI, withSingleItemListContainer } from 'EPZEU.CR.Domain';
import { BRISCompany } from '../Models/BRISModels';

class BRISCompaniesUIImpl extends EPZEUBaseComponent<ListItemsContainerProps, BRISCompany>{

    renderEdit(): JSX.Element {
        return null;
    }

    renderDisplay(): JSX.Element {
        return <>
            {
                this.model && this.model.brisCompanyData != null && this.model.brisCompanyData != undefined && (!ObjectHelper.isStringNullOrEmpty(this.model.brisCompanyData.indent) || !ObjectHelper.isStringNullOrEmpty(this.model.brisCompanyData.nameAndLegalFormText))
                    ? <PersonUI {...this.bind(m => m.brisCompanyData)} PersonType={PersonTypes.TransformingCompany} />
                    : null
            }
        </>
    }
}

export const BRISCompaniesUI = withSingleItemListContainer(BRISCompaniesUIImpl, BRISCompany, {
    addButtonLabelKey: "CR_APP_ADD_COMPANY_L",
    listSelector: m => m.brisCompanyList,
    hasAtLeastOneItem: true,
})