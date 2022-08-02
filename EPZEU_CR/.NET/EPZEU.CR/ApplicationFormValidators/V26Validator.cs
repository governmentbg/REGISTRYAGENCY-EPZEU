using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V26Validator : VBaseValidator<V26>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => new List<ApplicationFormTypes>()
        {
            ApplicationFormTypes.A15,
            ApplicationFormTypes.A16,
            ApplicationFormTypes.A17
        };

        protected override IErrorCollection ValidateInternal(V26 application, bool isMainApplication = true)
        {
            MatchedAdditionalApplicationsCount = 0;
            var errors = (ErrorCollection)base.ValidateInternal(application);

            if (application != null && application.Fields != null)
            {
                if (application.Fields.TransformingNPOs != null)
                {
                    var transformingNPOsError = ValidateTransformingNPOs(application.Fields.TransformingNPOs);
                    if (transformingNPOsError != null)
                        errors.Add(transformingNPOsError);
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
                    foreach (var successor in application.Fields.Successors703.SuccessorList)
                    {
                        if (successor != null && successor.Subject != null && string.IsNullOrWhiteSpace(successor.Subject.Indent))
                        {
                            var appsForInitialRegForSuccessorName = additionalApps.Where(x => x.ApplicationState == ProcessStates.New
                                && x.GetFiledsContainer().GetField("00020") != null && ((F002_Company)x.GetFiledsContainer().GetField("00020")).Text == successor.Subject.Name).ToList();

                            if (appsForInitialRegForSuccessorName.Count == 0)
                                errors.Add(new TextError("CR_APP_00188_E", "CR_APP_00188_E")); //Няма подадено допълнително заявление за първоначална регистрация на правоприемник
                            else if (appsForInitialRegForSuccessorName.Count > 1)
                                errors.Add(new TextError("CR_APP_00189_E", "CR_APP_00189_E")); // Добавено е повече от едно допълнително заявление за първоначална регистрация на правоприемник

                            MatchedAdditionalApplicationsCount++;
                        }
                        else
                        {
                            var appsForInitialRegForSuccessorId = additionalApps.Where(x => x.ApplicationState == ProcessStates.New && x.GetFiledsContainer().UIC != null && x.GetFiledsContainer().UIC.Text == successor.Subject.Indent).ToList();
                            if (appsForInitialRegForSuccessorId.Count > 1)
                                errors.Add(new TextError("CR_APP_00198_E", "CR_APP_00198_E")); // Добавено е повече от едно допълнително заявление за промяна на обстоятелства на правоприемник

                            MatchedAdditionalApplicationsCount++;
                        }
                    }
                }

                if (application.Fields.TransformingNPOs != null && application.Fields.TransformingNPOs.TransformingNPOList != null &&
                    application.Fields.TransformingNPOs.TransformingNPOList.Count > 0 && application.Fields.TransformingNPOs.TransformingNPOList[0].Subject != null)
                {
                    var additinalAppsForChangeForTransformingNPOsIdCount = additionalApps.Where(x => x.ApplicationState == ProcessStates.ForChange
                    && x.GetFiledsContainer() != null && x.GetFiledsContainer().UIC != null
                    && x.GetFiledsContainer().UIC.Text == application.Fields.TransformingNPOs.TransformingNPOList[0].Subject.Indent).Count();

                    MatchedAdditionalApplicationsCount += additinalAppsForChangeForTransformingNPOsIdCount;
                }

                if (additionalApps.Count > MatchedAdditionalApplicationsCount)
                    errors.Add(new TextError("CR_APP_00197_E", "CR_APP_00197_E"));
            }

            return errors.Count > 0 ? errors : null;
        }
    }
}