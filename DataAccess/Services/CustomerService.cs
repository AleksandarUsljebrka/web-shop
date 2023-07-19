using AutoMapper;
using Data.Models.Interfaces;
using Data.Repository.UnitOfWork;
using DataAccess.DTO.Article;
using DataAccess.DTO.Order;
using DataAccess.Helpers;
using DataAccess.Helpers.Interfaces;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services
{
    public class CustomerService:ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserHelper _userHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IOrderHelper _orderHelper = new OrderHelper();
        public CustomerService(IUnitOfWork unitOfWork, IMapper mapper, IUserHelper userHelper, ITokenHelper tokenHelper)
        {
            _userHelper = userHelper;
            _unitOfWork = unitOfWork;
            _tokenHelper = tokenHelper;
            _mapper = mapper;
        }
        public IResult GetArticles()
        {
            IResult result;
            List<IArticle> articlesDB = _unitOfWork.ArticleRepository.GetAll().ToList<IArticle>();
            
            ArticleListDto articleListDto = new ArticleListDto();
            articleListDto.Articles = _mapper.Map<List<ArticleDto>>(articlesDB);

            result = new Result(true, articleListDto);
            return result;
        }

        public IResult GetFinishedOrders(string token)
        {
            IResult result;

            ICustomer customer = (ICustomer)_userHelper.UserByToken(token,_tokenHelper);
            if(customer == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Customer doesn't exists");
                return result;
            }

            //Prolazim kroz sve ordere iz baze i one koji sadrze customerID mapiram na orderDto i stavljam u listu DTOa
            List<IOrder> orders = _unitOfWork.OrderRepository.GetAll().ToList<IOrder>();
            List<IOrder> ordersOfCustomer = new List<IOrder>();
            List<OrderDto> ordersDto = new List<OrderDto>();
          //  OrderDto orderDto = new OrderDto();
            foreach(var order in orders)
            {
                if (order.CustomerId == customer.Id)
                {
                    ordersOfCustomer.Add(order);
                }
            }

            ordersOfCustomer = _orderHelper.GetFinishedOrders(ordersOfCustomer);
            OrderListDto orderListDto = new OrderListDto() { Orders = _mapper.Map<List<OrderDto>>(ordersOfCustomer) };
            
            foreach(var orderDto in orderListDto.Orders)
            {
                IOrder order = ordersOfCustomer.Find(o => o.Id == orderDto.Id);
                orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);
            }

            result = new Result(true, orderListDto);
            return result;

        }
    }
}
