using CNSys.Data;
using EPZEU.CR.ApplicationProcesses.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationProcesses.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип ApplicationProcess.
    /// </summary>
    public interface IApplicationProcessRepository : IRepositoryAsync<ApplicationProcess, long?, ApplicationProcessSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationProcessEntity за поддържане и съхранение на обекти от тип ApplicationProcess.
    /// </summary>
    internal class ApplicationProcessEntity : RepositoryBase<ApplicationProcess, long?, ApplicationProcessSearchCriteria, ApplicationProcessDataContext>, IApplicationProcessRepository
    {
        #region Constructors

        public ApplicationProcessEntity(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected async override Task CreateInternalAsync(ApplicationProcessDataContext context, ApplicationProcess item, CancellationToken cancellationToken)
        {
            item.ApplicationProcessID = await context.ApplicationProcessCreateAsync(item.UIC,
                                             item.ApplicantID,
                                             (short?)item.Status,
                                             item.MainApplicationID,
                                             (short?)item.MainApplicationType,
                                             item.SigningGuid,
                                             item.ParentApplicationProcessID,
                                             item.IncomingNumber,
                                             item.ErrorMessage,
                                             item.AdditionalDataString,
                                             cancellationToken);
        }

        protected override Task UpdateInternalAsync(ApplicationProcessDataContext context, ApplicationProcess item, CancellationToken cancellationToken)
        {
            return context.ApplicationProcessUpdateAsync(item.ApplicationProcessID,
                                         item.UIC,
                                         item.ApplicantID,
                                         (short?)item.Status,
                                         item.MainApplicationID,
                                         (short?)item.MainApplicationType,
                                         item.SigningGuid,
                                         item.ParentApplicationProcessID,
                                         item.IncomingNumber,
                                         item.ErrorMessage,
                                         item.AdditionalDataString,
                                         cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            if (key == null)
                throw new ArgumentNullException();

            return context.ApplicationProcessDeleteAsync(key, cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, ApplicationProcess item, CancellationToken cancellationToken)
        {
            return DeleteInternalAsync(context, item.ApplicationProcessID, cancellationToken);
        }

        protected async override Task<ApplicationProcess> ReadInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            var data = (await SearchInternalAsync(context, new ApplicationProcessSearchCriteria() { ApplicationProcessID = key.Value }, cancellationToken)).ToList();

            if (data == null || data.Count != 1)
                throw new NotSupportedException("Read must return exactly one item");

            return data.Single();
        }

        protected async override Task<IEnumerable<ApplicationProcess>> SearchInternalAsync(ApplicationProcessDataContext context, PagedDataState state, ApplicationProcessSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var res = await context.ApplicationProcessSearchAsync(
                                                                  searchCriteria.ApplicationProcessID,
                                                                  searchCriteria.ApplicantCIN,
                                                                  (short?)searchCriteria.MainApplicationType,
                                                                  searchCriteria.IsParent,
                                                                  searchCriteria.SigningGiud,
                                                                  searchCriteria.LoadOption?.LoadApplications,
                                                                  searchCriteria.LoadOption?.LoadApplicationDocuments,
                                                                  searchCriteria.LoadOption?.LoadApplicationContent,
                                                                  searchCriteria.LoadOption?.LoadChildApplicationProcesses,
                                                                  searchCriteria.LoadOption?.LoadWithLock,
                                                                  state.StartIndex,
                                                                  state.PageSize,
                                                                  (state.StartIndex == 1),
                                                                  searchCriteria.MaxNumberOfRecords,
                                                                  cancellationToken);

            List<ApplicationProcess> applicationProcesses = null;

            using (var reader = res.reader)
            {
                applicationProcesses = reader.ReadToList<ApplicationProcess>();

                List<Application> applications = new List<Application>();
                List<ApplicationDocument> applicationDocuments = new List<ApplicationDocument>();
                List<ApplicationProcessContent> applicationProcessContents = new List<ApplicationProcessContent>();
                List<ApplicationProcess> childApplicationProcesses = new List<ApplicationProcess>();

                if (searchCriteria.LoadOption != null && searchCriteria.LoadOption.LoadApplications.GetValueOrDefault())
                {
                    applications = reader.ReadToList<Application>();
                }

                if (searchCriteria.LoadOption != null && searchCriteria.LoadOption.LoadApplicationDocuments.GetValueOrDefault())
                {
                    applicationDocuments = reader.ReadToList<ApplicationDocument>();
                }

                if (searchCriteria.LoadOption != null && searchCriteria.LoadOption.LoadApplicationContent.GetValueOrDefault())
                {
                    applicationProcessContents = reader.ReadToList<ApplicationProcessContent>();
                }

                if (searchCriteria.LoadOption != null && searchCriteria.LoadOption.LoadChildApplicationProcesses.GetValueOrDefault())
                {
                    childApplicationProcesses = reader.ReadToList<ApplicationProcess>();
                }

                if (applications.Any() || applicationDocuments.Any() || applicationProcessContents.Any() || childApplicationProcesses.Any())
                {
                    foreach (var applicationProcess in applicationProcesses)
                    {
                        foreach (var application in applications)
                        {
                            applicationProcess.Applications = applications.Where(x => x.ApplicationProcessID == applicationProcess.ApplicationProcessID).ToList();

                            if (applicationDocuments.Any())
                            {
                                application.Documents = applicationDocuments.Where(x => x.ApplicationID == application.ApplicationID).ToList();
                            }
                            if (applicationProcessContents.Any())
                            {
                                application.ApplicationContent = applicationProcessContents.SingleOrDefault(x => x.ApplicationProcessContentID == application.ApplicationContentID);
                                application.ApplicationContent.Content = ApplicationProcessDataContext.CreateApplicationProcessContenReadStream(application.ApplicationContent.ApplicationProcessContentID.Value, DbContextProvider);
                            }
                        }

                        applicationProcess.ChildApplicationProcesses = childApplicationProcesses.Where(ap => ap.ParentApplicationProcessID == applicationProcess.ApplicationProcessID).ToList();
                    }
                }
            }
            state.Count = res.count ?? state.Count;

            return applicationProcesses;
        }

        protected override Task<IEnumerable<ApplicationProcess>> SearchInternalAsync(ApplicationProcessDataContext context, ApplicationProcessSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
