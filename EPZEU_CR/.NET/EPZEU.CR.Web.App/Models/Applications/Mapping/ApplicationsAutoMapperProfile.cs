using AutoMapper;
using Integration.EPZEU.Models.SearchCriteria;

namespace EPZEU.CR.Web.App.Models.Applications.Mapping
{
    public class ApplicationsAutoMapperProfile: Profile
    {
        public ApplicationsAutoMapperProfile()
        {
            CreateDomainToViewModelMap();
            CreateViewToDomainModelMap();
        }

        private void CreateDomainToViewModelMap()
        {
            CreateMap<ApplicationInfoSearchCriteria, ApplicationTransformationsSearchCriteria>();
            CreateMap<ApplicationInfoSearchCriteria, DocumentsWithoutDeedSearchCriteria>();
            CreateMap<Integration.EPZEU.Models.ApplicationDocumentInfo, ApplicationDocumentInfo>();
            CreateMap<Integration.EPZEU.Models.OutgoingDocument, OutgoingDocument>();
        }

        private void CreateViewToDomainModelMap()
        {
            CreateMap<ApplicationTransformationsSearchCriteria, ApplicationInfoSearchCriteria>();
            CreateMap<DocumentsWithoutDeedSearchCriteria, ApplicationInfoSearchCriteria>();
            CreateMap<ApplicationDocumentInfo, Integration.EPZEU.Models.ApplicationDocumentInfo>();
            CreateMap<OutgoingDocument, Integration.EPZEU.Models.OutgoingDocument>();
        }
    }
}
