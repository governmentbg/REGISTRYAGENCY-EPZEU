using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V1Validator : VBaseValidator<V1>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => new List<ApplicationFormTypes>() { ApplicationFormTypes.A1 };

        protected override IErrorCollection ValidateInternal(V1 application, bool isMainApplication = true)
        {
            MatchedAdditionalApplicationsCount = 0;
            var errors = (ErrorCollection)base.ValidateInternal(application);

            if (application != null && application.Fields != null)
            {
                if (application.Fields.TransferringEnterprise != null)
                {
                    var transferringEnterpriseError = ValidateTransferringEnterprise(application.Fields.TransferringEnterprise);
                    if (transferringEnterpriseError != null)
                        errors.Add(transferringEnterpriseError);
                }

                if (application.Fields.AcquisitionEnterprises != null)
                {
                    var acquisitionEnterprisesError = ValidateAcquisitionEnterprises(application.Fields.AcquisitionEnterprises);
                    if (acquisitionEnterprisesError != null)
                        errors.Add(acquisitionEnterprisesError);
                }

                var a1Apps = application.Applications != null ? application.Applications.Where(x => x.AppType == ApplicationFormTypes.A1).Select(x=>(A1)x).ToList() : new List<A1>();

                if (application.Fields.TransferringTypeOfTradeEnterprise != null)
                {
                    var transferringTypeOfTradeEnterpriseError = ValidateTransferringTypeOfTradeEnterprise(application.Fields.TransferringTypeOfTradeEnterprise, a1Apps);
                    if (transferringTypeOfTradeEnterpriseError != null)
                        errors.Add(transferringTypeOfTradeEnterpriseError);
                }

                for (int i = 0; i < application.Fields.AcquisitionEnterprises.AcquisitionEnterpriseList.Count; i++)
                {
                    var additionalAppsForAcquisitorErrors = ValidateAdditionalAppsForAcquisitor(application.Fields.AcquisitionEnterprises.AcquisitionEnterpriseList[i], a1Apps);
                    if (additionalAppsForAcquisitorErrors != null)
                        errors.Add(additionalAppsForAcquisitorErrors);
                }

                if (application.Fields.TransferringEnterprise != null && application.Fields.TransferringEnterprise.Subject != null)
                {
                    var a1ForChangeForTransferringEnterpriseIdCount = a1Apps.Where(x => x.ApplicationState == ProcessStates.ForChange
                    && x.Fields.UIC != null && x.Fields.UIC.Text == application.Fields.TransferringEnterprise.Subject.Indent).Count();

                    MatchedAdditionalApplicationsCount += a1ForChangeForTransferringEnterpriseIdCount;
                }

                if (a1Apps.Count > MatchedAdditionalApplicationsCount)
                    errors.Add(new TextError("CR_APP_00191_E", "CR_APP_00191_E"));
            }

            return errors.Count > 0 ? errors : null;
        }

        #region Sub validators

        private IError ValidateTransferringEnterprise(F601_TransferringEnterprise transferringEnterprise)
        {
            if (transferringEnterprise != null && transferringEnterprise.Subject != null && !string.IsNullOrWhiteSpace(transferringEnterprise.Subject.Indent))
            {
                var subjectErrors = ValidateUICAndNameAreRegisteredInTR(transferringEnterprise.Subject);
                if (subjectErrors != null)
                    return subjectErrors;
            }

            return null;
        }

        private IError ValidateAcquisitionEnterprises(F602_AcquisitionEnterprises acquisitionEnterprises)
        {
            if (acquisitionEnterprises != null && acquisitionEnterprises.AcquisitionEnterpriseList != null && acquisitionEnterprises.AcquisitionEnterpriseList.Count > 0)
            {
                foreach (var acquisitionEnterprise in acquisitionEnterprises.AcquisitionEnterpriseList)
                {
                    if (acquisitionEnterprise != null && acquisitionEnterprise.Subject != null && !string.IsNullOrWhiteSpace(acquisitionEnterprise.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(acquisitionEnterprise.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        private IError ValidateTransferringTypeOfTradeEnterprise(F600_TransferringTypeOfTradeEnterprise transferringTypeOfTradeEnterprise, List<A1> a1Apps)
        {
            if (transferringTypeOfTradeEnterprise != null)
            {
                if (transferringTypeOfTradeEnterprise.Taketransfer && a1Apps != null && a1Apps.Count > 1)
                    return new TextError("CR_APP_00187_E", "CR_APP_00187_E");
                else if (transferringTypeOfTradeEnterprise.Fulltransfer && a1Apps != null && a1Apps.Count > 2)
                    return new TextError("CR_APP_00186_E", "CR_APP_00186_E");
            }

            return null;
        }

        private IError ValidateAdditionalAppsForAcquisitor(F6020_AcquisitionEnterprise acquisitionEnterprise, List<A1> a1Apps)
        {
            if (acquisitionEnterprise != null && acquisitionEnterprise.Subject != null && string.IsNullOrWhiteSpace(acquisitionEnterprise.Subject.Indent))
            {
                var a1ForInitialRegForAcquisitorName = a1Apps.Where(x => x.ApplicationState == ProcessStates.New
                && x.Fields != null && x.Fields.Company != null && x.Fields.Company.Text == acquisitionEnterprise.Subject.Name).ToList();

                MatchedAdditionalApplicationsCount++;

                if (a1ForInitialRegForAcquisitorName.Count == 0) // Няма подадено допълнително заявление за първоначална регистрация на правоприемник
                    return new TextError("CR_APP_00188_E", "CR_APP_00188_E");

                if (a1ForInitialRegForAcquisitorName.Count > 1) // Добавено е повече от едно допълнително заявление за първоначална регистрация на правоприемник
                    return new TextError("CR_APP_00189_E", "CR_APP_00189_E");

            }
            else
            {
                var a1ForChangeForAcquisitorId = a1Apps.Where(x => x.ApplicationState == ProcessStates.ForChange
                && x.Fields != null && x.Fields.UIC != null && x.Fields.UIC.Text == acquisitionEnterprise.Subject.Indent).ToList();

                MatchedAdditionalApplicationsCount++;

                if (a1ForChangeForAcquisitorId.Count > 0)
                    return new TextError("CR_APP_00190_E", "CR_APP_00190_E");
            }

            return null;
        }

        #endregion
    }
}