using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Integration.FutureServices.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Integration.FutureServices.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProxiesRegisterController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProxy([FromQuery]ProxiesRegisterRequest request, [FromServices]IConfiguration configuration)
        {
            if (configuration.GetSection("FutureServices").GetValue<bool>("ReturnMockData"))
            {
                var result = new ProxiesRegisterResponse()
                {
                    DocumentKind = request.DocumentKind,
                    DocumentNumber = request.DocumentNumber                
                };

                if (request.DocumentKind == ProxiesDocumentKinds.Proxies && request.DocumentNumber == "123123123")
                {
                    result.ProxyDocumentExist = true;
                    result.ProxyDocumentGuid = "123123123";
                }
                else if (request.DocumentKind == ProxiesDocumentKinds.Proxies && request.DocumentNumber == "111111111")
                {
                    result.ProxyDocumentExist = true;
                }
                else
                {
                    result.ProxyDocumentExist = false;
                }

                return Ok(result);
            }

            return BadRequest(new Error("SystemNotAvailable", "Тази фунционалност не е налична към момента."));
        }

        [Route("Documents/{documentNumber}")]
        [HttpGet]
        public IActionResult GetProxyDocument(string documentNumber, [FromServices]IConfiguration configuration)
        {
            if (configuration.GetSection("FutureServices").GetValue<bool>("ReturnMockData"))
            {
                if(string.IsNullOrEmpty(documentNumber) || string.Compare(documentNumber, "123123123", true) != 0)
                {
                    return null;
                }
                else
                {
                    var file = Path.Combine(Directory.GetCurrentDirectory(),
                            "App_Data", "Proxy.pdf");

                    return PhysicalFile(file, "application/pdf");
                }
            }

            return BadRequest(new Error("SystemNotAvailable", "Тази фунционалност не е налична към момента."));
        }
    }
}