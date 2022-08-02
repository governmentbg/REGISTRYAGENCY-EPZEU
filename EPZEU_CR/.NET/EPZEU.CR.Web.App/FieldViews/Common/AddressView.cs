using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures.Models;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class AddressView : ObjectViewBase<Address>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Address model)
        {
            Country bgCountry = Coutries.GetBGCountry();
            bool hasCountryCode = !string.IsNullOrEmpty(model.CountryCode);

            if (!string.IsNullOrEmpty(model.Country))
            {
                writer.Write(LocalizeLabel("GL_COUNTRY_L"));
                writer.Write(": ");
                writer.Write(model.Country);
                writer.Write("<br/>");
            }

            if(hasCountryCode && string.Compare(model.CountryCode, bgCountry.Code, true) == 0)
            {
                //Ако държавата е България.
                if (!string.IsNullOrEmpty(model.District))
                {
                    writer.Write(LocalizeLabel("GL_REGION_L"));
                    writer.Write(": ");
                    writer.Write(model.District);
                }

                if(!string.IsNullOrEmpty(model.Municipality))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("GL_MUNICIPALITY_L"));
                    writer.Write(": ");
                    writer.Write(model.Municipality);
                }

                if(!string.IsNullOrEmpty(model.Settlement))
                {
                    writer.Write("<br />");
                    writer.Write(LocalizeLabel("GL_PLACE_L"));
                    writer.Write(": ");
                    writer.Write(model.Settlement);

                    if (!string.IsNullOrEmpty(model.PostCode))
                    {
                        writer.Write(", ");
                        writer.Write(LocalizeLabel("GL_POST_CODE_L"));
                        writer.Write(" ");
                        writer.Write(model.PostCode);
                    }
                }

                if (!string.IsNullOrEmpty(model.Area))
                {
                    writer.Write("<br />");
                    writer.Write(model.Area);
                }
            } 
            else
            {
                if (!string.IsNullOrEmpty(model.ForeignPlace))
                {
                    writer.Write(LocalizeLabel("GL_PLACE_L"));
                    writer.Write(": ");
                    writer.Write(model.ForeignPlace);

                }
            }

            bool hasHousingEstate = !string.IsNullOrEmpty(model.HousingEstate);
            bool hasStreet = !string.IsNullOrEmpty(model.Street);

            if (hasHousingEstate)
            {
                writer.Write("<br />");
                writer.Write(LocalizeLabel("GL_RESIDENCE_ABBREVATION_L"));
                writer.Write(" ");
                writer.Write(model.HousingEstate);
            }

            if (hasStreet)
            {
                if(hasHousingEstate)
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("GL_STREET_ABBREVATION_L"));
                writer.Write(" ");
                writer.Write(model.Street);

                if (!string.IsNullOrEmpty(model.StreetNumber))
                {
                    writer.Write(" ");
                    writer.Write(LocalizeLabel("GL_NUMBER_ABBREVATION_L"));
                    writer.Write(" ");
                    writer.Write(model.StreetNumber);
                }
            }

            bool hasBlock = !string.IsNullOrEmpty(model.Block);

            if (hasBlock)
            {
                if(hasHousingEstate || hasStreet)
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("GL_BUILDING_ABBREVATION_L"));
                writer.Write(" ");
                writer.Write(model.Block);
            }

            if (!string.IsNullOrEmpty(model.Entrance))
            {
                if (hasHousingEstate || hasStreet || hasBlock)
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("GL_ENTRANCE_ABBREVATION_L"));
                writer.Write(" ");
                writer.Write(model.Entrance);
            }

            if (!string.IsNullOrEmpty(model.Floor))
            {
                if (hasHousingEstate || hasStreet || hasBlock)
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("GL_FLOOR_ABBREVATION_L"));
                writer.Write(" ");
                writer.Write(model.Floor);
            }

            if (!string.IsNullOrEmpty(model.Apartment))
            {
                if (hasHousingEstate || hasStreet || hasBlock)
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("GL_FLAT_ABBREVATION_L"));
                writer.Write(" ");
                writer.Write(model.Apartment);
            }
        }
    }
}
