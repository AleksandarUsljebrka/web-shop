﻿using DataAccess.DTO.Auth;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebShopBackend.Controllers
{
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
    }
}
