using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V33Validator : VBaseValidator<V33>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => new List<ApplicationFormTypes>() { ApplicationFormTypes.A7, ApplicationFormTypes.A13 };

        private int MatchedA13AdditionalAppsCount { get; set; } = 0;

        protected override IErrorCollection ValidateInternal(V33 application, bool isMainApplication = true)
        {
            MatchedAdditionalApplicationsCount = 0;
            var errors = (ErrorCollection)base.ValidateInternal(application);
            
            if (application != null && application.Fields != null)
            {
                if (application.Fields.ReorganizeCoOperatives2 != null)
                {
                    var reorganizeCoOperatives2Error = ValidateReorganizeCoOperatives2(application.Fields.ReorganizeCoOperatives2);
                    if (reorganizeCoOperatives2Error != null)
                        errors.Add(reorganizeCoOperatives2Error);
                }

                if (application.Fields.Successors803 != null)
                {
                    var successors803Error = ValidateReorganizeSuccessors803(application.Fields.Successors803);
                    if (successors803Error != null)
                        errors.Add(successors803Error);
                }

                var a7apps = getAdditionalAppsToSearch(application).Where(x => x.AppType == ApplicationFormTypes.A7).Select(x=>(A7)x).ToList();
                var a13apps = getAdditionalAppsToSearch(application).Where(x => x.AppType == ApplicationFormTypes.A13).Select(x => (A13)x).ToList();

                if (application.Fields.Successors803 != null && application.Fields.Successors803.SuccessorList != null && application.Fields.Successors803.SuccessorList.Count > 0
                    && application.Fields.FormOfTransforming801a != null)
                {
                    var successor = application.Fields.Successors803.SuccessorList[0];

                    if (application.Fields.FormOfTransforming801a.Influx801a)
                    {
                        var a13AppsForInitialRegForSuccessorIdentAndNameCount = a13apps.Where(x => x.ApplicationState == ProcessStates.New
                        && x.Fields != null && x.Fields.Company != null && x.Fields.Company.Text == successor.Subject.Name
                        && x.Fields.UIC != null && x.Fields.UIC.Text == successor.Subject.Indent).Count();

                        if (a13AppsForInitialRegForSuccessorIdentAndNameCount == 0)
                            errors.Add(new TextError("CR_APP_00205_E", "CR_APP_00205_E"));// Няма подадено допълнително заявление A13 за първоначална регистрация на правоприемник

                        if (a7apps.Count > 0)
                            errors.Add(new TextError("CR_APP_00204_E", "CR_APP_00204_E")); // Добавено е допълнително заявление A7

                        MatchedAdditionalApplicationsCount += a7apps.Count;
                        MatchedA13AdditionalAppsCount += a13AppsForInitialRegForSuccessorIdentAndNameCount;
                    }
                    else if (application.Fields.FormOfTransforming801a.Fusion801a)
                    {
                        var a13AppsForInitialRegForSuccessorNameCount = a13apps.Where(x => x.ApplicationState == ProcessStates.New
                          && x.Fields != null && x.Fields.Company != null && x.Fields.Company.Text == successor.Subject.Name).Count();

                        if (a13AppsForInitialRegForSuccessorNameCount == 0)
                            errors.Add(new TextError("CR_APP_00205_E", "CR_APP_00205_E"));// Няма подадено допълнително заявление A13 за първоначална регистрация на правоприемник

                        if (a7apps.Count > 0)
                            errors.Add(new TextError("CR_APP_00204_E", "CR_APP_00204_E")); // Добавено е допълнително заявление A7

                        MatchedAdditionalApplicationsCount += a7apps.Count;
                        MatchedA13AdditionalAppsCount += a13AppsForInitialRegForSuccessorNameCount;
                    }
                    else if (application.Fields.FormOfTransforming801a.ConversionToCoop)
                    {
                        if (a13apps.Count > 0)
                            errors.Add(new TextError("CR_APP_00207_E", "CR_APP_00207_E")); // Добавено е допълнително заявление A13.

                        var a7AppsForInitialRegForSuccessorIdentAndNameCount = a7apps.Where(x => x.ApplicationState == ProcessStates.New
                            && x.Fields != null && x.Fields.Company != null && x.Fields.Company.Text == successor.Subject.Name
                            && x.Fields.UIC != null && x.Fields.UIC.Text == successor.Subject.Indent).Count();

                        if (a7AppsForInitialRegForSuccessorIdentAndNameCount == 0)
                            errors.Add(new TextError("CR_APP_00205_E", "CR_APP_00205_E")); // Няма подадено допълнително заявление A7 за правоприемник

                        MatchedAdditionalApplicationsCount += a7AppsForInitialRegForSuccessorIdentAndNameCount;
                        MatchedA13AdditionalAppsCount += a13apps.Count;
                    }
                    else if (application.Fields.FormOfTransforming801a.ConversionToEUCoop)
                    {
                        if (a7apps.Count > 0)
                            errors.Add(new TextError("CR_APP_00204_E", "CR_APP_00204_E")); // Добавено е допълнително заявление A7

                        var a13AppsForInitialRegForSuccessorIdentAndNameCount = a13apps.Where(x => x.ApplicationState == ProcessStates.New
                            && x.Fields != null && x.Fields.Company != null && x.Fields.Company.Text == successor.Subject.Name
                            && x.Fields.UIC != null && x.Fields.UIC.Text == successor.Subject.Indent).Count();

                        if (a13AppsForInitialRegForSuccessorIdentAndNameCount == 0)
                            errors.Add(new TextError("CR_APP_00210_E", "CR_APP_00210_E"));  // Няма подадено допълнително заявление A13 за правоприемник

                        MatchedAdditionalApplicationsCount += a7apps.Count;
                        MatchedA13AdditionalAppsCount += a13AppsForInitialRegForSuccessorIdentAndNameCount;
                    }

                    if (a13apps.Count > 0 && application.Fields.FormOfTransforming801a.ConversionToCoop == false)
                    {
                        if (a13apps[0].Fields != null && a13apps[0].Fields.Company != null && a13apps[0].Fields.Company.Text != successor.Subject.Name)
                        {
                            errors.Add(new TextError("CR_APP_00206_E", "CR_APP_00206_E")); //Името на фирмата в допълнително подаденото заявление А13 не съвпада с името на правоприемника от заявление В33.
                            MatchedA13AdditionalAppsCount++;
                        }
                    }

                    if (a7apps.Count > 0 && application.Fields.FormOfTransforming801a.ConversionToCoop)
                    {
                        if (a7apps[0].Fields != null && a7apps[0].Fields.Company != null && a7apps[0].Fields.Company.Text != successor.Subject.Name)
                        {
                            errors.Add(new TextError("CR_APP_00209_E", "CR_APP_00209_E")); // Името на фирмата в допълнително подаденото заявление А7 не съвпада с името на правоприемника от заявление В33.
                            MatchedAdditionalApplicationsCount++;
                        }
                    }
                }

                if ((a7apps.Count > MatchedAdditionalApplicationsCount) || (a13apps.Count > MatchedA13AdditionalAppsCount))
                    errors.Add(new TextError("CR_APP_00197_E", "CR_APP_00197_E"));
            }

            return errors.Count > 0 ? errors : null;
        }

        protected virtual IError ValidateReorganizeCoOperatives2(F802a_ReorganizeCoOperatives2 reorganizeCoOperatives2)
        {
            if (reorganizeCoOperatives2 != null && reorganizeCoOperatives2.CoOperative2List != null && reorganizeCoOperatives2.CoOperative2List.Count > 0)
            {
                foreach (var reorganizeCoOperative in reorganizeCoOperatives2.CoOperative2List)
                {
                    if (reorganizeCoOperative != null && reorganizeCoOperative.Subject != null && !string.IsNullOrWhiteSpace(reorganizeCoOperative.Subject.Indent))
                    {
                        var subjectError = ValidateUICAndNameAreRegisteredInTR(reorganizeCoOperative.Subject);
                        if (subjectError != null)
                            return subjectError;
                    }
                }
            }

            return null;
        }
    }
}
