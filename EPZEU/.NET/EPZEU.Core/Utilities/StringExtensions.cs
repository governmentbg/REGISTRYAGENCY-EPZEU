
namespace System
{
    public static class StringExtensions
    {
        public static string NormalizeThumbprint(this string thumbprint)
        {
            return thumbprint?.Replace(" ", "").Replace("-", "").Replace("_", "");
        }
    }
}
