using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А17 Заявление за вписване на обстоятелства отностно народно читалище"
    /// </summary>
    internal class A17Provider : ApplicationFormAProviderBase<A17>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.CC;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Representatives

            if (application.Fields.Representatives103 == null)
            {
                application.Fields.Representatives103 = new F0103_Representatives103();
            }

            if (application.Fields.Representatives103.RepresentativeList == null)
            {
                application.Fields.Representatives103.RepresentativeList = new List<F0103_Representative103>();
            }

            //Трябва да има поне един
            if (application.Fields.Representatives103.RepresentativeList.Count == 0)
            {
                var representative = new F0103_Representative103()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.Representatives103.RepresentativeList.Add(representative);
            }

            #endregion

            #region BoardOfTrusties13g

            if (application.Fields.BoardOfTrusties13g == null)
            {
                application.Fields.BoardOfTrusties13g = new F013g_BoardOfTrusties13g();
            }

            if (application.Fields.BoardOfTrusties13g.BoardOfTrusties13gMandate == null)
            {
                application.Fields.BoardOfTrusties13g.BoardOfTrusties13gMandate = new F013g_BoardOfTrusties13gMandate();
            }

            if (application.Fields.BoardOfTrusties13g.Trustees13gList == null)
            {
                application.Fields.BoardOfTrusties13g.Trustees13gList = new List<F013g_Trustee13g>();
            }

            //Трябва да има поне един
            if (application.Fields.BoardOfTrusties13g.Trustees13gList.Count == 0)
            {
                var trustee = new F013g_Trustee13g()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.BoardOfTrusties13g.Trustees13gList.Add(trustee);
            }

            #endregion


            #region VerificationCommission15b

            if (application.Fields.VerificationCommission15b == null)
            {
                application.Fields.VerificationCommission15b = new F015b_VerificationCommission15b();
            }

            if (application.Fields.VerificationCommission15b.VerificationCommission15bMandate == null)
            {
                application.Fields.VerificationCommission15b.VerificationCommission15bMandate = new F015b0_VerificationCommission15bMandate();
            }

            if (application.Fields.VerificationCommission15b.CommissionMembers15bList == null)
            {
                application.Fields.VerificationCommission15b.CommissionMembers15bList = new List<F015b1_CommissionMember15b>();
            }

            //Трябва да има поне един
            if (application.Fields.VerificationCommission15b.CommissionMembers15bList.Count == 0)
            {
                var item = new F015b1_CommissionMember15b()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.VerificationCommission15b.CommissionMembers15bList.Add(item);
            }

            #endregion

            #region  SourcesOfInitialFinancing25v

            if (application.Fields.SourcesOfInitialFinancing25v == null)
            {
                application.Fields.SourcesOfInitialFinancing25v = new F025v_SourcesOfInitialFinancing25v();
            }

            #endregion

            return result;
        }
    }
}
