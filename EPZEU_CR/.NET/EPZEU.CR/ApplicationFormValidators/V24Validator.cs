using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V24Validator : VBaseValidator<V24>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => new List<ApplicationFormTypes>()
        {
           ApplicationFormTypes.A4,
           ApplicationFormTypes.A5,
           ApplicationFormTypes.A6,
           ApplicationFormTypes.A12,
           ApplicationFormTypes.A14
        };

        protected override IErrorCollection ValidateInternal(V24 application, bool isMainApplication = true)
        {
            MatchedAdditionalApplicationsCount = 0;
            var errors = (ErrorCollection)base.ValidateInternal(application);

            if (application != null && application.Fields != null)
            {
                if (application.Fields.TransformingCompanys2 != null)
                {
                    var transformingCompanys2Error = ValidateTransformingCompanys2(application.Fields.TransformingCompanys2);
                    if (transformingCompanys2Error != null)
                        errors.Add(transformingCompanys2Error);
                }

                if (application.Fields.Successors703 != null)
                {
                    var successors703Error = ValidateSuccessors703(application.Fields.Successors703);
                    if (successors703Error != null)
                        errors.Add(successors703Error);
                }

                var additionalApps = getAdditionalAppsToSearch(application).ToList();

                if (application.Fields.FormOfTransforming701 != null && application.Fields.Successors703 != null && application.Fields.Successors703.SuccessorList != null && application.Fields.Successors703.SuccessorList.Count > 0)
                {
                    if (application.Fields.FormOfTransforming701.Fusion)
                    {
                        var successorInFusionError = ValidateAppsForSuccessorInFusion(application.Fields.Successors703.SuccessorList[0], additionalApps);
                        if (successorInFusionError != null)
                            errors.Add(successorInFusionError);
                    }
                    else if (application.Fields.FormOfTransforming701.Influx)
                    {
                        MatchAppsForSuccessorInInflux(application.Fields.Successors703.SuccessorList[0], additionalApps);
                    }
                }

                var a12Apps = additionalApps.Where(x => x.AppType == ApplicationFormTypes.A12).Select(x => (A12)x).FirstOrDefault();
                if (a12Apps != null)
                {
                    if (application.Fields.FormOfTransforming701.Influx || a12Apps.Fields.WayOfEstablishingEuropeanCompany == null
                        && (a12Apps.Fields.WayOfEstablishingEuropeanCompany.FromAcquisition == false || a12Apps.Fields.WayOfEstablishingEuropeanCompany.FromMerge == false))
                    {
                        // Това е едно съобщение, но е разбито на 3, защото ако/като променим начина, по който излизат, ще е добре да са на нови редове.
                        errors.Add(new TextError("CR_APP_00200_E", "CR_APP_00200_E"));// Начинът на учредяване на европейското дружество в заявление А12 трябва да отговаря на формата на преобразуване в заявление В24. 
                        errors.Add(new TextError("CR_APP_00201_E", "CR_APP_00201_E"));// Ако в поле 701 „Форма на преобразуване” е избрано „сливане” , в поле 70 „Начин на учредяване на ЕД” трябва да е избрано „Чрез сливане по чл. 2, ал. 1 и чл. 17 до чл. 31 от Регламент (ЕО) № 2157/2001”
                        errors.Add(new TextError("CR_APP_00202_E", "CR_APP_00202_E")); // Ако в поле 701 „Форма на преобразуване” е избрано „вливане” , в поле 70 „Начин на учредяване на ЕД” трябва да е избрано „Чрез вливане по чл. 2, ал. 1 и чл. 17 до чл. 31 от Регламент (ЕО) № 2157/2001”“ – ако има А12, което не отговаря на съответните условия.
                    }

                    if (application.Fields.Successors703 != null && application.Fields.Successors703.SuccessorList != null && application.Fields.Successors703.SuccessorList.Count > 0)
                    {
                        var successor = application.Fields.Successors703.SuccessorList[0];

                        // Името на фирмата в допълнително подаденото заявление А12 не съвпада с името на правоприемника от заявление В24
                        if (a12Apps.Fields != null && a12Apps.Fields.Company != null && successor.Subject != null && a12Apps.Fields.Company.Text != successor.Subject.Name)
                            errors.Add(new TextError("CR_APP_00199_E", "CR_APP_00199_E"));

                        if (application.Fields.FormOfTransforming701 != null && application.Fields.FormOfTransforming701.Influx == true && successor.Subject != null
                            && !string.IsNullOrWhiteSpace(successor.Subject.Name) && !string.IsNullOrWhiteSpace(successor.Subject.Indent))
                        {
                            var foundMatch = false;

                            if (application.Fields.TransformingCompanys2 != null && application.Fields.TransformingCompanys2.TransformingCompany2List != null
                                && application.Fields.TransformingCompanys2.TransformingCompany2List.Count > 0)
                            {
                                foreach (var transformingCompany in application.Fields.TransformingCompanys2.TransformingCompany2List)
                                {
                                    if (transformingCompany != null && transformingCompany.Subject != null && transformingCompany.Subject.Indent == successor.Subject.Indent)
                                        foundMatch = true;
                                }

                                if (!foundMatch)
                                    errors.Add(new TextError("CR_APP_00099_E", "CR_APP_00099_E"));//Правоприемникът не съвпада с никой от праводателите.
                            }
                        }
                    }

                    if (application.Fields.TransformingCompanys2 != null && application.Fields.TransformingCompanys2.TransformingCompany2List != null)
                    {
                        foreach (var transformingCompany in application.Fields.TransformingCompanys2.TransformingCompany2List)
                        {
                            if (transformingCompany.Subject != null && !string.IsNullOrWhiteSpace(transformingCompany.Subject.Indent) && transformingCompany.Subject.IsForeignTrader == false)
                            {
                                var result = DeedReportServiceClient.SearchDeedSummaryAsync(new Integration.EPZEU.Models.SearchCriteria.DeedSummarySearchCriteria() { UICs = new List<string>() { transformingCompany.Subject.Indent } }).GetAwaiter().GetResult();

                                var report = result.Count > 0 ? result.Data.First() : null;
                                if (report == null || report.LegalForm != LegalForms.AD && report.LegalForm != LegalForms.EAD)
                                    errors.Add(new TextError("CR_APP_00029_E", "CR_APP_00029_E"));  //Участниците в преобразуването трябва да бъдат с правна форма АД (или ЕАД).
                            }
                        }
                    }
                }

                if (additionalApps.Any(x => x.AppType == ApplicationFormTypes.A4 || x.AppType == ApplicationFormTypes.A5 || x.AppType == ApplicationFormTypes.A6))
                {
                    if (application.Fields.TransformingCompanys2 != null && application.Fields.TransformingCompanys2.TransformingCompany2List != null)
                    {
                        foreach (var transformingCompany in application.Fields.TransformingCompanys2.TransformingCompany2List)
                        {
                            if (transformingCompany.Subject != null && !string.IsNullOrWhiteSpace(transformingCompany.Subject.Indent) && transformingCompany.Subject.IsForeignTrader == false)
                            {
                                var result = DeedReportServiceClient.SearchDeedSummaryAsync(new Integration.EPZEU.Models.SearchCriteria.DeedSummarySearchCriteria() { UICs = new List<string>() { transformingCompany.Subject.Indent } }).GetAwaiter().GetResult();

                                var report = result.Count > 0 ? result.Data.First() : null;                               
                                if (report == null || report.LegalForm != LegalForms.AD
                                    && report.LegalForm != LegalForms.EAD
                                    && report.LegalForm != LegalForms.OOD
                                    && report.LegalForm != LegalForms.EOOD
                                    && report.LegalForm != LegalForms.KDA)
                                {
                                    errors.Add(new TextError("CR_APP_00029_E", "CR_APP_00029_E")); //Участниците в преобразуването трябва да бъдат с правна форма АД (или ЕАД).
                                }
                            }
                        }
                    }
                }

                if(additionalApps.Count > MatchedAdditionalApplicationsCount)
                    errors.Add(new TextError("CR_APP_00197_E", "CR_APP_00197_E"));
            }

            return errors.Count > 0 ? errors : null;
        }


        private void MatchAppsForSuccessorInInflux(F7030_Successor successor, IEnumerable<ApplicationWithFieldsForm> additionalApps)
        {
            var appsForChangeRegForSuccessorIdentCount = additionalApps.Where(x => x.ApplicationState == ProcessStates.ForChange && x.GetFiledsContainer().UIC != null
            && x.GetFiledsContainer().UIC.Text == successor.Subject.Indent).Count();

            var appsForInitialRegForSuccessorIdentCount = additionalApps.Where(x => x.ApplicationState == ProcessStates.New 
            && x.GetFiledsContainer().UIC != null && x.GetFiledsContainer().UIC.Text == successor.Subject.Indent).Count();

            MatchedAdditionalApplicationsCount += appsForChangeRegForSuccessorIdentCount;
            MatchedAdditionalApplicationsCount += appsForInitialRegForSuccessorIdentCount;
        }

        private IError ValidateAppsForSuccessorInFusion(F7030_Successor successor, IEnumerable<ApplicationWithFieldsForm> additionalApps)
        {
            var appsForInitialRegForSuccessorNameCount = additionalApps.Where(x => x.ApplicationState == ProcessStates.New
            && x.GetFiledsContainer().GetField("00020") != null && ((F002_Company)x.GetFiledsContainer().GetField("00020")).Text == successor.Subject.Name).Count();

            MatchedAdditionalApplicationsCount += appsForInitialRegForSuccessorNameCount;

            if (appsForInitialRegForSuccessorNameCount == 0) // Няма подадено допълнително заявление за първоначална регистрация на правоприемник
                return new TextError("CR_APP_00188_E", "CR_APP_00188_E");

            return null;
        }
    }
}
