
namespace System
{
    public static class DateTimeExtensions
    {
        /// <summary>
        /// Използва се, за да се върне датата в определен формат като таг в отговор на заявка от браузър. В зависимост от
        /// тази стойност браузърът решава дали да ползва кеш-а.
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string FormatForETag(this DateTime dateTime)
        {
            return dateTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
        }
    }
}
