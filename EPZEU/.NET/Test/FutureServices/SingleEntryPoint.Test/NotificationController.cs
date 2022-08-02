using Integration.EPZEU.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace SingleEntryPoint.Test
{
    public class ApplicationRegisteredRequest
    {
        public string ApplicationKey { get; set; }

        public ApplicationInfo Application { get; set; }
    }

    [EnableCors("AllowAllOrigins")]
    public class NotificationController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            Console.WriteLine("Test OK");

            return Ok();
        }

        [HttpPost]
        public IActionResult Post([FromQuery]string operationID, [FromBody]List<ApplicationRegisteredRequest> applicationRegisteredRequests)
        {
            ApplicationInfo applicationInfo = applicationRegisteredRequests[0].Application;
            Console.WriteLine("Успешно е регистрирано заявление с вх. номер: {0}",applicationInfo.IncomingNumber);

            return Ok();
        }
    }
}
