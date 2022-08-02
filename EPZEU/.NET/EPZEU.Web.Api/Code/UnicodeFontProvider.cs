using iTextSharp.text;
using iTextSharp.text.pdf;

namespace EPZEU.Web.Api.Code
{
    public class UnicodeFontProvider : FontFactoryImp
    {
        public static string DEFAULT_FONT_NAME = "Arial";

        public UnicodeFontProvider() : base()
        {
            this.RegisterDirectories();
        }

        /// <summary>
        /// Provides a font with BaseFont.IDENTITY_H encoding.
        /// </summary>
        public override Font GetFont(string fontname, string encoding, bool embedded, float size, int style, BaseColor color, bool cached)
        {
            var font = base.GetFont(fontname, encoding, embedded, size, style, color, cached);
            if (font.BaseFont == null)
                font = base.GetFont(DEFAULT_FONT_NAME, BaseFont.IDENTITY_H, embedded, size, style, color, cached);
            
            return font;
        }
    }
}
