using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Integration.FutureServices.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Integration.FutureServices.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CivilRegistrationController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCivilRegistration([FromQuery]CivilRegistrationRequest request, [FromServices]IConfiguration configuration)
        {
            if (configuration.GetSection("FutureServices").GetValue<bool>("ReturnMockData"))
            {
                var result = new CivilRegistrationResponse()
                {
                    Ident = request.Ident,
                    IdentType = request.IdentType
                };

                if (request.Ident.EndsWith("1") || request.Ident.EndsWith("2"))
                {
                    result.PersonHasCivilRegistration = true;
                    result.CivilRegistration = CivilRegistrationTypes.Born;
                }
                else if (request.Ident.EndsWith("3") || request.Ident.EndsWith("4"))
                {
                    result.PersonHasCivilRegistration = true;
                    result.CivilRegistration = CivilRegistrationTypes.Мarried;
                }
                else if (request.Ident.EndsWith("5") || request.Ident.EndsWith("6"))
                {
                    result.PersonHasCivilRegistration = true;
                    result.CivilRegistration = CivilRegistrationTypes.Divorced;
                }
                else if (request.Ident.EndsWith("7") || request.Ident.EndsWith("8"))
                {
                    result.PersonHasCivilRegistration = true;
                    result.CivilRegistration = CivilRegistrationTypes.Died;
                }
                else 
                {
                    result.PersonHasCivilRegistration = false;
                }

                return Ok(result);
            }

            return BadRequest(new Error("SystemNotAvailable","Тази фунционалност не е налична към момента."));
        }
    }
}