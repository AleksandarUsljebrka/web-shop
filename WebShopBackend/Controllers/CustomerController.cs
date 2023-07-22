using DataAccess.DTO.Order;
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
    [Route("customer")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("all-ordes")]
        [Authorize(Roles ="Customer")]
        public IActionResult GetArticles()
        {
            IResult result;
            try
            {
                result = _customerService.GetArticles();
                if(!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                return Ok(result.Dto);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("finished-orders")]
        [Authorize(Roles ="Customer")]
        public IActionResult GetFinishedOrders()
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();

                IResult result = _customerService.GetFinishedOrders(token);
                if(!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                return Ok(result.Dto);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("order")]
        [Authorize(Roles ="Customer")]
        public IActionResult OrderDetails([FromQuery]long id)
        {
            try
            {
                IResult result = _customerService.OrderDetails(id);
                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);

                return Ok(result.Dto);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("pending-orders")]
        [Authorize(Roles = "Customer")]
        public IActionResult GetPendingOrders()
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _customerService.PendingOrders(token);

                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);

                return Ok(result.Dto);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("order")]
        [Authorize(Roles = "Customer")]
        public IActionResult PlaceOrder(PlaceOrderDto placeOrderDto)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _customerService.PlaceOrder(placeOrderDto, token);

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
        [HttpDelete("order")]
        [Authorize(Roles = "Customer")]
        public IActionResult CancelOrder([FromQuery] long id)
        {
            try
            {
                string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
                IResult result = _customerService.CancelOrder(id, token);
                if (!result.Successfull)
                {
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                }
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
