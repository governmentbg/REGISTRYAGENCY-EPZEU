using EPZEU.Common.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common
{
    public struct AppParametersResult<T>
    {
        public AppParametersResult(T data, DateTime? modifiedDate)
        {
            Data = data;
            ModifiedDate = modifiedDate;
        }

        public readonly T Data;
        public readonly DateTime? ModifiedDate;
    }

    /// <summary>
    /// Интерфейс  на http клиент за работа с конфигурационни параметри.
    /// </summary>
    public interface IAppParametersServiceClient
    {
        /// <summary>
        /// Зарежда конфигурационни параметри.
        /// </summary>
        /// <param name="loadIfModifiedSince">Дата на последна промяна.</param>
        /// <param name="cancellationToken">Токен сигнализиращ прекъсване.</param>
        /// <returns>Конфигурационни параметри.</returns>
        Task<AppParametersResult<AppParameter[]>> LoadAppParametersAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс за IAppParametersServiceClient за работа с конфигурационни параметри.
    /// </summary>
    public class AppParametersServiceClient : IAppParametersServiceClient
    {
        private readonly HttpClient _client;

        public AppParametersServiceClient(HttpClient client) =>
            _client = client ?? throw new ArgumentNullException("client");

        public async Task<AppParametersResult<AppParameter[]>> LoadAppParametersAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            var result = await _client.GetWithIfNoneMatchAsync<AppParameter[]>("AppParameters", loadIfModifiedSince, cancellationToken);

            return new AppParametersResult<AppParameter[]>(result.Data, result.ModifiedDate);
        }
    }
}
