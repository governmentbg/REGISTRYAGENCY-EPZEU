using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Http;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;

namespace EPZEU.CR.Reports
{
    /// <summary>
    /// Интерфейс на услуга за актуално състояние.
    /// </summary>
    public interface IDeedReportService
    {
        /// <summary>
        /// Изчитане данни за партида.
        /// </summary>
        /// <param name="loadOption">Параметри на базата на които да зареди партидата.</param> 
        Task<Deed> GetDeedAsync(string uic, DeedLoadOption loadOption);

        /// <summary>
        /// Изчита основни данни за партида.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <returns>Основни данни за партида.</returns>
        Task<DeedSummary> GetDeedSummaryAsync(string uic);

        /// <summary>
        /// Търсене за основни данни на раздели.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="subUICType">Тип раздел.</param>
        /// <param name="subUIC">Идентификатор на раздел.</param>
        /// <returns>Основни данни на раздели.</returns>
        Task<IEnumerable<SubDeedSummary>> SearchSubDeedSummariesAsync(string uic, SubUICTypes subUICType, string subUIC = null);

        /// <summary>
        /// История на поле.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="subUICType">Тип раздел.</param>
        /// <param name="subUIC">Идентификатор на раздел.</param>
        /// <param name="fieldIdent">Идентификатор на поле.</param>
        /// <returns></returns>
        Task<IEnumerable<Domain.Fields.Common.IField>> SearchFieldHistoryAsync(string uic, SubUICTypes subUICType, string subUIC, string fieldIdent);

        /// <summary>
        /// Документи към поле.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="subUICType">Тип раздел.</param>
        /// <param name="subUic">Идентификатор на раздел.</param>
        /// <param name="fieldIdent">Идентификатор на поле.</param>
        /// <param name="entryDate">Дата на вписване.</param>
        /// <param name="loadPublicOnly">Само публични.</param>
        /// <returns></returns>
        Task<IEnumerable<ApplicationDocumentInfo>> SearchFieldDocumentsAsync(string uic, SubUICTypes subUICType, string subUic, string fieldIdent, DateTime? entryDate = null, bool loadPublicOnly = true);

        /// <summary>
        /// Изчита данни да седалище на фирма.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <returns>Данни за седалище.</returns>
        Task<F005_Seat> GetCompanySeatAsync(string uic);

        /// <summary>
        /// Изчита данни за клонове на фирма.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <returns>Данни за клонове на фирма.</returns>
        Task<IEnumerable<F051a_BranchFirm>> GetCompanyBranchesAsync(string uic);

        /// <summary>
        /// Операция за изчитане на TRULNC представители.
        /// </summary>
        /// <param name="uic"></param>
        /// <param name="ident"></param>
        /// <returns></returns>
        Task<Deed> GetTRRULNCRepresentativesAsync(string uic, string ident);
    }

    /// <summary>
    /// Реализация на интерфейс IDeedReportService за работа със справки за актуално състояние.
    /// </summary>
    internal class DeedReportService : IDeedReportService
    {
        #region Private members

        private IDeedReportServiceClient _deedReportServiceClient = null;
        private MediaTypeFormatterCollection DefaultMediaTypeFormatterCollection;

        #endregion

        #region Constructor

        public DeedReportService(
            IDeedReportServiceClient deedReportServiceClient)
        {
            _deedReportServiceClient = deedReportServiceClient;

            DefaultMediaTypeFormatterCollection = new MediaTypeFormatterCollection();
            DefaultMediaTypeFormatterCollection.Insert(0, new XmlMediaTypeFormatter2());

            /*Използваме XmlSerializer инфраструктурата*/
            DefaultMediaTypeFormatterCollection.XmlFormatter.UseXmlSerializer = true;
        }

        #endregion

        #region IDeedReportService

        public async Task<Deed> GetDeedAsync(string uic, DeedLoadOption loadOption)
        {
            using (var responseMessage = await _deedReportServiceClient.GetDeedAsXmlAsync(uic, loadOption))
            {
                return await responseMessage.Content.ReadAsAsync<Deed>(DefaultMediaTypeFormatterCollection);
            }
        }

        public async Task<Deed> GetTRRULNCRepresentativesAsync(string uic, string ident)
        {
            using (var responseMessage = await _deedReportServiceClient.GetTRRULNCRepresentativesAsync(uic, ident))
            {
                if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent)
                    return null;

                return await responseMessage.Content.ReadAsAsync<Deed>(DefaultMediaTypeFormatterCollection);
            }
        }

        public async Task<DeedSummary> GetDeedSummaryAsync(string uic)
        {
            var deeds = await _deedReportServiceClient.SearchDeedSummaryAsync(new DeedSummarySearchCriteria() { UICs = new List<string>() { uic } });

            if (deeds.Data == null || deeds.Data.Count() == 0)
            {
                return null;
            }

            return deeds.Data.Single();
        }

        public Task<IEnumerable<SubDeedSummary>> SearchSubDeedSummariesAsync(string uic, SubUICTypes subUICType, string subUIC = null)
        {
            return _deedReportServiceClient.SearchSubDeedSummariesAsync(uic, subUICType, subUIC);
        }

        public async Task<F005_Seat> GetCompanySeatAsync(string uic)
        {
            var deed = await GetDeedAsync(uic, new DeedLoadOption()
            {
                SubUICType = SubUICTypes.MainCircumstances,
                FieldIdents = new List<string>() { F005_Seat.FieldIdentCode }
            });

            if (deed != null && deed.SubDeeds != null && deed.SubDeeds.Count > 0)
            {
                return (F005_Seat)deed.SubDeeds.Single().Fields.Single();
            }

            return null;
        }

        public async Task<IEnumerable<F051a_BranchFirm>> GetCompanyBranchesAsync(string uic)
        {
            var deed = await GetDeedAsync(uic, new DeedLoadOption()
            {
                SubUICType = SubUICTypes.B2_Branch,
                FieldIdents = new List<string>() { F051a_BranchFirm.FieldIdentCode }
            });

            if (deed != null && deed.SubDeeds != null && deed.SubDeeds.Count > 0)
            {
                return deed.SubDeeds.Select(sd => (F051a_BranchFirm)sd.Fields.Single());
            }

            return null;
        }

        public async Task<IEnumerable<Domain.Fields.Common.IField>> SearchFieldHistoryAsync(string uic, SubUICTypes subUICType, string subUIC, string fieldIdent)
        {
            FieldsList fieldsList;

            using (var responseMessage = await _deedReportServiceClient.SearchFieldHistoryXmlAsync(uic, subUICType, subUIC, fieldIdent))
            {
                fieldsList = await responseMessage.Content.ReadAsAsync<FieldsList>(DefaultMediaTypeFormatterCollection);
            }

            return fieldsList == null || fieldsList.Fields == null ? null : fieldsList.Fields.Select(f => (Domain.Fields.Common.IField)f);
        }

        public async Task<IEnumerable<ApplicationDocumentInfo>> SearchFieldDocumentsAsync(string uic, SubUICTypes subUICType, string subUic, string fieldIdent, DateTime? entryDate = null, bool loadPublicOnly = true)
        {
            return await _deedReportServiceClient.SearchFieldDocumentsAsync(uic, subUICType, subUic, fieldIdent, entryDate, loadPublicOnly);
        }

        #endregion
    }
}