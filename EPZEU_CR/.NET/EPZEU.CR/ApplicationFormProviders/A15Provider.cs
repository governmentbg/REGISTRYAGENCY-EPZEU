using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А15 Заявление за вписване на обстоятелства относно сдружение"
    /// </summary>
    internal class A15Provider : ApplicationFormAProviderBase<A15>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.ASSOC;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

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
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();
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

            #region Authorities12g

            if (application.Fields.Authorities12g == null)
            {
                application.Fields.Authorities12g = new F012g_Authorities12g();
            }

            if (application.Fields.Authorities12g.Authorities12gList == null)
            {
                application.Fields.Authorities12g.Authorities12gList = new List<F012g_Authority12g>();
            }

            //Трябва да има поне един
            if (application.Fields.Authorities12g.Authorities12gList.Count == 0)
            {
                var authority = new F012g_Authority12g();

                application.Fields.Authorities12g.Authorities12gList.Add(authority);
            }

            #endregion


            #region ManagementBodies12d

            if (application.Fields.ManagementBodies12d == null)
            {
                application.Fields.ManagementBodies12d = new F012d_ManagementBodies12d();
            }

            if (application.Fields.ManagementBodies12d.ManagementBody12dMandate == null)
            {
                application.Fields.ManagementBodies12d.ManagementBody12dMandate = new F012d_ManagementBody12dMandate();
            }

            if (application.Fields.ManagementBodies12d.ManagementBodies12dList == null)
            {
                application.Fields.ManagementBodies12d.ManagementBodies12dList = new List<F012d_ManagementBody12d>();
            }

            //Трябва да има поне един
            if (application.Fields.ManagementBodies12d.ManagementBodies12dList.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();

                var body = new F012d_ManagementBody12d()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.ManagementBodies12d.ManagementBodies12dList.Add(body);
            }

            #endregion

            return result;
        }
    }
}
