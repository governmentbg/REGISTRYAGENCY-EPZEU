using CNSys;
using EPZEU.Users.Migrations;
using EPZEU.Users.Migrations.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за мигриране на потребители
    /// </summary>
    [Authorize]
    public class UsersMigrationsController : BaseApiController    
    {
        IAccountMigrationProcessService AccountMigrationProcessService;

        #region Constructor

        public UsersMigrationsController(IAccountMigrationProcessService аccountMigrationProcessService)
        {
            AccountMigrationProcessService = аccountMigrationProcessService;
        }

        #endregion
        
        /// <summary>
        /// Операция за търсене потребителскки акаунт за миграция.
        /// </summary>
        /// <param name="criteria">Критерии за търсене</param>       
        /// <returns>Немигриран потребителски акаунт</returns>
        [Route("Account")]
        [HttpGet]
        [ProducesResponseType(typeof(Account), StatusCodes.Status200OK)]
        public IActionResult GetAccount([FromQuery]AccountSearchCriteria criteria)
        {          
            return OperationResult(AccountMigrationProcessService.GetAccountForMigration(criteria));
        }

        /// <summary>
        /// Операция за търсене на процеси по миграция на потребителски профил.
        /// </summary>
        /// <param name="criteria">Критерии за търсене</param>       
        /// <returns>Процеси по мигриране на потребителски профил</returns>
        [Route("MigrationProcesses")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AccountMigrationProcess>), StatusCodes.Status200OK)]
        public IActionResult SearchAccountMigrationProcesses([FromQuery]AccountMigrationProcessSearchCriteria criteria)
        {
            return Ok(AccountMigrationProcessService.SearchAccountMigrationProcesses(criteria));
        }

        /// <summary>
        /// Операция за стартиране на процес по миграция.
        /// </summary>
        /// <param name="startRequest">Данни са стартиране на процеса</param>       
        /// <returns>Процеси по мигриране на потребителски</returns>
        [Route("StartMigrationProcess")]
        [HttpPost]
        [ProducesResponseType(typeof(AccountMigrationProcess), StatusCodes.Status200OK)]
        public async Task<IActionResult> StartAccountMigrationProcessAsync([FromBody] StartMigrationProcessRequest startRequest)
        {
            return OperationResult(await AccountMigrationProcessService.StartAccountMigrationProcessAsync(startRequest));
        }

    }
}
