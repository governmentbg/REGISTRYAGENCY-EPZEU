using EPZEU.Notifications;
using EPZEU.Notifications.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за абониране и обработка на събития.
    /// </summary>
    [Authorize]
    public class NotificationsController : BaseApiController
    {
        INotificationService NotificationService;

        public NotificationsController(INotificationService notificationService)
        {
            NotificationService = notificationService;
        }

        #region Subscriptions

        /// <summary>
        /// Операция за търсене на абонамент за събития.
        /// </summary>
        /// <param name="searchCriteria">Критерии за търсене.</param>
        /// <param name="cancellationToken">Токен за отказване</param>
        [Route("Subscriptions")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserSubscription>), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchUserSubscriptionsAsync([FromQuery]UserSubscriptionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var searchResult = await NotificationService.SearchUserSubscriptionsAsync(searchCriteria, cancellationToken);

            return PagedResult(searchResult, searchResult == null || searchResult.Count() == 0 ? 0 : searchCriteria.Count);
        }

        /// <summary>
        /// Операция за абониране за събития.
        /// </summary>
        /// <param name="request">Заявка за абониране.</param>
        /// <param name="cancellationToken">Токен за отказване</param>
        [Route("Subscriptions")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<UserSubscription>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateUserSubscriptions([FromBody]UserSubscriptionsCreateRequest request, CancellationToken cancellationToken)
        {
            return OperationResult(await NotificationService.CreateUserSubscriptionsAsync(request, cancellationToken));
        }

        /// <summary>
        /// Операция за изтриване на абониране за събития.
        /// </summary>
        /// <param name="request">Заявка за изтриване.</param>
        [Route("Subscriptions")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUserSubscriptions([FromBody]UserSubscriptionsDeleteRequest request)
        {
            await NotificationService.DeleteUserSubscriptionsAsync(request, CancellationToken.None);

            return Ok();
        }

        #endregion

        #region Events

        /// <summary>
        /// Операция за oбработва събити от имотния регистър.
        /// </summary>
        /// <param name="message">Съобщение за събитието.</param>
        [Route("Events")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ProcessCREventAsync([FromBody]CREventMessage message)
        {
            await NotificationService.ProcessCREventAsync(message);

            return Ok();
        }

        #endregion
    }
}
