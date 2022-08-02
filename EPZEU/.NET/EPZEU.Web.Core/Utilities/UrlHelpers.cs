using System;

namespace EPZEU.Web.Utilities
{
    public static class UrlHelpers
    {
        public static string PrepareUrl(string url)
        {
            var webProtocol = "";

            if (url.IndexOf("http://") > -1 || url.IndexOf("https://") > -1)
            {
                //Запазваме си уеб протокола
                webProtocol = new Uri(url).Scheme + "://";
                url = url.Replace(webProtocol, "");
            }

            //Заменяме всички двойни наклонени с единични
            url = url.Replace("//", "/");

            //Махаме ако накрая има наклонена черта
            if (url[url.Length - 1] == '/')
                url = url.Remove(url.Length - 1);

            //Връщаме обратно протокола
            if (!string.IsNullOrWhiteSpace(webProtocol))
                url = webProtocol + url;

            return url;
        }
    }
}