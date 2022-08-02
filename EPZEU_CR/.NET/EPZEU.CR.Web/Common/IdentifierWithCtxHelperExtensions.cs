using EPZEU.Web.DataProtection;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EPZEU.CR.Web
{
    public static class IdentifierWithCtxHelperExtensions
    {
        #region Constants

        private static readonly string _empty = "e";
        private static readonly char _identsSeparator = '&';

        // максимална дължина на идентификатора за име на фирма
        private static readonly int _companyNameMaxLength = 60;

        // брой байтове на генерирания хеш на данните, зависи от избрания алгоритъм
        private static readonly int _hashBytesLength = 32;

        #endregion

        #region Helpers

        private static bool IsUIC(string text)
        {
            return text?.Length == 9;
        }

        private static bool IsIncomingNumber(string text)
        {
            return text?.Length == 14;
        }

        private static bool IsDocGuid(string text)
        {
            return text?.Length == 32;
        }

        private static bool TryExtractIdentifiers(IDataProtectorService dataProtectorService, string inputIdentifier, ref string item1, ref string item2, ref string item3)
        {
            try
            {
                string result = DecodeValuesInternal(dataProtectorService, inputIdentifier);

                string[] resArray = result.Split(_identsSeparator);

                if (resArray != null)
                {
                    for (int i = 0; i < resArray.Length; i++)
                    {
                        if (resArray[i] == _empty)
                            resArray[i] = null;
                    }

                    if (resArray.Length > 0)
                        item1 = resArray[0];

                    if (resArray.Length > 1)
                        item2 = resArray[1];

                    if (resArray.Length > 2)
                        item3 = resArray[2];
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private static bool TryExtractIdentifiers(IDataProtectorService dataProtectorService, string inputIdentifier, ref string uic, ref string incomingNumber)
        {
            try
            {
                string result = DecodeValuesInternal(dataProtectorService, inputIdentifier);
                string[] resArray = result.Split(_identsSeparator);

                if (resArray != null)
                {
                    for (int i = 0; i < resArray.Length; i++)
                    {
                        if (resArray[i] == _empty)
                            resArray[i] = null;
                    }

                    if (resArray.Length > 0)
                        uic = resArray[0];

                    if (resArray.Length > 1)
                        incomingNumber = resArray[1];
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private static string DecodeValuesInternal(IDataProtectorService dataProtectorService, string encodedValue)
        {
            var encodedBytes = WebEncoders.Base64UrlDecode(encodedValue);
            var hashBytes = new byte[_hashBytesLength];
            var dataBytes = new byte[encodedBytes.Length - _hashBytesLength];

            Array.Copy(encodedBytes, encodedBytes.Length - _hashBytesLength, hashBytes, 0, _hashBytesLength);
            Array.Copy(encodedBytes, 0, dataBytes, 0, dataBytes.Length);

            string result = Encoding.UTF8.GetString(dataBytes);

            var hashBytesCheck = dataProtectorService.Sign(dataBytes);

            if (!hashBytesCheck.SequenceEqual(hashBytes))
                throw new InvalidOperationException("Hashed values do not match!");

            return result;
        }

        private static string CombineIdentifiers(IDataProtectorService dataProtectorService, params string[] items)
        {
            string dataConcat = string.Join(_identsSeparator, items.Select(item => string.IsNullOrEmpty(item) ? _empty : item));

            var dataBytes = Encoding.UTF8.GetBytes(dataConcat);
            var hashBytes = dataProtectorService.Sign(dataBytes);

            var res = dataBytes.Concat(hashBytes).ToArray();

            return WebEncoders.Base64UrlEncode(res);
        }

        #endregion

        #region Public Methods

        public static string CombineUicWithCtx(this IDataProtectorService dataProtectorService, string uic, string companyName)
        {
            //Пазят се само първите _companyNameMaxLength символа от името на фирмата
            if (!string.IsNullOrEmpty(companyName) && companyName.Length > _companyNameMaxLength)
                companyName = companyName.Substring(0, _companyNameMaxLength);

            return CombineIdentifiers(dataProtectorService, uic, companyName);
        }

        public static string ExtractUicWithCtx(this IDataProtectorService dataProtectorService, string inputIdentifier, ref string companyName)
        {
            string resultUic = null;

            if (IsUIC(inputIdentifier)
                || !TryExtractIdentifiers(dataProtectorService, inputIdentifier, ref resultUic, ref companyName))
            {
                resultUic = inputIdentifier;
            }

            return resultUic;
        }


        public static string CombineIncomingNumberWithCtx(this IDataProtectorService dataProtectorService, string incomingNumber, string uic, string companyName)
        {
            //Пазят се само първите _companyNameMaxLength символа от името на фирмата
            if (!string.IsNullOrEmpty(companyName) && companyName.Length > _companyNameMaxLength)
                companyName = companyName.Substring(0, _companyNameMaxLength);

            return CombineIdentifiers(dataProtectorService, uic, incomingNumber, companyName);
        }

        public static string ExtractIncomingNumberWithCtx(this IDataProtectorService dataProtectorService, string inputIdentifier, ref string uic, ref string companyName)
        {
            string resultIncomingNumber = null;

            if (IsIncomingNumber(inputIdentifier)
                 || !TryExtractIdentifiers(dataProtectorService, inputIdentifier, ref uic, ref resultIncomingNumber, ref companyName))
            {
                resultIncomingNumber = inputIdentifier;
            }

            return resultIncomingNumber;
        }

        public static string CombineDocGuidWithCtx(this IDataProtectorService dataProtectorService, string docGuid, string incomingNumbers, string uic)
        {
            return CombineIdentifiers(dataProtectorService, uic, incomingNumbers, docGuid);
        }

        public static string ExtractDocGuidWithCtx(this IDataProtectorService dataProtectorService, string inputIdentifier, ref string incomingNumber, ref string uic)
        {
            string resultDocGuid = null;

            if (IsDocGuid(inputIdentifier)
                || !TryExtractIdentifiers(dataProtectorService, inputIdentifier, ref uic, ref incomingNumber, ref resultDocGuid))
            {
                resultDocGuid = inputIdentifier;
            }

            return resultDocGuid;
        }

        public static string CombineCompCaseDocGuidWithCtx(this IDataProtectorService dataProtectorService, string docGuid, string companyCase)
        {
            //Пазят се само първите 40 символа от името
            if (!string.IsNullOrEmpty(companyCase) && companyCase.Length > 40)
                companyCase = companyCase.Substring(0, 40);

            return CombineIdentifiers(dataProtectorService, companyCase, docGuid);
        }

        public static string ExtractCompCaseDocGuidWithCtx(this IDataProtectorService dataProtectorService, string inputIdentifier, ref string companyCase)
        {
            string resultDocGuid = null;

            if (IsDocGuid(inputIdentifier))
            {
                resultDocGuid = inputIdentifier;
            }
            else
            {
                TryExtractIdentifiers(dataProtectorService, inputIdentifier, ref companyCase, ref resultDocGuid);
            }

            return resultDocGuid;
        }


        #endregion
    }
}
