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
using System.Collections.Generic;
using System.Linq;

namespace DataAccess.Services
{
    public class SalesmanService:ISalesmanService
    {
        private readonly IUserHelper _userHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ISalesmanHelper _salesmanHelper = new SalesmanHelper();
        private readonly IOrderHelper _orderHelper = new OrderHelper();
        public SalesmanService(IUnitOfWork unitOfWork, ITokenHelper tokenHelper, IMapper mapper)
        {
            _userHelper = new UserHelper(unitOfWork);
            _mapper = mapper;
            _tokenHelper = tokenHelper;
            _unitOfWork = unitOfWork;
        }

        public IResult AddArticle(AddArticleDto addArticleDto, string token)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }

            if (salesman.ApprovalStatus != SalesmanStatus.Approved)
            {
                result = new Result(false, ErrorCode.Conflict, "Salesman isn't approved by admin");
                return result;
            }
            if (addArticleDto.Quantity <= 0)
            {
                result = new Result(false, ErrorCode.BadRequest, "Quantity of article can't be less than 0!");
                return result;
            }

            Article article = _mapper.Map<Article>(addArticleDto);
            article.SalesmanId = salesman.Id;

            _unitOfWork.ArticleRepository.Add((Article)article);
            _unitOfWork.SaveChanges();

            result = new Result(true);
            return result;
            
        }

        public IResult UpdateArticle(UpdateArticleDto updateArticleDto, string token)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }
            if (salesman.ApprovalStatus != SalesmanStatus.Approved)
            {
                result = new Result(false, ErrorCode.Conflict, "Salesman isn't approved by admin");
                return result;
            }

            IArticle article = _unitOfWork.ArticleRepository.FindFirst(a => a.SalesmanId == salesman.Id && a.Name == updateArticleDto.CurrentName);
            if (article == null)
            {
                result = new Result(false, ErrorCode.NotFound, $"Article {updateArticleDto.CurrentName} doesn't exists!");
                return result;
            }
            
            if (_unitOfWork.ArticleRepository.FindFirst(a => a.SalesmanId == salesman.Id && a.Name == updateArticleDto.NewName && a.Id != article.Id) != null)
            {
                result = new Result(false, ErrorCode.Conflict, "Salesman already has an article with this name!");
                return result;
            }

            _salesmanHelper.UpdateArticle(updateArticleDto, article);
            _unitOfWork.ArticleRepository.Update((Article)article);
            _unitOfWork.SaveChanges();

            result = new Result(true);
            return result;

        }
        public IResult GetAllArticles(string token)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }
            if (salesman.ApprovalStatus != SalesmanStatus.Approved)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman isn't approved by admin");
                return result;
            }
            List<IArticle> articles = _unitOfWork.ArticleRepository.GetAll().ToList<IArticle>();
            articles = _salesmanHelper.GetArticlesOfSalesman(articles, salesman.Id);

            if (articles.Count == 0)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman has no articles!");

                return result; ;
            }

            ArticleListDto articlesDto = new ArticleListDto() 
            {
                Articles = _mapper.Map<List<ArticleDto>>(articles) 
            };

            result = new Result(true, articlesDto);
            return result;
        }

        public IResult GetFinishedOrders(string token)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);
            
            if(salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }

            List<IOrder> orders = _unitOfWork.OrderRepository.FindAllIncludeItemsIncludeArticles(o => o.Items.FirstOrDefault(i => i.Article.SalesmanId == salesman.Id) != null).ToList<IOrder>();
            //orders = _salesmanHelper.GetOrdersWithSalesmanItems(orders, salesman.Id);

            orders = _orderHelper.GetFinishedOrders(orders);

            foreach (var order in orders)
            {
                //IItem item = order.Items.FirstOrDefault(item => item.Article.SalesmanId != salesman.Id);
                order.Items = order.Items.ToList().FindAll(item => item.Article.SalesmanId == salesman.Id);
            }

            OrderListDto ordersDto = new OrderListDto()
            {
                Orders = _mapper.Map<List<OrderDto>>(orders)
            };

            foreach (var orderDto in ordersDto.Orders)
            {
                IOrder order = orders.Find(o => o.Id == orderDto.Id);
                orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);
            }

            result = new Result(true, ordersDto);
            return result;
        }
        
        public IResult GetOrderDetails(string token, long orderId)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);
            
            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }

            IOrder order = _unitOfWork.OrderRepository.GetById(orderId);
            if (order == null)
            {
                result = new Result(false, ErrorCode.NotFound, $"Order {orderId} doesn't exists!");
                return result;
            }

            OrderDto orderDto = _mapper.Map<OrderDto>(order);

            List<IItem> items = _unitOfWork.ItemRepository.FindAllIncludeArticles(i => i.OrderId == orderId ).ToList<IItem>();
            items = _salesmanHelper.GetItemsOfSalesman(items, salesman.Id);
            orderDto.Items = _mapper.Map<List<ItemDto>>(items);

            orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);

            result = new Result(true, orderDto);
            return result;
        
        }

        public IResult GetPendingOrders(string token)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }
            List<IOrder> orders = _unitOfWork.OrderRepository.FindAllIncludeItemsIncludeArticles(o => o.Items.FirstOrDefault(i => i.Article.SalesmanId == salesman.Id) != null).ToList<IOrder>();

            orders = _orderHelper.GetPendingOrders(orders);

            foreach (var order in orders)
            {
                order.Items = order.Items.ToList().FindAll(i => i.Article.SalesmanId == salesman.Id);
            }

            OrderListDto ordersDto = new OrderListDto()
            {
                Orders = _mapper.Map<List<OrderDto>>(orders)
            };

            foreach (var orderDto in ordersDto.Orders)
            {
                IOrder order = _unitOfWork.OrderRepository.GetById(orderDto.Id);
                orderDto.RemainingTime = _orderHelper.GetRemainingTime(orderDto.PlacedTime, order.DeliveryDurationInSeconds);
            }

            result = new Result(true, ordersDto);
            return result;

        }

        public IResult GetArticleDetails(string token, string name)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }
            if (salesman.ApprovalStatus != SalesmanStatus.Approved)
            {
                result = new Result(false, ErrorCode.Conflict, "Salesman isn't approved by admin");
                return result;
            }

            IArticle article = _unitOfWork.ArticleRepository.FindFirst(a => a.Name == name && a.SalesmanId == salesman.Id);
            if (article == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Article doesn't exists");
                return result;
            }

            ArticleDto articleDto = _mapper.Map<ArticleDto>(article);

            result = new Result(true, articleDto);
            return result;
        }

        public IResult DeleteArticle(string token, string name)
        {
            IResult result;
            ISalesman salesman = (ISalesman)_userHelper.UserByToken(token, _tokenHelper);

            if (salesman == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Salesman doesn't exists");
                return result;
            }
            if (salesman.ApprovalStatus != SalesmanStatus.Approved)
            {
                result = new Result(false, ErrorCode.Conflict, "Salesman isn't approved by admin");
                return result;
            }
           
            IArticle article = _unitOfWork.ArticleRepository.FindFirst(a => a.Name == name && a.SalesmanId == salesman.Id);
            if (article == null)
            {
                result = new Result(false, ErrorCode.NotFound, "Article doesn't exists");
                return result;
            }

            _unitOfWork.ArticleRepository.Delete((Article)article);
            _unitOfWork.SaveChanges();

            result = new Result(true);
            return result;
            
        }
    }
}
