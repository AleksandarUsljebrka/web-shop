using DataAccess.DTO.Salesman;
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
    [Route("admin")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpGet("salesmen")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllSalesmen()
        {
            try
            {
                IResult result = _adminService.GetAllSalesmen();
                if (!result.Successfull)
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

        [HttpGet("all-orders")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllOrders()
        {
            try
            {
                IResult result = _adminService.GetAllOrders();
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
        [Authorize(Roles = "Admin")]
        public IActionResult GetOrder([FromQuery] long id)
        {
            try
            {
                IResult result = _adminService.GetOrder(id);
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
        [HttpPut("salesman-status")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateSalesmanStatus(SalesmanStatusDto salesmanStatusDto)
        {
            try
            {
                IResult result = _adminService.UpdateSalesmanStatus(salesmanStatusDto);
                if (!result.Successfull)
                    return StatusCode((int)result.ErrorCode, result.ErrorMess);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
