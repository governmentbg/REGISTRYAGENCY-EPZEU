using IdentityServer4.Stores;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Extensions
{
    /// <summary>
    /// Екстеншъни на идентити сървъра.
    /// </summary>
    public static class Extensions
    {
        /// <summary>
        /// Определя дали клиентът е конфигуриран да използва PKCE.
        /// </summary>
        /// <param name="store">The store.</param>
        /// <param name="client_id">The client identifier.</param>
        /// <returns></returns>
        public static async Task<bool> IsPkceClientAsync(this IClientStore store, string client_id)
        {
            if (!string.IsNullOrWhiteSpace(client_id))
            {
                var client = await store.FindEnabledClientByIdAsync(client_id);
                return client?.RequirePkce == true;
            }

            return false;
        }

        /// <summary>
        /// Изчистване на пътя в URL.
        /// </summary>
        /// <param name="url">Url.</param>
        /// <returns></returns>
        public static string CleanUrlPath(this string url)
        {
            if (String.IsNullOrWhiteSpace(url)) url = "/";

            if (url != "/" && url.EndsWith("/"))
            {
                url = url.Substring(0, url.Length - 1);
            }

            return url;
        }

        /// <summary>
        /// Изчистване на GUID
        /// </summary>
        /// <param name="guid">глобален уникален индентификатор.</param>
        /// <returns></returns>
        public static string CleanGUID(this Guid guid)
        {
            return guid.ToString("N");
        }

        public static string AddQueryString(this string url, string query)
        {
            if (!url.Contains("?"))
            {
                url += "?";
            }
            else if (!url.EndsWith("&"))
            {
                url += "&";
            }

            return url + query;
        }

        public static string AddQueryString(this string url, string name, string value)
        {
            return url.AddQueryString(name + "=" + System.Text.Encodings.Web.UrlEncoder.Default.Encode(value));
        }

        public static string GetTimeTextPresentation(this TimeSpan time)
        {
            string days = null, hours = null, minutes = null, seconds = null;

            if (time.Days > 0) days = $"{time.Days} дни";
            if (time.Hours > 0) hours = $"{time.Hours} часа";
            if (time.Minutes > 0) minutes = $"{time.Minutes} минути";
            if (time.Seconds > 0) seconds = $"{time.Seconds} секунди";

            return string.Join(", ", new string[] { days, hours, minutes, seconds }.Where(s => s != null));
        }

        /// <summary>
        /// Локализация на изображения само за английски език - проверява се само за него;
        /// </summary>
        /// <returns></returns>
        public static bool CanLocalizeImagePaths(this IUrlHelper urlHelper, out string langPostfixName)
        {
            langPostfixName = null;
            if (string.Compare(System.Globalization.CultureInfo.CurrentCulture.Name, "en", true) == 0)
            {
                langPostfixName = "en";
                return true;
            }
            return false;
        }

        public static string EnsureTrailingSlash(this string url)
        {
            if (url != null && !url.EndsWith("/"))
            {
                return url + "/";
            }

            return url;
        }
    }
}
