using DataAccess.DTO.Article;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace WebShopBackend.Controllers
{
    [Route("salesman")]
    [ApiController]
    public class SalesmanController : Controller
    {
        private readonly ISalesmanService _salesmanService;

        public SalesmanController(ISalesmanService salesmanService)
        {
            _salesmanService = salesmanService;
        }

        [HttpGet("articles")]
        [Authorize(Roles = "Salesman")]
        public IActionResult GetArticles()
        {
            IResult result;
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();

                result = _salesmanService.GetAllArticles(token);
                if (!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                return Ok(result.Dto);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("finished-orders")]
        [Authorize(Roles = "Salesman")]
        public IActionResult FinishedOrders()
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _salesmanService.GetFinishedOrders(token);
                
                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok(result.Dto);

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("article")]
        [Authorize(Roles = "Salesman")]
        public IActionResult AddArticle([FromForm] AddArticleDto addArticleDto)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _salesmanService.AddArticle(addArticleDto, token);

                if (!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("article")]
        [Authorize(Roles = "Salesman")]
        public IActionResult UpdateArticle([FromBody] UpdateArticleDto updateArticleDto)
        {
            try
            {
                IResult result;
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                result = _salesmanService.UpdateArticle(updateArticleDto, token);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("order")]
        [Authorize(Roles = "Salesman")]
        public IActionResult GetOrderDetails([FromQuery]long id)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _salesmanService.GetOrderDetails(token, id);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok(result.Dto);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("pending-orders")]
        [Authorize(Roles = "Salesman")]
        public IActionResult GetPendingOrders()
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _salesmanService.GetPendingOrders(token);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok(result.Dto);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("article")]
        [Authorize(Roles = "Salesman")]
        public IActionResult GetArticleDetails([FromQuery] string name)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _salesmanService.GetArticleDetails(token, name);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                
                return Ok(result.Dto);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("article")]
        [Authorize(Roles = "Salesman")]
        public IActionResult DeleteArticle([FromQuery] string name)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _salesmanService.DeleteArticle(token, name);
                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
    }
