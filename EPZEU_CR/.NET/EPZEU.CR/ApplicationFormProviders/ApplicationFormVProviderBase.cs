using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Базова реализация на интерфейс IApplicationWithFieldsForm за работа със съдържанието на заявления В
    /// </summary>
    /// <typeparam name="TApplication">Тип на заявлението</typeparam>
    internal abstract class ApplicationFormVProviderBase<TApplication> : ApplicationWithFieldsFormProviderBase<TApplication>
        where TApplication : IApplicationWithFieldsForm
    {}
}
