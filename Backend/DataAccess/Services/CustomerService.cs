using AutoMapper;
using Data.Models;
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

namespace DataAccess.Services
{
    public class CustomerService:ICustomerService
    {
        private double deliveryPrice = 300;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserHelper _userHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IOrderHelper _orderHelper = new OrderHelper();
        public CustomerService(IUnitOfWork unitOfWork, IMapper mapper,  ITokenHelper tokenHelper)
        {
            _userHelper = new UserHelper(unitOfWork);
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
            //List<IOrder> ordersOfCustomer = new List<IOrder>();
            List<OrderDto> ordersDto = new List<OrderDto>();
            //  OrderDto orderDto = new OrderDto();

            orders = _orderHelper.GetOrdersOfCustomer(orders, customer.Id);
            orders = _orderHelper.GetFinishedOrders(orders);

            OrderListDto orderListDto = new OrderListDto() { Orders = _mapper.Map<List<OrderDto>>(orders) };
            
            foreach(var orderDto in orderListDto.Orders)
            {
                IOrder order = orders.Find(o => o.Id == orderDto.Id);
                orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);
            }

            result = new Result(true, orderListDto);
            return result;

        }

        public IResult OrderDetails(long id)
        {
            IResult result;

            IOrder order = _unitOfWork.OrderRepository.GetById(id);
            if (order == null)
                return result = new Result(false, ErrorCode.NotFound, $"Order {id} doesn't exists");

            OrderDto orderDto = _mapper.Map<OrderDto>(order);

            List<IItem> allItems = _unitOfWork.ItemRepository.GetAll().ToList<IItem>();
            List<IItem> itemsOfOrder = new List<IItem>();

            foreach (var item in allItems)
                if (item.OrderId == id)
                    itemsOfOrder.Add(item);

            orderDto.Items = _mapper.Map<List<ItemDto>>(itemsOfOrder);

            orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);

            result = new Result(true, orderDto);
            return result;
        }

        public IResult PendingOrders(string token)
        {
            IResult result;
            List<IOrder> orders = _unitOfWork.OrderRepository.GetAll().ToList<IOrder>();

            ICustomer customer = (ICustomer)_userHelper.UserByToken(token, _tokenHelper);

            if (customer == null)
                return result = new Result(false, ErrorCode.NotFound, "Customer doesn't exists");

            orders = _orderHelper.GetOrdersOfCustomer(orders, customer.Id);
            orders = _orderHelper.GetPendingOrders(orders);

            OrderListDto ordersDto = new OrderListDto() { Orders = _mapper.Map<List<OrderDto>>(orders) };
            foreach(var orderDto in ordersDto.Orders)
            {
                IOrder order = orders.Find(o => o.Id == orderDto.Id);
                orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);
            }

            result = new Result(true, ordersDto);
            return result;
        }

        public IResult PlaceOrder(PlaceOrderDto placedOrderDto, string token)
        {
            ICustomer customer = (ICustomer)_userHelper.UserByToken(token, _tokenHelper);
            IResult result;

            if (customer == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Customer doesn't exists");
                return result;
            }

            List<IArticle> addedArticles = new List<IArticle>();

            foreach(var item in placedOrderDto.Items)
            {
                IArticle article = _unitOfWork.ArticleRepository.FindFirst(a => a.Id == item.ArticleId);
                if (article == null)
                {
                    result = new Result(false, ErrorCode.BadRequest, "Article doesn't exists!");
                    return result;
                }
                if (item.Quantity < 0)
                {
                    result = new Result(false, ErrorCode.BadRequest, "Quantity can't be 0!");
                    return result;
                }
                if (item.Quantity > article.Quantity)
                {
                    result = new Result(false, ErrorCode.BadRequest, $"There is no enough {article.Name} in storage!");
                }
                addedArticles.Add(article);
            }

            Order order = _mapper.Map<Order>(placedOrderDto);

            order.CustomerId = customer.Id;

            foreach (var item in order.Items)
            {
                IArticle article = addedArticles.Find(a => a.Id == item.ArticleId);
                item.PricePerUnit = article.Price;
                item.ArticleName = article.Name;
                article.Quantity -= item.Quantity;
                order.TotalPrice += (item.PricePerUnit * item.Quantity);
                _unitOfWork.ItemRepository.Add(item);
                _unitOfWork.ArticleRepository.Update((Article)article);
            }

			order.DeliveryDurationInSeconds = new Random().Next(3600, 7200);

            order.TotalPrice += deliveryPrice;

            order.PlacedTime = DateTime.Now;
            order.DeliveryDurationInSeconds = new Random().Next(3600, 7200);

            _unitOfWork.OrderRepository.Add((Order)order);
            _unitOfWork.SaveChanges();

            result = new Result(true);
            return result;
        }

        public IResult CancelOrder(long id, string token)
        {
            IResult result;
            ICustomer customer = (ICustomer)_userHelper.UserByToken(token, _tokenHelper);
            if(customer==null)
            {
                result = new Result(false, ErrorCode.NotFound, "Customer doesn't exists!");
                return result;
            }

            IOrder order = _unitOfWork.OrderRepository.FindFirstIncludeItems(o => o.Id == id);
            if (order == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Order doesn't exists!");
                return result;
            }
            if(!_orderHelper.CanCancel(order))
            {
                result = new Result(false, ErrorCode.Conflict,"Order can't be canceled after 1h of ordering");
                return result;
            }
            foreach(var item in order.Items)
            {
                IArticle article = _unitOfWork.ArticleRepository.FindFirst(a => a.Id == item.ArticleId);
                article.Quantity += item.Quantity;
                _unitOfWork.ArticleRepository.Update((Article)article);
            }

            _unitOfWork.OrderRepository.Delete((Order)order);
            _unitOfWork.SaveChanges();

            result = new Result(true);
            return result;
        }
    }
}
