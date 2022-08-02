using CNSys;
using CNSys.Data;
using EPZEU.Audit.Models;
using EPZEU.Audit.Repositories;
using EPZEU.Security;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Audit
{
    /// <summary>
    /// Интерфейс на услуга за работа с одит.
    /// </summary>
    public interface IAuditService
    {
        /// <summary>
        /// Създаване на запис в одит.
        /// </summary>
        /// <param name="logActionRequest">Заявка за събитие за одит.</param>
        /// <param name="cancellationToken">Токлен за отказване.</param>
        /// <returns></returns>
        Task<OperationResult<LogActionResponse>> CreateLogActionAsync(LogActionRequest logActionRequest, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс IAuditService за работа с одит.
    /// </summary>
    public class AuditService : IAuditService
    {
        #region Private members

        private readonly ILogActionRepository _logActionRepository;
        private readonly IEPZEUUserAccessor _EPZEUUserAccessor;
        
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;

        #endregion

        #region Constructor

        public AuditService(ILogActionRepository logActionRepository, IEPZEUUserAccessor EPZEUUserAccessor, 
            IDbContextOperationExecutor dbContextOperationExecutor)
        {
            _logActionRepository = logActionRepository ?? throw new ArgumentNullException(nameof(logActionRepository));
            _EPZEUUserAccessor = EPZEUUserAccessor;
            _dbContextOperationExecutor = dbContextOperationExecutor;
        }

        #endregion

        #region Public Interface

        public Task<OperationResult<LogActionResponse>> CreateLogActionAsync(LogActionRequest logActionRequest, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async(dbContext, innerToken) =>
            {
                var x = await CreateHelper(logActionRequest, innerToken);
                return x;
            }, cancellationToken);
        }

        #endregion

        #region Helpers

        private async Task<OperationResult<LogActionResponse>> CreateHelper(LogActionRequest logActionRequest, CancellationToken cancellationToken)
        {
            if (!logActionRequest.ObjectType.HasValue
                    || !logActionRequest.ActionType.HasValue
                    || !logActionRequest.ActionType.HasValue
                    || !logActionRequest.Module.HasValue
                    || !logActionRequest.Functionality.HasValue
                    || (logActionRequest.UserCIN.HasValue && logActionRequest.UserID.HasValue))
                throw new NotSupportedException("invalid input params");

            if (!logActionRequest.UserCIN.HasValue)
                logActionRequest.UserID = _EPZEUUserAccessor.User.LocalClientID.Value;

            if (!logActionRequest.LoginSessionID.HasValue)
                logActionRequest.LoginSessionID = _EPZEUUserAccessor.User.LoginSessionID;

            logActionRequest.LogActionDate = DateTime.Now;

            await _logActionRepository.CreateAsync(logActionRequest, cancellationToken);

            if (!logActionRequest.LogActionID.HasValue)
                throw new NotSupportedException("Log Action not created");

            var result = new OperationResult<LogActionResponse>(OperationResultTypes.SuccessfullyCompleted);

            result.Result = new LogActionResponse() { LogActionID = logActionRequest.LogActionID };

            return result;
        }

        #endregion
    }
}
