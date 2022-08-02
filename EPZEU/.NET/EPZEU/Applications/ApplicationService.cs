using CNSys;
using CNSys.Data;
using EPZEU.Applications.Models;
using EPZEU.Applications.Repositories;
using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Applications
{
    /// <summary>
    /// Интерфейс на услуга за работа с подадени заявления.
    /// </summary>
    public interface IApplicationService
    {
        /// <summary>
        /// Създава запис за подадено заявление.
        /// </summary>
        /// <param name="application">Подадено заявлени</param>
        /// <param name="cancellationToken">билет за отказване на операция</param>   
        Task CreateApplicationAsync(Application application, CancellationToken cancellationToken);

        /// <summary>
        /// Променя резултата на заявлението.
        /// </summary>
        /// <param name="requests">Заявка за промяна на резулта</param>
        /// <param name="register"></param>
        /// <param name="cancellationToken">билет за отказване на операция</param>
        Task<OperationResult<OperationResultTypes>> UpdateApplicationResultAsync(List<ApplicationUpdateRequest> requests, Registers register, CancellationToken cancellationToken);

        /// <summary>
        /// Търси подадени заявления.
        /// </summary>
        /// <param name="state"></param>
        /// <param name="searchCriteria">Критерии за търсене.</param>
        /// <returns></returns>
        Task<IEnumerable<Application>> SearchApplicationsAsync(ApplicationSearchCriteria searchCriteria, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationService за работа с подадени заявления.
    /// </summary>
    internal class ApplicationService : IApplicationService
    {
        private readonly IApplicationRepository _applicationRepository;
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;
        private readonly Nomenclatures.IApplicationTypes _appTypes;

        public ApplicationService(IApplicationRepository applicationRepository, IDbContextOperationExecutor dbContextOperationExecutor, Nomenclatures.IApplicationTypes appTypes)
        {
            _applicationRepository = applicationRepository;
            _dbContextOperationExecutor = dbContextOperationExecutor;
            _appTypes = appTypes;
        }

        #region IApplicationService

        public Task CreateApplicationAsync(Application application, CancellationToken cancellationToken)
        {
            if (!application.ApplicationTypeID.HasValue && !string.IsNullOrEmpty(application.ApplicationType) && application.Register.HasValue)
            {
                DateTime? lastModifiedDate;
                var appTypes = _appTypes.GetApplicationTypes("bg", application.Register, out lastModifiedDate);

                application.ApplicationTypeID = appTypes.Where(at => at.AppType == application.ApplicationType).Single().ApplicationTypeID;
            }

            return _applicationRepository.CreateAsync(application, cancellationToken);
        }

        public Task<OperationResult<OperationResultTypes>> UpdateApplicationResultAsync(List<ApplicationUpdateRequest> requests, Registers register, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbContext, innerToken) =>
            {
                var applications = (await _applicationRepository.SearchAsync(new ApplicationSearchCriteria() { IncomingNumbers = requests.Select(n => n.incomingNumber).ToList(), Register = register })).ToList();

                if (applications != null && applications.Count > 0)
                {
                    foreach (var application in applications)
                    {
                        application.ResultHTML = requests.First(n => n.incomingNumber == application.IncomingNumber).resultHtml;

                        await _applicationRepository.UpdateAsync(application, innerToken);
                    }
                }

                return new OperationResult<OperationResultTypes>(OperationResultTypes.SuccessfullyCompleted);
            }, cancellationToken);
        }

        public async Task<IEnumerable<Application>> SearchApplicationsAsync(ApplicationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            if (!searchCriteria.ApplicantCIN.HasValue)
            {
                throw new ArgumentException("ApplicantCIN cann't be null.");
            }
            var state = searchCriteria.ExtractState();

            var result = await _applicationRepository.SearchAsync(state, searchCriteria, cancellationToken);

            searchCriteria.Count = state.Count;

            return result;
        }

        #endregion
    }
}
