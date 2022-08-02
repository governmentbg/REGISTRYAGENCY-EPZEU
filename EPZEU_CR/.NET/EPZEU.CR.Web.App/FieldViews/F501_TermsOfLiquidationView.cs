﻿using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F501_TermsOfLiquidationView : FieldViewBase<F501_TermsOfLiquidation>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F501_TermsOfLiquidation field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(HttpUtility.HtmlEncode(field.Text));
            }

            if (!string.IsNullOrEmpty(field.TermType))
            {
                if(!string.IsNullOrEmpty(field.Text))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("CR_APP_WAY_DETERMINATE_TERM_L").ToLower());
                }
                else
                {
                    writer.Write(LocalizeLabel("CR_APP_WAY_DETERMINATE_TERM_L"));
                }

                writer.Write(": ");
                writer.Write(field.TermType);
            }
        }
    }
}