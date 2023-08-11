using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserServiceInterface _userService;

        public UserController(ILogger<UserController> logger, IUserServiceInterface userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync(UserInfo userInfo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var res = await _userService.Register(userInfo);

                if (res.Success == true)
                {
                    var user = new
                    {
                        id = res.Data.Id,
                        email = res.Data.Email,
                        created_at = res.Data.CreatedAt,
                        updated_at = res.Data.UpdatedAt
                    };
                    return StatusCode(res.Code, new { user = user });
                }
                else
                {
                    return StatusCode(res.Code, new
                    {
                        ErrorMessage = res.Message
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    ErrorMessage = ex.Message
                });
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserInfo userInfo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var res = await _userService.Login(userInfo);
                if (res.Success == true)
                {
                    return StatusCode(res.Code, new { jwt = res.Data });
                }
                else
                {
                    return StatusCode(res.Code, new
                    {
                        ErrorMessage = res.Message
                    });
                }
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
        [Route("user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var email = User.FindFirstValue(ClaimTypes.Name);

                return StatusCode(200, new { user = new { id = Convert.ToInt16(userId), email = email } });
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
