using EPZEU.CMS.Models;
using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;


namespace EPZEU.CMS
{
    public struct CMSResult<T>
    {
        public CMSResult(T data, DateTime? modifiedData)
        {
            Data = data;
            ModifiedDate = modifiedData;
        }

        public readonly T Data;
        public readonly DateTime? ModifiedDate;
    }

    /// <summary>
    /// Интерфейс на http клиент за работа с CMS.
    /// </summary>
    public interface ICMSServiceClient
    {
        /// <summary>
        /// Зарежда номенклатурата със статичните страници.
        /// </summary>
        Task<CMSResult<IEnumerable<StaticPage>>> LoadStaticPagesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата със страници.
        /// </summary>
        Task<CMSResult<IEnumerable<Page>>> LoadPagesAsync(string languageCode, DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

    }
    /// <summary>
    /// Реализация на интерфейс INomenclaturesServiceClient за работа с CMS.
    /// </summary>
    public class CMSServiceClient : ICMSServiceClient
    {
        private readonly HttpClient _client;

        public CMSServiceClient(HttpClient client) =>
            _client = client ?? throw new ArgumentNullException("client");

        public Task<CMSResult<IEnumerable<Models.StaticPage>>> LoadStaticPagesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadCMSAsync<IEnumerable<StaticPage>>("CMS/staticPages", loadIfModifiedSince, cancellationToken);
        }

        public Task<CMSResult<IEnumerable<Models.Page>>> LoadPagesAsync(string languageCode, DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadCMSAsync<IEnumerable<Page>>("CMS/pages/" + languageCode, loadIfModifiedSince, cancellationToken);
        }


        private async Task<CMSResult<T>> LoadCMSAsync<T>(string uri, DateTime? ifNoneMatch, CancellationToken cancellationToken)
        {
            var result = await _client.GetWithIfNoneMatchAsync<T>(uri, ifNoneMatch, cancellationToken);

            return new CMSResult<T>(result.Data, result.ModifiedDate);
        }
    }
}
