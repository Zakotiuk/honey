using Microsoft.AspNetCore.Mvc;
using schoolButNot.Domain;
using schoolButNot.Domain.Interfaces;
using schoolButNot.DTO;
using schoolButNot.DTO.Models;
using System.Collections.Generic;
using System.Linq;

namespace schoolButNot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private IQueriesService queriesService;
        private ICommandService commandService;

        public AdminController(IQueriesService queries,
                                              ICommandService commandService)
        {
            queriesService = queries;
            this.commandService = commandService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("students")]
        public ListStudentDTO GetStudent([FromQuery] GetQuerieModel model) 
        {
            return queriesService.GetStudents(model);
        }


        //[HttpGet("coursesStudent/{id}")]
        //public List<CourseDTO> GetCoursesForStudent([FromRoute] string id)
        //{
        //    return queriesService.GetCoursesForStudent(id);
        //}

        [HttpPut("editStudent")]
        public IActionResult EditStudent(EditStudentDTO model) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not all fields filled correctly");
            }
            else 
            {
                commandService.EditStudent(model);
                return Ok("The student has successfullly edited");
            }
        }

        [HttpPost("addCourse")]
        public IActionResult AddCourse(AddCourseDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not all fields filled correctly");
            }
            else
            {
                commandService.AddCourse(model);
                return Ok("The course was successfully added");
            }
        }

        [HttpGet("profile")]
        public ProfileDTO Profile([FromQuery] string id)
        {
            return queriesService.GetProfile(id);
        }
    }
}