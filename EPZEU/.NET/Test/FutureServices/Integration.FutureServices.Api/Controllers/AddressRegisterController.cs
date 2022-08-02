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
    public class AddressRegisterController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCheckAddress([FromQuery]AddressRegisterRequest request, [FromServices]IConfiguration configuration)
        {

            if (configuration.GetSection("FutureServices").GetValue<bool>("ReturnMockData"))
            {
                var result = new AddressRegisterResponse()
                {
                    Address = (Address)request
                };

                //София
                if (request.SettlementEKATTE == "68134")
                {
                    result.AddressExists = true;
                }
                else
                {
                    result.AddressExists = false;
                }
                                    
                return Ok(result);
            }

            return BadRequest(new Error("SystemNotAvailable", "Тази фунционалност не е налична към момента."));
        }
    }
}