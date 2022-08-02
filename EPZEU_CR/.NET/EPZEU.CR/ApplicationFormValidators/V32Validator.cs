using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V32Validator : VBaseValidator<V32>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => new List<ApplicationFormTypes>() { ApplicationFormTypes.A7 };

        protected override IErrorCollection ValidateInternal(V32 application, bool isMainApplication = true)
        {
            MatchedAdditionalApplicationsCount = 0;
            var errors = (ErrorCollection)base.ValidateInternal(application);

            if (application != null && application.Fields != null)
            {
                if (application.Fields.ReorganizeCoOperatives != null)
                {
                    var reorganizeCoOperativesError = ValidateReorganizeCoOperatives(application.Fields.ReorganizeCoOperatives);
                    if (reorganizeCoOperativesError != null)
                        errors.Add(reorganizeCoOperativesError);
                }

                if (application.Fields.Successors803 != null)
                {
                    var successors803Error = ValidateReorganizeSuccessors803(application.Fields.Successors803);
                    if (successors803Error != null)
                        errors.Add(successors803Error);
                }

                var additionalA7Apps = getAdditionalAppsToSearch(application).Select(x => (A7)x).ToList();

                if (application.Fields.Successors803 != null && application.Fields.Successors803.SuccessorList != null && application.Fields.Successors803.SuccessorList.Count > 0)
                {
                    for (int i = 0; i < application.Fields.Successors803.SuccessorList.Count(); i++)
                    {
                        var successor = application.Fields.Successors803.SuccessorList[i];

                        if (successor.Subject != null && string.IsNullOrWhiteSpace(successor.Subject.Indent))
                        {
                            var appsForInitialRegForSuccessorNameCount = additionalA7Apps.Where(x => x.ApplicationState == ProcessStates.New
                            && x.Fields != null && x.Fields.Company != null && x.Fields.Company.Text == successor.Subject.Name).Count();

                            if (appsForInitialRegForSuccessorNameCount == 0)  //Няма подадено допълнително заявление за първоначална регистрация на правоприемник
                                errors.Add(new TextError("CR_APP_00188_E", "CR_APP_00188_E"));

                            if (appsForInitialRegForSuccessorNameCount > 1) // Добавено е повече от едно допълнително заявление за първоначална регистрация на правоприемник
                                errors.Add(new TextError("CR_APP_00189_E", "CR_APP_00189_E"));

                            MatchedAdditionalApplicationsCount += appsForInitialRegForSuccessorNameCount;
                        }
                        else
                            MatchedAdditionalApplicationsCount += additionalA7Apps.Where(x => x.ApplicationState == ProcessStates.ForChange
                            && x.Fields != null && x.Fields.UIC != null && x.Fields.UIC.Text == successor.Subject.Indent).Count();
                    }
                }

                if (application.Fields.ReorganizeCoOperatives != null && application.Fields.ReorganizeCoOperatives.CoOperativeList != null
                    && application.Fields.ReorganizeCoOperatives.CoOperativeList.Count > 0 && application.Fields.ReorganizeCoOperatives.CoOperativeList[0].Subject != null)
                {
                    MatchedAdditionalApplicationsCount += additionalA7Apps.Where(x => x.ApplicationState == ProcessStates.ForChange
                    && x.Fields != null && x.Fields.UIC != null && x.Fields.UIC.Text == application.Fields.ReorganizeCoOperatives.CoOperativeList[0].Subject.Indent).Count();
                }

                if (additionalA7Apps.Count > MatchedAdditionalApplicationsCount)
                    errors.Add(new TextError("CR_APP_00197_E", "CR_APP_00197_E"));
            }

            return errors.Count > 0 ? errors : null;
        }
    }
}