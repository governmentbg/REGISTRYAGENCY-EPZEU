using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Г3  Заявление за обявяване на декларация по чл.38, ал.9, т.2 от ЗСч"
    /// </summary>
    internal class G3Provider : ApplicationFormGProviderBase<G3>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.G1_ActAnnouncement;
    }
}