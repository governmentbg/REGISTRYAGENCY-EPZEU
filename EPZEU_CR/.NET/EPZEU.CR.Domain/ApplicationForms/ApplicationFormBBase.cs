namespace EPZEU.CR.Domain.ApplicationForms
{
    public abstract class ApplicationFormBBase<TField> : ApplicationWithFieldsFormBase<TField>
        where TField : ApplicationFormBFieldsBase
    { }

    public class ApplicationFormBFieldsBase : ApplicationFormFieldsBase
    {
        #region Fields


        #endregion
    }
}
