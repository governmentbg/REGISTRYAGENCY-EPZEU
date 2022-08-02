using AutoMapper;
using EPZEU.CR.Domain.Common;
using System.Text.Json;
using DomModels = EPZEU.CR.ApplicationProcesses.Models;

namespace EPZEU.CR.Web.App.Models.ApplicationProcesses.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateDomainToViewModelMap();
            CreateViewToDomainModelMap();
        }

        private void CreateDomainToViewModelMap()
        {
            CreateMap<DomModels.ApplicationProcess, ApplicationProcess>();

            CreateMap<DomModels.Application, Application>()
                .AfterMap((src, dst) =>
                {
                    if (src.ApplicationContent != null && src.ApplicationContent.Content != null)
                    {
                        /*Според документацията, конструктора на StreamReader освобождава подадения stream! Затова няма нужда да освобождава отново.
                         указваме на jsonTextReader да затваря подадения reader*/
                        using (src.ApplicationContent.Content)
                        {
                            using (var jDocument = JsonDocument.Parse(src.ApplicationContent.Content))
                            {
                                dst.Content = jDocument.RootElement.Clone();
                            }
                        }
                    }
                });

            CreateMap<DomModels.ApplicationDocument, AttachedDocument>().AfterMap((src, dst) =>
            {
                dst.Guid = src.BackofficeGuid;

                //TODO: Да се уеднакваят имената
                dst.Description = src.Name;
                dst.ReusedIncomingNumber = src.IncomingNumber;
                dst.ApplicationDocumentID = src.ApplicationDocumentID;

                if (src.FileMetadata == null)
                    src.FileMetadata = new Integration.EPZEU.Models.FileMetadata();
                if (dst.FileMetadata == null)
                    dst.FileMetadata = new Integration.EPZEU.Models.FileMetadata();

                dst.Size = src.FileMetadata.Size;
                dst.NumberOfPages = src.FileMetadata.NumberOfPages;
                dst.Hash = src.FileMetadata.Hash;
                dst.HashAlgorithm = src.FileMetadata.HashAlgorithm;
                dst.ContentType = src.FileMetadata.ContentType;
            });
        }

        private void CreateViewToDomainModelMap()
        {
            CreateMap<AttachedDocument, DomModels.ApplicationDocument>().AfterMap((s, d) =>
            {
                d.BackofficeGuid = s.Guid;

                //TODO: Да се уеднакваят имената
                d.Name = s.Description;
                d.IncomingNumber = s.ReusedIncomingNumber;
            });
        }
    }
}
