import { EPZEUBaseValidator } from 'EPZEU.Core';
import { ApplicationFormBase } from '../ApplicationFormBase';
import { IApplicationFormValidationContext } from './ApplicationFormValidationContext';

export class ApplicationFormBaseValidator<TApplication extends ApplicationFormBase> extends EPZEUBaseValidator<TApplication, IApplicationFormValidationContext> {  
}
