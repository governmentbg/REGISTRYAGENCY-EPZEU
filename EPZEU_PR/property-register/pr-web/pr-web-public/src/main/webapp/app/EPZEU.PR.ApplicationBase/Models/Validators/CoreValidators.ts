import { ValidatorHelpers } from './ValidatorHelpers';
import { IndentTypes } from "../Enums";

export  namespace CoreValidators{
  export function getIdentType(identity: string): IndentTypes {
    if (identity) {
      if (identity.length == 8 && ValidatorHelpers.validateBirthDate(identity, false)) {
        return IndentTypes.BirthDate;
      } else if (identity.length == 10 && ValidatorHelpers.isValidEGN(identity)) {
        return IndentTypes.EGN;
      } else if (identity.length == 10 && ValidatorHelpers.isValidLNCH(identity)) {
        return IndentTypes.LNCH;
      } else {
        return IndentTypes.Undefined;
      }
    }

    return IndentTypes.Undefined;
  }
}
