using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using System.Security.Principal;
using System.Text;
using Task_Generator___API.Models;
using Task_Generator___API.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace Task_Generator___API.Services.Interfaces
{
    public interface IUserServiceInterface
    {
        Task<Response<string>> Login(UserInfo loginDetails);
        Task<Response<User>> Register(UserInfo loginDetails);
    }
}
