using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal abstract class VBaseValidator<T> : ApplicationWithFieldsFormValidator<T>
        where T : IApplicationWithFieldsForm
    {
        protected abstract List<ApplicationFormTypes> PossibleAdditionalApplications { get; }

        protected int MatchedAdditionalApplicationsCount { get; set; } = 0;

        #region Field validators

        protected virtual IError ValidateUICAndNameAreRegisteredInTR(Person subject)
        {
            if (subject != null)
            {
                var deedSummary = DeedReportServiceClient.SearchDeedSummaryAsync(new DeedSummarySearchCriteria
                {
                    UICs = new List<string>() { subject.Indent }
                }).GetAwaiter().GetResult();

                if (deedSummary.Data == null || deedSummary.Data.ToList().Count == 0)
                    return new TextError("GL_NOT_FOUND_COMPANY_E", "GL_NOT_FOUND_COMPANY_E");
                else
                {
                    if (subject.Name != deedSummary.Data.ToList()[0].CompanyName)
                        return new TextError("CR_APP_00248_E", "CR_APP_00248_E");
                }
            }

            return null;
        }

        protected virtual IEnumerable<ApplicationWithFieldsForm> getAdditionalAppsToSearch(IApplicationWithFieldsForm application)
        {
            return application.Applications != null ? application.Applications.Where(app => PossibleAdditionalApplications.Any(appType => appType == app.AppType)) : new List<ApplicationWithFieldsForm>();
        }

        protected virtual IError ValidateTransformingCompanies(F702_TransformingCompanys transformingCompanys)
        {
            if (transformingCompanys != null && transformingCompanys.TransformingCompanyList != null && transformingCompanys.TransformingCompanyList.Count > 0)
            {
                foreach (var transformingCompany in transformingCompanys.TransformingCompanyList)
                {
                    if (transformingCompany != null && transformingCompany.Subject != null && !string.IsNullOrWhiteSpace(transformingCompany.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(transformingCompany.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        protected virtual IError ValidateSuccessors703(F703_Successors successors)
        {
            if (successors != null && successors.SuccessorList != null && successors.SuccessorList.Count > 0)
            {
                foreach (var successor in successors.SuccessorList)
                {
                    if (successor != null && successor.Subject != null && !string.IsNullOrWhiteSpace(successor.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(successor.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        protected virtual IError ValidateReorganizeCoOperatives(F802_ReorganizeCoOperatives reorganizeCoOperatives)
        {
            if (reorganizeCoOperatives != null && reorganizeCoOperatives.CoOperativeList != null && reorganizeCoOperatives.CoOperativeList.Count > 0)
            {
                foreach (var reorganizeCoOperative in reorganizeCoOperatives.CoOperativeList)
                {
                    if (reorganizeCoOperative != null && reorganizeCoOperative.Subject != null && !string.IsNullOrWhiteSpace(reorganizeCoOperative.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(reorganizeCoOperative.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        protected virtual IError ValidateReorganizeSuccessors803(F803_Successors803 successors803)
        {
            if (successors803 != null && successors803.SuccessorList != null && successors803.SuccessorList.Count > 0)
            {
                foreach (var successor803 in successors803.SuccessorList)
                {
                    if (successor803 != null && successor803.Subject != null && !string.IsNullOrWhiteSpace(successor803.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(successor803.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        protected virtual IError ValidateTransformingCompanys2(F702a_TransformingCompanys2 transformingCompanys)
        {
            if (transformingCompanys != null && transformingCompanys.TransformingCompany2List != null && transformingCompanys.TransformingCompany2List.Count > 0)
            {
                foreach (var transformingCompany in transformingCompanys.TransformingCompany2List)
                {
                    if (transformingCompany != null && transformingCompany.Subject != null && !string.IsNullOrWhiteSpace(transformingCompany.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(transformingCompany.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        protected virtual IError ValidateTransformingNPOs(F702b_TransformingNPOs transformingNPOs)
        {
            if (transformingNPOs != null && transformingNPOs.TransformingNPOList != null && transformingNPOs.TransformingNPOList.Count > 0)
            {
                foreach (var transformingNPO in transformingNPOs.TransformingNPOList)
                {
                    if (transformingNPO != null && transformingNPO.Subject != null && !string.IsNullOrWhiteSpace(transformingNPO.Subject.Indent))
                    {
                        var subjectErrors = ValidateUICAndNameAreRegisteredInTR(transformingNPO.Subject);
                        if (subjectErrors != null)
                            return subjectErrors;
                    }
                }
            }

            return null;
        }

        #endregion
    }
}