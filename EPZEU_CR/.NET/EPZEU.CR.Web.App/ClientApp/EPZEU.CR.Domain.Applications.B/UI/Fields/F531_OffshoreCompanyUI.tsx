﻿import { withFieldRecordContainer, withTextRecordContainer } from 'EPZEU.CR.Domain';
import { F531_OffshoreCompany } from '../../Models/Fields/ModelsAutoGenerated'

export const F531_OffshoreCompanyFieldUI = withFieldRecordContainer(withTextRecordContainer<F531_OffshoreCompany>(), {
    fieldLabelTextKey: "CR_F_531_L",
    isMandatoryField: true,
    fieldLabelFor: (x: F531_OffshoreCompany) => x.text,
})