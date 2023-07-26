using DataAccess.DTO.User;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShopBackend.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("user")]
        [Authorize]
        public IActionResult GetUser()
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _userService.GetUser(token);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);

                return Ok(result.Dto);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("user")]
        [Authorize]
        public IActionResult UpdateUser(UserDto newUserDto)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _userService.UpdateUser(token, newUserDto);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("password")]
        [Authorize]
        public IActionResult UpdatePassword(PasswordDto passwordDto)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _userService.ChangePassword(token, passwordDto);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);

                return Ok();
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
