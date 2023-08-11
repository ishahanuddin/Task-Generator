using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System;
using Task_Generator___API.Models;
using Task_Generator___API.ViewModels;
using Task_Generator___API.Services.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Task_Generator___API.Services
{
    public class UserService : IUserServiceInterface
    {
        private readonly IConfiguration _iconfiguration;
        private readonly IUtilityInterface _utility;
        private readonly DBContext _mainContext;
        public UserService(DBContext context, IConfiguration iconfiguration, IUtilityInterface utility)
        {
            _iconfiguration = iconfiguration;
            _mainContext = context;
            _utility = utility;
        }

        async Task<Response<string>> IUserServiceInterface.Login(UserInfo loginDetails)
        {
            if(!_utility.ValidateEmail(loginDetails.Email))
            {
                return new Response<string>
                {
                    Data = "",
                    Message = "Invalid Email Address",
                    Success = false,
                    Code = 401,
                };
            }
            var users = await GetUsers();
            var userExists = users.SingleOrDefault(x => x.Email == loginDetails.Email);


            if (userExists == null)
            {
                return new Response<string>
                {
                    Data = "",
                    Message = "User not found",
                    Success = false,
                    Code = 400,
                };
            }

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(userExists, userExists.Password, loginDetails.Password);

            if (result == PasswordVerificationResult.Success)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, userExists.Id.ToString()),
                    new Claim(ClaimTypes.Name, loginDetails.Email)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iconfiguration["JWT:key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_iconfiguration["JWT:DurationInMinutes"])), // Token expiration time
                    signingCredentials: creds
                );

                var tokenHandler = new JwtSecurityTokenHandler();
                return new Response<string>
                {
                    Data = tokenHandler.WriteToken(token),
                    Message = "User Logged in Successfully",
                    Success = true,
                    Code = 200,
                };
            }

            return new Response<string>
            {
                Data = "",
                Message = "Invalid credentials",
                Success = true,
                Code = 401,
            };
        }

        async Task<Response<User>> IUserServiceInterface.Register(UserInfo userInfo)
        {
            if (!_utility.ValidateEmail(userInfo.Email))
            {
                return new Response<User>
                {
                    Data = null,
                    Message = "Invalid Email Address",
                    Success = false,
                    Code = 401,
                };
            }
            var users = await GetUsers();
            var userExists = users.FirstOrDefault(x => x.Email == userInfo.Email);

            if (userExists != null)
            {
                return new Response<User>
                {
                    Message = "Email already exists!",
                    Success = false,
                    Data = null,
                    Code = 403,
                };
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(_iconfiguration["JWT:key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
                new Claim(ClaimTypes.Name, userInfo.Email)
              }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_iconfiguration.GetSection("JWT:DurationInMinutes").Value)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var passwordHasher = new PasswordHasher<User>();
            var hashedPassword = passwordHasher.HashPassword(null, userInfo.Password);

            User user = new User { Email = userInfo.Email, Password = hashedPassword, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now };
            _mainContext.Users.Add(user);
            _mainContext.SaveChanges();


            return new Response<User>
            {
                Data = user,
                Message = "User Registered Successfully",
                Success = true,
                Code = 200,
            };
        }

        private async Task<List<User>> GetUsers()
        {
            List<User> users;
            try
            {
                users = await _mainContext.Set<User>().ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
            return users;
        }
    }

}
