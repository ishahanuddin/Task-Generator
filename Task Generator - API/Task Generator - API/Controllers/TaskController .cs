using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Task_Generator___API.Models;
using Task_Generator___API.Services.Interfaces;
using Task_Generator___API.ViewModels;

namespace Task_Generator___API.Controllers
{
    [ApiController]
    [Route("")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;
        private readonly ITaskInterface _taskService;

        public TaskController(ILogger<TaskController> logger, ITaskInterface taskService)
        {
            _logger = logger;
            _taskService = taskService;
        }

        [Authorize] // Requires authentication for this action
        [HttpPost]
        [Route("create-task")]
        public IActionResult CreateTask([FromBody] Models.Task task)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ResponseViewModel<Models.Task> res = _taskService.CreateTask(task.Name);
                var taskObject = new
                {
                    id = res.Data.Id,
                    name = res.Data.Name,
                };
                return StatusCode(res.Code, new { task = taskObject });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    ErrorMessage = ex.Message
                });
            }
        }

        [Authorize] // Requires authentication for this action
        [HttpGet]
        [Route("list-tasks")]
        public IActionResult GetTasks()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var tasks = _taskService.GetTasks();
                return StatusCode(tasks.Code, new { tasks = tasks.Data });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    ErrorMessage = ex.Message
                });
            }
        }

        [Authorize] // Requires authentication for this action
        [HttpPost]
        [Route("delete-tasks")]
        public IActionResult DeleteTasks([FromBody] TaskIDsViewModel taskIds)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var tasks = _taskService.DeleteTasks(taskIds);
                return StatusCode(tasks.Code, new { tasks = tasks.Data });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    ErrorMessage = ex.Message
                });
            }
        }
    }
}
