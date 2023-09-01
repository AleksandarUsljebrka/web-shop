using DataAccess.DTO.Auth;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;

namespace WebShopBackend.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("registration")]
        public IActionResult Register([FromForm] RegisterDto regDto)
        {
            IResult result;
            result = _authService.Register(regDto);
            try
            {
                if(!result.Successfull)
                {
                    if (result.ErrorCode == ErrorCode.Conflict)
                        return StatusCode((int)HttpStatusCode.Conflict, result.ErrorMess);
                    else
                    {
                        if(string.IsNullOrEmpty(result.ErrorMess))
                            return StatusCode((int)HttpStatusCode.BadRequest, "Bad request...");
                        else
                            return StatusCode((int)HttpStatusCode.BadRequest, result.ErrorMess);
                        
                    }

                }

                return Ok();
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginDto logDto)
        {
            IResult result;
            result = _authService.Login(logDto);
            try
            {
                if (!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                else
                    return Ok(result.Dto);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto idToken)
        {
            IResult result;
            result = _authService.GoogleLogin(idToken);

            try
            {
                if (!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                else
                    return Ok(result.Dto);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        [HttpPost("google-register")]
        public async Task<IActionResult> GoogleRegister([FromBody] GoogleLoginDto idToken)
        {
            IResult result;
            result = _authService.GoogleRegister(idToken);

            try
            {
                if (!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                else
                    return Ok(result.Dto);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

    }
}
