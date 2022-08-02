import { F004_Transliteration, withFieldContainer, withFieldRecordContainer, withTextRecordContainer } from 'EPZEU.CR.Domain';

export const F004_TransliterationFieldRecordUI = withFieldRecordContainer(withTextRecordContainer<F004_Transliteration>(), {
    fieldLabelTextKey: "CR_F_4_L",
    fieldLabelFor: (model: F004_Transliteration) => model.text
});

export const F004_TransliterationFieldUI = withFieldContainer(withTextRecordContainer<F004_Transliteration>(), {
    fieldLabelTextKey: "CR_F_4_L",
    fieldLabelFor: (model: F004_Transliteration) => model.text
});