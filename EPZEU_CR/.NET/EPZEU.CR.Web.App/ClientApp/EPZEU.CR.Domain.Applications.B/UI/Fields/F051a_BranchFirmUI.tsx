﻿import { withFieldRecordContainer, withTextRecordContainer } from 'EPZEU.CR.Domain';
import { F051a_BranchFirm } from '../../Models/Fields/ModelsAutoGenerated';

export const F051a_BranchFirmFieldUI = withFieldRecordContainer(withTextRecordContainer<F051a_BranchFirm>(), {
    fieldLabelTextKey: "CR_F_51a_L",
    isMandatoryField: true,
    fieldLabelFor: (x: F051a_BranchFirm) => x.text,
})