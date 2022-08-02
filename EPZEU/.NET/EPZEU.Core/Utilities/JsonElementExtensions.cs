namespace System.Text.Json
{
    public static class JsonElementExtensions
    {
        /// <summary>
        /// TODO в следващи версии ще има директно апи. 
        /// https://github.com/dotnet/corefx/issues/42056
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="element"></param>
        /// <returns></returns>
        public static TValue Deserialize<TValue>(this JsonElement element)
        {
            return EPZEUJsonSerializer.Deserialize<TValue>(element.GetRawText());
        }
    }
}
