using Microsoft.AspNetCore.Mvc;
using schoolButNot.Domain;
using schoolButNot.Domain.Interfaces;
using schoolButNot.DTO.Models;
using smth.DTO.Models;
using System;

namespace schoolButNot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : Controller
    {
        private IQueriesService queriesService;
        private ICommandService commandService;

        public CourseController(IQueriesService queriesService,
                                              ICommandService commandService)
        {
            this.queriesService = queriesService;
            this.commandService = commandService;
        }

        [HttpGet("courses")]
        public ListCoursesDTO GetCourses([FromQuery] GetQuerieModel model)
        {
            return queriesService.GetCourses(model);
        }

        [HttpPost("subscription")]
        public IActionResult Subscription([FromBody] SubscriptionOfUserDTO model) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not all fields filled correctly");
            }
            else 
            {
                commandService.SubscriptionOfuser(model);
                return Ok("The student was successfully subscribed on course");
            }
        }
        [HttpPost("unsubscription")]
        public IActionResult Unsubscription([FromBody] UnsubscriptionOfUserDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not all fields filled correctly");
            }
            else
            {
                commandService.Unsubscription(model);
                return Ok("The student was successfully unsubscribed on course");
            }
        }
    }
}