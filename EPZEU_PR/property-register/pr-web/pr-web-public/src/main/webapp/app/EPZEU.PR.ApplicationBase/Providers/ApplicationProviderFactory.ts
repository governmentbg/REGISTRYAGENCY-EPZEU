import { IApplicationProvider } from './';
import { ClientError } from 'Cnsys.Core';
import { resourceManager, ModuleManager } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';

export namespace ApplicationProviderFactory {

  export function getApplicationProvider(appFormType: ApplicationFormTypes): Promise<IApplicationProvider> {
    var providerPromice = getApplicationProviderInternal(appFormType);
    var resourcesPromice = loadApplicationResources();

    return Promise.all([providerPromice, resourcesPromice]).then(result => result[0]);
  }

  export function getApplicationProviderInternal(appFormType: ApplicationFormTypes): Promise<IApplicationProvider> {
    switch (appFormType) {
      case ApplicationFormTypes.ApplicationForCertificateForPerson:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForCertificateForPersonProvider());
        }));
      case ApplicationFormTypes.RequestForReportForDocument:
        return Promise.resolve(import('EPZEU.PR.Applications.Reports').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.GroupReportForDocumentProvider());
        }));
      case ApplicationFormTypes.RequestForReportForAccountProperty:
        return Promise.resolve(import('EPZEU.PR.Applications.Reports').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.GroupReportForAccountPropertyProvider());
        }));
      case ApplicationFormTypes.RequestForReportForPerson:
        return Promise.resolve(import('EPZEU.PR.Applications.Reports').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.GroupReportForPersonProvider());
        }));
      case ApplicationFormTypes.RequestForReportForProperty:
        return Promise.resolve(import('EPZEU.PR.Applications.Reports').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.GroupReportForPropertyProvider());
        }));
      case ApplicationFormTypes.ApplicationForCertificateForProperty:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForCertificateForPropertyProvider());
        }));
      case ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForCertificateForPeriodForPersonProvider());
        }));
      case ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForCertificateForPeriodForPropertyProvider());
        }));
      case ApplicationFormTypes.ApplicationForCertifiedCopy:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForCertifiedCopyProvider());
        }));
      case ApplicationFormTypes.ApplicationForNotCertifiedCopy:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForNotCertifiedCopyProvider());
        }));
      case ApplicationFormTypes.ApplicationForDeclarationOfUpcomingDealWithProperty:
        return Promise.resolve(import('EPZEU.PR.Applications').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ApplicationForUpcomingDealProvider());
        }));
      case ApplicationFormTypes.RequestForReportForPersonInAllRegistryOffices:
        return Promise.resolve(import('EPZEU.PR.Applications.Reports').then(appls => {
          return ModuleManager.registerModule(appls).then(() => new appls.ReportForPersonInAllRegistryOfficesProvider());
        }));
      default:
        throw new ClientError(`Unsupported ApplicationFormType: ${appFormType}.`);
    }
  }

  function loadApplicationResources(): Promise<void> {
    //TODO to think about the division of resource loading
    return resourceManager.loadResourcesByPrefixes([
      'GL',
      'PR'
    ]);
  }
}
