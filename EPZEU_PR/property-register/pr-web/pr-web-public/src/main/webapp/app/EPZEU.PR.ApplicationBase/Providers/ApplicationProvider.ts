import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { BaseProps } from "Cnsys.UI.React";
import { IApplicationFormManager, ApplicationFormBase, ApplicationCreateRequest } from '../';
import { ApplicationFormBaseValidator } from '../Models/Validators/ApplicationFormBaseValidator';

export interface MenuNavItem {
  label: string;
  sectionName: string;
  anchor?: string;
  readonly?: boolean;
}

export interface IApplicationProvider {
  getUIComponentType(): any;
  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[];
  getApplicationManager(): IApplicationFormManager;
  getValidator(): ApplicationFormBaseValidator<ApplicationFormBase>;
  appFormType: ApplicationFormTypes;
  getStartUIComponentType(): any;
}

export interface StartUIProps extends BaseProps {
  onCreateApplicationProcess: (createRequest: ApplicationCreateRequest) => Promise<void>;
  errorMessages: any;
  appFormType: ApplicationFormTypes;
}
