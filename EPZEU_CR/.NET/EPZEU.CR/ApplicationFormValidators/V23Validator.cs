using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using Integration.EPZEU.Models;
using System.Collections.Generic;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class V23Validator : VBaseValidator<V23>
    {
        protected override List<ApplicationFormTypes> PossibleAdditionalApplications => throw new System.NotImplementedException();

        protected override IErrorCollection ValidateInternal(V23 application, bool isMainApplication = true)
        {
            var errors = (ErrorCollection)base.ValidateInternal(application);

            if (application != null && application.Fields != null)
            {
                if (application.Fields.TransformingCompanys != null)
                {
                    var transformingCompanysError = ValidateTransformingCompanies(application.Fields.TransformingCompanys);
                    if (transformingCompanysError != null)
                        errors.Add(transformingCompanysError);
                }

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
            }

            return errors.Count > 0 ? errors : null;
        }
    }
}