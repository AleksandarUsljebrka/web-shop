using AutoMapper;
using Data.Models;
using Data.Models.Interfaces;
using Data.Repository.UnitOfWork;
using DataAccess.DTO.Order;
using DataAccess.DTO.Salesman;
using DataAccess.Helpers;
using DataAccess.Helpers.Interfaces;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DataAccess.Services
{
    //DONE
    public class AdminService:IAdminService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderHelper _orderHelper = new OrderHelper();
        private readonly IUserHelper _userHelper;
        private readonly IImageHelper _imageHelper = new ImageHelper();
        public AdminService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userHelper = new UserHelper(_unitOfWork);
        }
        public IResult GetAllSalesmen()
        {
            IResult result;
            List<ISalesman> salesmen = _unitOfWork.SalesmanRepository.GetAll().ToList<ISalesman>();
            List<SalesmanDto> salesmenDto = _mapper.Map<List<SalesmanDto>>(salesmen);
            SalesmanListDto salesmenListDto = new SalesmanListDto() { Salesmen = salesmenDto };
           
            foreach(var salesmanDto in salesmenListDto.Salesmen)
            {
                string path = salesmen.Find(s => s.Username == salesmanDto.Username).ProfileImage;
                salesmanDto.SalesmanProfileImage = _imageHelper.GetProfileImage(path);
            }
            result = new Result(true, salesmenListDto);
            return result;

        }

        public IResult GetAllOrders()
        {
            IResult result;
            List<IOrder> orders = _unitOfWork.OrderRepository.GetAll().ToList<IOrder>();
            List<OrderDto> ordersDto = _mapper.Map<List<OrderDto>>(orders);
            OrderListDto orderListDto = new OrderListDto() { Orders = ordersDto };

            foreach(var ord in orderListDto.Orders)
            {
                IOrder foundOrd = orders.Find(o => o.Id == ord.Id);
                ord.RemainingTime = _orderHelper.GetRemainingTime(ord.PlacedTime, foundOrd.DeliveryDurationInSeconds);
            }    

            result = new Result(true, orderListDto);
            return result;
        }

        public IResult GetOrder(long id)
        {
            IResult result;

            IOrder order = _unitOfWork.OrderRepository.GetById(id);
            List<IItem> allItems = _unitOfWork.ItemRepository.FindAllIncludeArticles(i => i.OrderId == id).ToList<IItem>();
            
            if(order == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Order " + id + " doesn't exists!");
                return result;
            }
            
            OrderDto orderDto = _mapper.Map<OrderDto>(order);

            //foreach(var item in allItems)
            //{
            //    if (item.OrderId != id)
            //        allItems.Remove(item);
            //}
            orderDto.Items = _mapper.Map<List<ItemDto>>(allItems);

            foreach (var orderItem in orderDto.Items)
            {
                IArticle article = allItems.Find(item => item.ArticleId == orderItem.ArticleId).Article;
                byte[] image = _imageHelper.GetArticleProductImage(article);
                orderItem.ArticleImage = image;
            }

            orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);

            result = new Result(true, orderDto);
            return result;
        }

        public IResult UpdateSalesmanStatus(SalesmanStatusDto salesmanStatusDto)
        {
            IResult result;
            ISalesman salesman = _unitOfWork.SalesmanRepository.FindFirst(s => s.Username == salesmanStatusDto.Username);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exist!");
                return result;
            }

            if (salesmanStatusDto.ApprovalStatus)
            {
                salesman.ApprovalStatus = SalesmanStatus.Approved;
            }
            else
                salesman.ApprovalStatus = SalesmanStatus.Denied;

            _unitOfWork.SalesmanRepository.Update((Salesman)salesman);
            _unitOfWork.SaveChanges();
   
            result = new Result(true);
            return result;
        }

    }
}
