using EPZEU.Signing.Models;
using EPZEU.Utilities;
using System;
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing
{
    /// <summary>
    /// Интерфейс на http клиент за работа с процеса по подписване.
    /// </summary>
    public interface ISigningServiceClient
    {
        /// <summary>
        /// Създава процес по подписване.
        /// </summary>
        /// <param name="request">Заявка за процес по подписване.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Идентификатор на създадения процес.</returns>
        Task<Guid> CreateSigningProcessAsync(SigningRequest request, CancellationToken cancellationToken);
          
        /// <summary>
        /// Валидира положените подписи в документ.
        /// </summary>
        /// <param name="signedDocumentContent">Подписаният документ.</param>
        /// <param name="fileName">Име на файла.</param>
        /// <returns></returns>
        Task<SignatursVerificationResponse> ValidateDocumentSignatures(Stream signedDocumentContent, string fileName);

        /// <summary>
        /// Изтрива процеси по подписване.
        /// </summary>
        /// <param name="guids">Списък с идентификатори на процеси по подписване.</param>
        /// <returns>Task</returns>
        Task DeleteSigningProcessesAsync(Guid[] guids, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейса ISigningServiceClient а работа с процеса по подписване.
    /// </summary>
    public class SigningServiceClient : ISigningServiceClient
    {
        private readonly HttpClient _client;

        public SigningServiceClient(HttpClient client) =>
            _client = client ?? throw new ArgumentNullException("client");

        public async Task<Guid> CreateSigningProcessAsync(SigningRequest request, CancellationToken cancellationToken)
        {
            var formDataBoundary = String.Format("----------{0:N}", Guid.NewGuid());
            using (var mfdc = new MultipartFormDataContent(formDataBoundary))
            {
                mfdc.Add(new ObjectContent<SigningRequest>(request, Utilities.HttpClientExtensions.DefaultMediaTypeFormatterCollection.JsonFormatter), "signingRequest");
                mfdc.Add(new StreamContent(request.Content), "documentToSign", request.FileName);

                return await _client.PostAsync<Guid>("SigningProcessesPrivate", mfdc, cancellationToken);
            }
        }

        public async Task<SignatursVerificationResponse> ValidateDocumentSignatures(Stream documentContent, string fileName)
        {
            using (MultipartFormDataContent mfc = new MultipartFormDataContent())
            {
                mfc.Add(new StreamContent(documentContent), "file", fileName);

                return await _client.PostAsync<SignatursVerificationResponse>("SigningProcessesPrivate/verifySignedContent", mfc, CancellationToken.None);
            }
        }

        public async Task DeleteSigningProcessesAsync(Guid[] guids, CancellationToken cancellationToken)
        {
            using(var requestMessage = new HttpRequestMessage(HttpMethod.Delete, "SigningProcessesPrivate/DeleteSigningProcesses"))
            using (var content = new ObjectContent<Guid[]>(guids, Utilities.HttpClientExtensions.DefaultMediaTypeFormatterCollection.JsonFormatter))
            {
                requestMessage.Content = content;
                using (var response = await _client.SendAsync(requestMessage, cancellationToken))
                {
                    response.EnsureSuccessStatusCode();
                }
            }
        }
    }
}
