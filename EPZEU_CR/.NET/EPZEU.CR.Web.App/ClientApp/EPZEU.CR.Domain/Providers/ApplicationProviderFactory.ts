import { ClientError } from 'Cnsys.Core';
import { ModuleManager, resourceManager } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { IApplicationProvider } from '../';

export namespace ApplicationProviderFactory {

    export function getApplicationProvider(applType: ApplicationFormTypes): Promise<IApplicationProvider> {
        var providerPromice = getApplicationProviderInternal(applType);
        var resourcesPromice = loadApplicationResources();

        return Promise.all([providerPromice, resourcesPromice]).then(result => result[0]);
    }

    function getApplicationProviderInternal(applType: ApplicationFormTypes): Promise<IApplicationProvider> {
        switch (applType) {
            case ApplicationFormTypes.A1:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A1Provider());
                }));
            case ApplicationFormTypes.A2:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A2Provider());
                }));
            case ApplicationFormTypes.A3:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A3Provider());
                }));
            case ApplicationFormTypes.A4:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A4Provider());
                }));
            case ApplicationFormTypes.A5:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A5Provider());
                }));
            case ApplicationFormTypes.A6:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A6Provider());
                }));
            case ApplicationFormTypes.A7:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A7Provider());
                }));
            case ApplicationFormTypes.A8:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A8Provider());
                }));
            case ApplicationFormTypes.A9:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A9Provider());
                }));
            case ApplicationFormTypes.A10:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A10Provider());
                }));
            case ApplicationFormTypes.A11:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A11Provider());
                }));
            case ApplicationFormTypes.A12:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A12Provider());
                }));
            case ApplicationFormTypes.A13:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A13Provider());
                }));
            case ApplicationFormTypes.A14:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A14Provider());
                }));
            case ApplicationFormTypes.A15:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A15Provider());
                }));
            case ApplicationFormTypes.A16:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A16Provider());
                }));
            case ApplicationFormTypes.A17:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A17Provider());
                }));
            case ApplicationFormTypes.A18:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsA" */ 'EPZEU.CR.Domain.Applications.A').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.A18Provider());
                }));
            case ApplicationFormTypes.B1:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B1Provider());
                }));
            case ApplicationFormTypes.B2:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B2Provider());
                }));
            case ApplicationFormTypes.B3:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B3Provider());
                }));
            case ApplicationFormTypes.B4:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B4Provider());
                }));
            case ApplicationFormTypes.B5:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B5Provider());
                }));
            case ApplicationFormTypes.B6:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B6Provider());
                }));
            case ApplicationFormTypes.B7:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsB" */ 'EPZEU.CR.Domain.Applications.B').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.B7Provider());
                }));
            case ApplicationFormTypes.D1:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.D1Provider());
                }));
            case ApplicationFormTypes.E1:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.E1Provider());
                }));
            case ApplicationFormTypes.J1:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.J1Provider());
                }));
            case ApplicationFormTypes.G1:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsG" */ 'EPZEU.CR.Domain.Applications.G').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.G1Provider());
                }));
            case ApplicationFormTypes.G2:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsG" */ 'EPZEU.CR.Domain.Applications.G').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.G2Provider());
                }));
            case ApplicationFormTypes.G3:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsG" */ 'EPZEU.CR.Domain.Applications.G').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.G3Provider());
                }));
            case ApplicationFormTypes.V1:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V1Provider());
                }));
            case ApplicationFormTypes.V21:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V21Provider());
                }));
            case ApplicationFormTypes.V22:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V22Provider());
                }));
            case ApplicationFormTypes.V23:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V23Provider());
                }));
            case ApplicationFormTypes.V24:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V24Provider());
                }));
            case ApplicationFormTypes.V25:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V25Provider());
                }));
            case ApplicationFormTypes.V26:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V26Provider());
                }));
            case ApplicationFormTypes.V31:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V31Provider());
                }));
            case ApplicationFormTypes.V32:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V32Provider());
                }));
            case ApplicationFormTypes.V33:
                return Promise.resolve(import(/* webpackChunkName: "ApplicationsV" */ 'EPZEU.CR.Domain.Applications.V').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.V33Provider());
                }));
            case ApplicationFormTypes.Complaint:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppealRefusalProvider());
                }));
            case ApplicationFormTypes.ActOfContestation:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.ActOfContestationProvider());
                }));
            case ApplicationFormTypes.AppointingExpert:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandProvider());
                }));
            case ApplicationFormTypes.RequestForCorrection:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.IncomingRequestForCorrectionProvider());
                }));
            case ApplicationFormTypes.AppointingDeclaration:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingDeclaration));
                }));
            case ApplicationFormTypes.AppointingReportAndExamination:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingReportAndExamination));
                }));
            case ApplicationFormTypes.AppointingRequestForCorrection:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingRequestForCorrection));
                }));
            case ApplicationFormTypes.AppointingControllerReward:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingControllerReward));
                }));
            case ApplicationFormTypes.AppointingReleaseDeposit:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingReleaseDeposit));
                }));
            case ApplicationFormTypes.AppointingChangeRequest:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingChangeRequest));
                }));
            case ApplicationFormTypes.ReleaseAppointingExpert:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.ReleaseAppointingExpert));
                }));
            case ApplicationFormTypes.AppointingPaidDeposit:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingPaidDeposit));
                }));
            case ApplicationFormTypes.AttitudeOfChangeRequest:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AttitudeOfChangeRequest));
                }));
            case ApplicationFormTypes.NotificationOfLackOfMeans:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.NotificationOfLackOfMeans));
                }));
            case ApplicationFormTypes.AppointingContactAddressChange:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.AppointingContactAddressChange));
                }));
            case ApplicationFormTypes.NotificationOfExaminationImpossibility:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.AppointingDemandDocumentsProvider(ApplicationFormTypes.NotificationOfExaminationImpossibility));
                }));
            case ApplicationFormTypes.CertificateForReserveFirm:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateForReservedCompanyProvider());
                }));
            case ApplicationFormTypes.ActualStateCertificate:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateProvider(ApplicationFormTypes.ActualStateCertificate));
                }));
            case ApplicationFormTypes.EntryByPeriodCertificate:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateProvider(ApplicationFormTypes.EntryByPeriodCertificate));
                }));
            case ApplicationFormTypes.PublicationByPeriodCertificate:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateProvider(ApplicationFormTypes.PublicationByPeriodCertificate));
                }));
            case ApplicationFormTypes.EnteredCircumstancesCertificate:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateProvider(ApplicationFormTypes.EnteredCircumstancesCertificate));
                }));
            case ApplicationFormTypes.ActOrCopyOfActCertificate:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateProvider(ApplicationFormTypes.ActOrCopyOfActCertificate));
                }));
            case ApplicationFormTypes.MissingActsCertificate:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.RequestForCertificateProvider(ApplicationFormTypes.MissingActsCertificate));
                }));
            case ApplicationFormTypes.BRISBranchDisclosureReceptionMessage:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.BRISBranchDisclosureReceptionMessageProvider());
                }));
            case ApplicationFormTypes.BRISCrossborderMergeReceptionMessage:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.BRISCrossborderMergeReceptionMessageProvider());
                }));
            case ApplicationFormTypes.BRISChangeCompanyEUIDReceptionMessage:
                return Promise.resolve(import(/* webpackChunkName: "Applications" */ 'EPZEU.CR.Domain.Applications').then(appls => {
                    return ModuleManager.registerModule(appls).then(() => new appls.BRISChangeCompanyEUIDReceptionMessageProvider());
                }));
            default:
                throw new ClientError(`Unsupported ApplicationType: ${applType}.`);
        }
    }

    function loadApplicationResources(): Promise<void> {
        return resourceManager.loadResourcesByPrefixes([
            'CR_APP',
            'CR_F'
        ]);
    }
}