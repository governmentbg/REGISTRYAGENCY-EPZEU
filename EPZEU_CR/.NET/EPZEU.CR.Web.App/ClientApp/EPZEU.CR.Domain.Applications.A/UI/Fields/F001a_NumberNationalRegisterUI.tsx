﻿import { withFieldRecordContainer, withTextRecordContainer } from 'EPZEU.CR.Domain';
import { F001a_NumberNationalRegister } from '../../Models/Fields/ModelsAutoGenerated';

export const F001a_NumberNationalRegisterFieldUI = withFieldRecordContainer(withTextRecordContainer<F001a_NumberNationalRegister>(), {
    fieldLabelTextKey: "CR_F_1a_L",
    fieldLabelFor: (x: F001a_NumberNationalRegister) => x.text,
})