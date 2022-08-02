using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using StructureMap;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class ApplicationValidatorRegistry : Registry
    {
        public ApplicationValidatorRegistry()
        {
            #region A

            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A1>>(ApplicationFormTypes.A1.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A1)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A2>>(ApplicationFormTypes.A2.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A2)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A3>>(ApplicationFormTypes.A3.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A3)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A4>>(ApplicationFormTypes.A4.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A4)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A5>>(ApplicationFormTypes.A5.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A5)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A6>>(ApplicationFormTypes.A6.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A6)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A7>>(ApplicationFormTypes.A7.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A7)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A8>>(ApplicationFormTypes.A8.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A8)app).Fields.ClosureBranchOfForeignTrader }, new List<Func<RecordField, bool>> { f => ((F028_ClosureBranchOfForeignTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A9>>(ApplicationFormTypes.A9.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A9)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A10>>(ApplicationFormTypes.A10.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A10)app).Fields.AddemptionOfTrader, app => ((A10)app).Fields.AddemptionOfTraderSeatChange }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked, f => ((F027a_AddemptionOfTraderSeatChange)f).IsTraderAddempted });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A11>>(ApplicationFormTypes.A11.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A11)app).Fields.AddemptionOfEUIE }, new List<Func<RecordField, bool>> { f => ((F028a_AddemptionOfEUIE)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A12>>(ApplicationFormTypes.A12.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A12)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A13>>(ApplicationFormTypes.A13.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A13)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A14>>(ApplicationFormTypes.A14.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A14)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027v_AddemptionOfTraderEraseForeignTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A15>>(ApplicationFormTypes.A15.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A15)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A16>>(ApplicationFormTypes.A16.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A16)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A17>>(ApplicationFormTypes.A17.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A17)app).Fields.AddemptionOfTrader }, new List<Func<RecordField, bool>> { f => ((F027_AddemptionOfTrader)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<A18>>(ApplicationFormTypes.A18.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((A18)app).Fields.ClosureBranchOfForeignTrader }, new List<Func<RecordField, bool>> { f => ((F028_ClosureBranchOfForeignTrader)f).Cheked });

            #endregion

            #region B

            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B1>>(ApplicationFormTypes.B1.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((B1)app).Fields.EraseProcura }, new List<Func<RecordField, bool>> { f => ((F044_EraseProcura)f).Cheked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B2>>(ApplicationFormTypes.B2.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((B2)app).Fields.BranchClosure }, new List<Func<RecordField, bool>> { f => ((F055_BranchClosure)f).Closed });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B3>>(ApplicationFormTypes.B3.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((B3)app).Fields.PledgeAddemption }, new List<Func<RecordField, bool>> { f => ((F225_PledgeAddemption)f).Addempted });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B4>>(ApplicationFormTypes.B4.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((B4)app).Fields.EraseDistraint }, new List<Func<RecordField, bool>> { f => ((F325_EraseDistraint)f).Checked });
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B5>>(ApplicationFormTypes.B5.ToString());
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B6>>(ApplicationFormTypes.B6.ToString());
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<B7>>(ApplicationFormTypes.B7.ToString(), new List<Func<IApplicationWithFieldsForm, RecordField>> { app => ((B7)app).Fields.EraseActualOwner }, new List<Func<RecordField, bool>> { f => ((F551_EraseActualOwner)f).Cheked });

            #endregion

            #region V

            RegisterApplicationValidatorRegistry<V1Validator>(ApplicationFormTypes.V1.ToString());
            RegisterApplicationValidatorRegistry<V21Validator>(ApplicationFormTypes.V21.ToString());
            RegisterApplicationValidatorRegistry<V22Validator>(ApplicationFormTypes.V22.ToString());
            RegisterApplicationValidatorRegistry<V23Validator>(ApplicationFormTypes.V23.ToString());
            RegisterApplicationValidatorRegistry<V24Validator>(ApplicationFormTypes.V24.ToString());
            RegisterApplicationValidatorRegistry<V25Validator>(ApplicationFormTypes.V25.ToString());
            RegisterApplicationValidatorRegistry<V26Validator>(ApplicationFormTypes.V26.ToString());
            RegisterApplicationValidatorRegistry<V31Validator>(ApplicationFormTypes.V31.ToString());
            RegisterApplicationValidatorRegistry<V32Validator>(ApplicationFormTypes.V32.ToString());
            RegisterApplicationValidatorRegistry<V33Validator>(ApplicationFormTypes.V33.ToString());

            #endregion

            #region G, D, E, J

            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<G1>>(ApplicationFormTypes.G1.ToString());
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<G2>>(ApplicationFormTypes.G2.ToString());
            RegisterApplicationValidatorRegistry<ApplicationWithFieldsFormValidator<G3>>(ApplicationFormTypes.G3.ToString());

            RegisterApplicationValidatorRegistry<D1Validator>(ApplicationFormTypes.D1.ToString());

            RegisterApplicationValidatorRegistry<E1Validator>(ApplicationFormTypes.E1.ToString());

            RegisterApplicationValidatorRegistry<J1Validator>(ApplicationFormTypes.J1.ToString());

            #endregion

            #region AppointingDemandDocuments

            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingDeclaration.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingReportAndExamination.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingRequestForCorrection.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingControllerReward.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingReleaseDeposit.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingChangeRequest.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.ReleaseAppointingExpert.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingPaidDeposit.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AttitudeOfChangeRequest.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.NotificationOfLackOfMeans.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.AppointingContactAddressChange.ToString());
            RegisterApplicationValidatorRegistry<AppointingDemandDocumentsValidator>(ApplicationFormTypes.NotificationOfExaminationImpossibility.ToString());

            RegisterApplicationValidatorRegistry<AppointingDemandValidator>(ApplicationFormTypes.AppointingExpert.ToString());

            #endregion

            #region RequestsForCertificates

            RegisterApplicationValidatorRegistry<RequestForCertificateValidator<RequestForActualStateCertificate>>(ApplicationFormTypes.ActualStateCertificate.ToString());
            RegisterApplicationValidatorRegistry<RequestForCertificateValidator<RequestForEntryByPeriodCertificate>>(ApplicationFormTypes.EntryByPeriodCertificate.ToString());
            RegisterApplicationValidatorRegistry<RequestForCertificateValidator<RequestForPublicationByPeriodCertificate>>(ApplicationFormTypes.PublicationByPeriodCertificate.ToString());
            RegisterApplicationValidatorRegistry<RequestForCertificateValidator<RequestForMissingActsCertificate>>(ApplicationFormTypes.MissingActsCertificate.ToString());
            RegisterApplicationValidatorRegistry<RequestForCertificateValidator<RequestForEnteredCircumstancesCertificate>>(ApplicationFormTypes.EnteredCircumstancesCertificate.ToString());
            RegisterApplicationValidatorRegistry<RequestForCertificateValidator<RequestForActOrCopyOfActCertificate>>(ApplicationFormTypes.ActOrCopyOfActCertificate.ToString());

            RegisterApplicationValidatorRegistry<RequestForCertificateForReservedCompanyValidator>(ApplicationFormTypes.CertificateForReserveFirm.ToString());

            #endregion

            #region Other

            RegisterApplicationValidatorRegistry<RequestForCorrectionValidator>(ApplicationFormTypes.RequestForCorrection.ToString());
            RegisterApplicationValidatorRegistry<ActOfContestationValidator>(ApplicationFormTypes.ActOfContestation.ToString());
            RegisterApplicationValidatorRegistry<AppealRefusalValidator>(ApplicationFormTypes.Complaint.ToString());

            #endregion
        }

        private void RegisterApplicationValidatorRegistry<TValidator>(string formType, List<Func<IApplicationWithFieldsForm, RecordField>> ademptionFieldFunc = null, List<Func<RecordField, bool>> funcAdemptionFieldChecked = null) where TValidator : IApplicationFormValidator
        {
            For<IApplicationFormValidator>().Use<TValidator>().Named(formType).Singleton()
                .Setter<IEkatte>("Ekatte").IsTheDefault()
                .Setter<IApplicationDocumentTypes>("ApplicationDocumentTypes").IsTheDefault()
                .Setter<IDeedReportServiceClient>("DeedReportServiceClient").IsTheDefault()
                .Setter<IAssignmentReportServiceClient>("AssignmentReportServiceClient").IsTheDefault()
                .Setter<IApplicationServiceClient>("ApplicationServiceClient").IsTheDefault()
                .SetProperty(obj =>
                {
                    var objType = obj.GetType();

                    if (objType.IsGenericType && objType.GetGenericTypeDefinition() == (typeof(ApplicationWithFieldsFormValidator<>)))
                    {
                        var ademptionFieldFuncProp = objType.GetProperty("AdemptionFieldFunc");
                        ademptionFieldFuncProp.SetValue(obj, ademptionFieldFunc);

                        var funcAdemptionFieldCheckedProp = objType.GetProperty("FuncAdemptionFieldChecked");
                        funcAdemptionFieldCheckedProp.SetValue(obj, funcAdemptionFieldChecked);
                    }
                });
        }
    }
}
