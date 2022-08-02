using AutoMapper;
using EPZEU.CR.Nomenclatures;
using Integration.EPZEU.Models.SearchCriteria;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Deeds.Mapping
{
    public class ReportsAutoMapperProfile : Profile
    {
        public ReportsAutoMapperProfile()
        {
            CreateDomainToViewModelMap();
            CreateViewToDomainModelMap();
        }

        private void CreateDomainToViewModelMap()
        {
            CreateMap<Integration.EPZEU.Models.CompanyInfo, CompanyInfo>();
            CreateMap<Integration.EPZEU.Models.ProtectedRightsCompanyInfo, ProtectedRightsCompanyInfo>();
            CreateMap<Integration.EPZEU.Models.SubjectInField, SubjectInFieldItem>().AfterMap((s, d) =>
            {
                d.CompanyFullName = s.Deed.CompanyFullName;
                d.CompanyNameSuffixFlag = s.Deed.CompanyNameSuffixFlag.HasValue ? s.Deed.CompanyNameSuffixFlag == Integration.EPZEU.Models.CompanyNameSuffixFlags.Liquidation ? "CR_APP_IN_LIQUIDATION_L" : "CR_APP_IN_INSOLVENCY_L" : null;
                d.UIC = s.Deed.UIC;
                d.FieldName = LocalizationHelper.GetFieldNameCode(s.FieldIdent);
            });

            CreateMap<DeedSearchCriteria, BulstatDeedsSearchCriteria>();
            CreateMap<DeedSummarySearchCriteria, BulstatDeedsSearchCriteria>();
        }

        private void CreateViewToDomainModelMap()
        {
            CreateMap<CompanyInfoSearchCriteria, CompanySearchCriteria>().AfterMap((s, d) =>
            {
                d.CompanyFirstLatter = string.IsNullOrEmpty(s.CompanyFirstLatter) ? (char?)null : s.CompanyFirstLatter.ToCharArray()[0];

                if (s.SortColumnOrder.HasValue)
                {
                    switch (s.SortColumnOrder.Value)
                    {
                        case (SortColumnsWithOrder.CompanyNameASC):
                            {
                                d.SortOrder = SortOrder.ASC;
                                d.SortType = CompanySearchCriteria.SortColumns.CompanyName;
                            }
                            break;
                        case (SortColumnsWithOrder.CompanyNameDESC):
                            {
                                d.SortOrder = SortOrder.DESC;
                                d.SortType = CompanySearchCriteria.SortColumns.CompanyName;
                            }
                            break;
                        case (SortColumnsWithOrder.ActiveFromASC):
                            {
                                d.SortOrder = SortOrder.ASC;
                                d.SortType = CompanySearchCriteria.SortColumns.ActiveFrom;
                            }
                            break;
                        case (SortColumnsWithOrder.ActiveFromDESC):
                            {
                                d.SortOrder = SortOrder.DESC;
                                d.SortType = CompanySearchCriteria.SortColumns.ActiveFrom;
                            }
                            break;
                        default:
                            throw new NotSupportedException("Not supported SortColumnsOrder value.");
                    }
                }
            });

            CreateMap<VerificationPersonOrgSearchCriteria, DeedSummarySearchCriteria>().AfterMap((s, d) =>
            {
                d.Name = s.Name;
                if (!string.IsNullOrWhiteSpace(s.Ident))
                {
                    d.UICs = new List<string>() { s.Ident };
                }
            });

            CreateMap<VerificationPersonOrgSearchCriteria, SubjectSearchCriteria>().AfterMap((s, d) =>
            {
                d.UIC = s.Ident;
            });

            CreateMap<BulstatDeedsSearchCriteria, DeedSearchCriteria>();
            CreateMap<BulstatDeedsSearchCriteria, DeedSummarySearchCriteria>();

        }
    }
}
