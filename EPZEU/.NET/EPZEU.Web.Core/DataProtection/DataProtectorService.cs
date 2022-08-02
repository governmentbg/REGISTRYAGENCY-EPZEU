using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography;
using System.Text;

namespace EPZEU.Web.DataProtection
{
    /// <summary>
    /// Интерфейс за работа със защита на данни.
    /// </summary>
    public interface IDataProtectorService
    {
        /// <summary>
        /// Операция за защитаване.
        /// </summary>
        /// <param name="plainText">Обикновен текст.</param>
        /// <returns></returns>
        string Protect(string plainText);

        /// <summary>
        /// Операция за дешифриране.
        /// </summary>
        /// <param name="cipherText">Шифър</param>
        /// <returns></returns>
        string Unprotect(string cipherText);

        /// <summary>
        /// Подписване
        /// </summary>
        /// <param name="data">данни за подписване.</param>
        /// <returns>подпис</returns>
        byte[] Sign(byte[] data);
    }

    /// <summary>
    /// Защита на чувствителни данни.
    /// </summary>
    public class GenericDataProtectorService : IDataProtectorService
    {
        private const string Purpose = "GenericDataProtection";
        private readonly IDataProtector _dataProtector;
        private readonly IConfiguration _configuration;

        private readonly Lazy<byte[]> Key;

        public GenericDataProtectorService(IDataProtectionProvider provider, IConfiguration configuration)
        {
            _dataProtector = provider.CreateProtector(Purpose);
            _configuration = configuration.GetEPZEUSection();

            Key = new Lazy<byte[]>(() => Convert.FromBase64String(_configuration["CR_PORTAL_HASHKEY"]));
        }

        public string Protect(string plainText)
        {
            return string.IsNullOrEmpty(plainText) ? "" : _dataProtector.Protect(plainText);
        }

        public string Unprotect(string cipherText)
        {
            return string.IsNullOrEmpty(cipherText) ? "" : _dataProtector.Unprotect(cipherText);
        }

        public byte[] Sign(byte[] data)
        {
            using (HMACSHA256 hash = new HMACSHA256(Key.Value))
            {
                return hash.ComputeHash(data);
            }
        }
    }
}
