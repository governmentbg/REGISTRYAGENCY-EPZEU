using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Г2  Заявление за обявяване на годишни финансови отчети"
    /// </summary>
    internal class G2Provider : ApplicationFormGProviderBase<G2>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.G1_ActAnnouncement;
    }
}