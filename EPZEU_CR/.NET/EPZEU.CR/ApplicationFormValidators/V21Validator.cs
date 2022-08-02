using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V21Validator : VBaseValidator<V21>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => new List<ApplicationFormTypes>()
        {
            ApplicationFormTypes.A1,
            ApplicationFormTypes.A2,
            ApplicationFormTypes.A3,
            ApplicationFormTypes.A4,
            ApplicationFormTypes.A5,
            ApplicationFormTypes.A6,
            ApplicationFormTypes.A9,
            ApplicationFormTypes.A12,
            ApplicationFormTypes.A14
        };

        protected override IErrorCollection ValidateInternal(V21 application, bool isMainApplication = true)
        {
            MatchedAdditionalApplicationsCount = 0;
            var errors = (ErrorCollection)base.ValidateInternal(application);

            if (application != null && application.Fields != null)
            {
                if (application.Fields.TransformingCompanys != null)
                {
                    var transformingCompaniesError = ValidateTransformingCompanies(application.Fields.TransformingCompanys);
                    if (transformingCompaniesError != null)
                        errors.Add(transformingCompaniesError);
                }

                if (application.Fields.Successors703 != null)
                {
                    var successors703Error = ValidateSuccessors703(application.Fields.Successors703);
                    if (successors703Error != null)
                        errors.Add(successors703Error);
                }

                var additionalApps = getAdditionalAppsToSearch(application).ToList();

                if (application.Fields.Successors703 != null && application.Fields.Successors703.SuccessorList != null && application.Fields.Successors703.SuccessorList.Count > 0)
                {
                    if (application.Fields.FormOfTransforming701 != null && application.Fields.FormOfTransforming701.ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany)
                    {
                        var a12Apps = additionalApps.Where(x => x.AppType == ApplicationFormTypes.A12).Select(x => (A12)x).ToList();

                        var formOfTransforming701Errors = ValidateForConversionToED(application, a12Apps, application.Fields.Successors703.SuccessorList[0].Subject);
                        if (formOfTransforming701Errors != null)
                            errors.Add(formOfTransforming701Errors);
                    }
                    else if (application.Fields.FormOfTransforming701 != null && application.Fields.FormOfTransforming701.ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC)
                    {
                        var a5Apps = additionalApps.Where(x => x.AppType == ApplicationFormTypes.A5).Select(x => (A5)x).ToList();
                        var formOfTransforming701Errors = ValidateForConversionToAD(application, a5Apps, application.Fields.Successors703.SuccessorList[0].Subject);
                        if (formOfTransforming701Errors != null)
                            errors.Add(formOfTransforming701Errors);
                    }
                    else
                    {
                        for (int i = 0; i < application.Fields.TransformingCompanys.TransformingCompanyList.Count; i++)
                        {
                            var transformingCompanyErrors = ValidateForFormsOfTransformingDifferentFromConversion(application, additionalApps, application.Fields.Successors703.SuccessorList[0].Subject);
                            if (transformingCompanyErrors != null)
                                errors.Add(transformingCompanyErrors);
                        }

                        if (application.Fields.TransformingCompanys != null && application.Fields.TransformingCompanys.TransformingCompanyList != null)
                        {
                            foreach (var transformingCompanys in application.Fields.TransformingCompanys.TransformingCompanyList)
                            {
                                var appsForChangeForTransformingCompanyIdCount = additionalApps.Where(x=>x.ApplicationState == ProcessStates.ForChange
                                && x.GetFiledsContainer() != null && x.GetFiledsContainer().UIC != null && x.GetFiledsContainer().UIC.Text == transformingCompanys.Subject.Indent).Count();

                                MatchedAdditionalApplicationsCount += appsForChangeForTransformingCompanyIdCount;
                            }
                        }
                    }

                    if (additionalApps.Count > MatchedAdditionalApplicationsCount)
                        errors.Add(new TextError("CR_APP_00197_E", "CR_APP_00197_E"));
                }
            }

            return errors.Count > 0 ? errors : null;
        }

        #region Sub validators

        private IError ValidateForConversionToED(V21 mainApp, List<A12> a12Apps, Person successor)
        {
            var a12ForInitRegForSuccessorID = a12Apps.Where(x => x.ApplicationState == ProcessStates.New
                && x.Fields != null && x.Fields.UIC != null && x.Fields.UIC.Text == successor.Indent).FirstOrDefault();

            if (a12ForInitRegForSuccessorID != null)
            {
                if (a12ForInitRegForSuccessorID.Fields.WayOfEstablishingEuropeanCompany == null || a12ForInitRegForSuccessorID.Fields.WayOfEstablishingEuropeanCompany.FromConvert == false)
                    return new TextError("CR_APP_00192_E", "CR_APP_00192_E"); //В добавеното А12 не е попълнен начин на учредяване чрез преобразуване на съществуващо АД в ЕД по чл. 2, ал. 4 и чл. 37 от Регламент (ЕО) № 2157/2001

                if (a12ForInitRegForSuccessorID.Fields.Company != null && a12ForInitRegForSuccessorID.Fields.Company.Text != mainApp.Fields.Successors703.SuccessorList[0].Subject.Name)
                    return new TextError("CR_APP_00193_E", "CR_APP_00193_E"); // Името на фирмата в допълнително подаденото заявление А12 не съвпада с името на правоприемника от заявление В21

                MatchedAdditionalApplicationsCount++;
            }
            else return new TextError("CR_APP_00194_E", "CR_APP_00194_E");// Няма подадено допълнително заявление А12 за първоначална регистрация за правоприемника

            return null;
        }

        private IError ValidateForConversionToAD(V21 mainApp, List<A5> a5Apps, Person successor)
        {
            var a5ForInitRegForSuccessorID = a5Apps.Where(x => x.ApplicationState == ProcessStates.New
            && x.Fields != null && x.Fields.UIC != null && x.Fields.UIC.Text == successor.Indent
            && x.Fields.Company != null && x.Fields.Company.Text == successor.Name).FirstOrDefault();

            if (a5ForInitRegForSuccessorID != null)
                MatchedAdditionalApplicationsCount++;
            else
                return new TextError("CR_APP_00195_E", "CR_APP_00195_E");// Няма подадено допълнително заявление А12 за първоначална регистрация за правоприемника

            return null;
        }

        private IError ValidateForFormsOfTransformingDifferentFromConversion(V21 mainApp, IEnumerable<ApplicationWithFieldsForm> additionalApps, Person successor)
        {
            var additionalAppsToSearch = mainApp.Fields.FormOfTransforming701 != null && mainApp.Fields.FormOfTransforming701.TransferringProperty 
                ? additionalApps.Where(x=>x.AppType == ApplicationFormTypes.A1) 
                : additionalApps;

            if (string.IsNullOrWhiteSpace(successor.Indent))
            {
                var appsForInitialRegForSuccessorName = additionalAppsToSearch.Where(x => x.ApplicationState == ProcessStates.New
                && x.GetFiledsContainer().GetField("00020") != null && ((F002_Company)x.GetFiledsContainer().GetField("00020")).Text == successor.Name).ToList();

                MatchedAdditionalApplicationsCount++;

                if (appsForInitialRegForSuccessorName.Count == 0)
                    return new TextError("CR_APP_00188_E", "CR_APP_00188_E");

            }
            else
            {
                var appsForInitialRegForSuccessorId = additionalAppsToSearch.Where(x => x.ApplicationState == ProcessStates.New
                   && x.GetFiledsContainer().UIC != null && x.GetFiledsContainer().UIC.Text == successor.Indent).ToList();

                MatchedAdditionalApplicationsCount += appsForInitialRegForSuccessorId.Count;
                MatchedAdditionalApplicationsCount += additionalAppsToSearch.Where(x => x.ApplicationState == ProcessStates.ForChange &&
                x.GetFiledsContainer().UIC != null && x.GetFiledsContainer().UIC.Text == successor.Indent).Count();

                if (appsForInitialRegForSuccessorId.Count > 0) // Добавено е допълнително заявление за първоначална регистрация на правоприемник
                    return new TextError("CR_APP_00196_E", "CR_APP_00196_E");
            }

            foreach (var successor703 in mainApp.Fields.Successors703.SuccessorList)
            {
                var appsForChangeForTransformingCompanyIdCount = additionalApps.Where(x=>x.ApplicationState == ProcessStates.ForChange
                && x.GetFiledsContainer().UIC != null
                && x.GetFiledsContainer().UIC.Text == successor.Indent).Count();

                MatchedAdditionalApplicationsCount += appsForChangeForTransformingCompanyIdCount;
            }

            return null;
        }

        #endregion
    }
}