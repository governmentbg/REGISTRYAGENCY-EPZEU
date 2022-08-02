using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F022_ForeignTradersView : FieldViewBase<F022_ForeignTraders>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F022_ForeignTraders field)
        {
            //Държава
            if (field.ForeignTraderCountry != null)
            {
                WrapRecordForDisplay(writer, field.ForeignTraderCountry, (wr, f) =>
                {
                    if (string.IsNullOrEmpty(f.CountryCode))
                    {
                        if (f.IsEUCountry)
                        {
                            wr.Write(LocalizeLabel("GL_COUNTRY_L"));
                            wr.Write(": ");
                            wr.Write(LocalizeLabel("CR_APP_EUROPEAN_UNION_L"));
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(f.Country))
                            {
                                wr.Write(LocalizeLabel("GL_COUNTRY_L"));
                                wr.Write(": ");
                                wr.Write(HttpUtility.HtmlEncode(f.Country));
                            }
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(f.Country))
                        {
                            wr.Write(LocalizeLabel("GL_COUNTRY_L"));
                            wr.Write(": ");
                            wr.Write(HttpUtility.HtmlEncode(f.Country));
                        }
                    }
                });
            }

            //Регистрация
            if (field.ForeignTraderRegistration != null)
            {
                WrapRecordForDisplay(writer, field.ForeignTraderRegistration, (wr, f) =>
                {
                    wr.Write(LocalizeLabel("CR_GL_COMPANY_NAME_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.Name));
                    wr.Write("<br/>");

                    //Регистър.
                    if (!string.IsNullOrEmpty(f.ForeignRegisterCode))
                    {
                        var r = ForeignComRegisters.GetForeignComRegister(f.ForeignRegisterCode);

                        if (r != null)
                        {
                            if (r.IsOther)
                            {
                                wr.Write(LocalizeLabel("GL_REGISTER_L"));
                                wr.Write(": ");
                                wr.Write(HttpUtility.HtmlEncode(f.Register));
                                wr.Write("<br/>");
                            }
                            else
                            {
                                wr.Write(LocalizeLabel("CR_GL_COMPANY_TRADE_CENTRAL_REGISTER_L"));
                                wr.Write(": ");
                                wr.Write(HttpUtility.HtmlEncode(r.NameOriginal));
                                wr.Write("<br/>");
                            }
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(f.Register))
                        {
                            wr.Write(LocalizeLabel("GL_REGISTER_L"));
                            wr.Write(": ");
                            wr.Write(HttpUtility.HtmlEncode(f.Register));
                            wr.Write("<br/>");
                        }
                    }

                    //Номер на вписване в регистъра.
                    if (!string.IsNullOrEmpty(f.EntryNumber))
                    {
                        wr.Write(LocalizeLabel("CR_APP_ENTRY_NO_REGISTER_L"));
                        wr.Write(": ");
                        wr.Write(HttpUtility.HtmlEncode(f.EntryNumber));
                        wr.Write("<br/>");
                    }

                    //Правна форма.
                    if (!string.IsNullOrEmpty(f.ForeignLegalFormCode))
                    {
                        var lf = ForeignLegalForms.GetForeignLegalForm(f.ForeignLegalFormCode);

                        if (lf != null)
                        {
                            wr.Write(LocalizeLabel("GL_LEGAL_FORM_L"));
                            wr.Write(": ");

                            if (lf.IsOther)
                                wr.Write(HttpUtility.HtmlEncode(f.LegalForm));
                            else
                                wr.Write(HttpUtility.HtmlEncode(lf.Name));
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(f.LegalForm))
                        {
                            wr.Write(LocalizeLabel("GL_LEGAL_FORM_L"));
                            wr.Write(": ");
                            wr.Write(HttpUtility.HtmlEncode(f.LegalForm));
                        }
                    }
                });
            }

            //Заличаване на чуждестранния търговец/ ЮЛНЦ.
            if (field.AddemptionOfForeignTrader != null)
            {
                WrapRecordForDisplay(writer, field.AddemptionOfForeignTrader, (wr, f) =>
                {
                    if (f.Checked)
                    {
                        wr.Write(LocalizeLabel("CR_GL_DELETION_FOREIGN_TRADER_L"));
                        wr.Write(": ");
                        wr.Write(LocalizeLabel("GL_DELETED_L"));
                    }
                });
            }

            WrapRecordListForDisplay(writer, field.ForeignTraderList, (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_GL_REPRESENTATIVE_L"));
                wr.Write(": ");
                wr.Write(f.Text);
            });

            //Начин на представяне
            if (field.ForeignTraderWayOfRepresentation != null)
            {
                WrapRecordForDisplay(writer, field.ForeignTraderWayOfRepresentation, (wr, f) =>
                {
                    if (f.Jointly)
                    {
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                        wr.Write(":<br/>");
                        wr.Write(LocalizeLabel("GL_TOGETHER_L"));
                    }

                    if (f.Severally)
                    {
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                        wr.Write(":<br/>");
                        wr.Write(LocalizeLabel("GL_SEPARATELY_L"));
                    }

                    if (f.OtherWay)
                    {
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                        wr.Write(":<br/>");
                        wr.Write(LocalizeLabel("GL_OTHER_WAY_L"));
                        wr.Write("<br/>");
                        wr.Write(HttpUtility.HtmlEncode(f.Text));
                    }
                });
            }
        }
    }
}