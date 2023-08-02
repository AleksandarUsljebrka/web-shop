using AutoMapper;
using Data.Models;
using DataAccess.DTO.Article;
using DataAccess.DTO.Auth;
using DataAccess.DTO.Order;
using DataAccess.DTO.Salesman;
using DataAccess.DTO.User;

namespace DataAccess.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            //auth
            CreateMap<Customer, RegisterDto>().ReverseMap();
            CreateMap<Salesman, RegisterDto>().ReverseMap();
            CreateMap<Admin, RegisterDto>().ReverseMap();
            CreateMap<User, RegisterDto>().ReverseMap();

            //users
            CreateMap<Salesman, SalesmanDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            //orders
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Order, PlaceOrderDto>().ReverseMap();
            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Item, PlacedItemDto>().ReverseMap();

            //articles
            CreateMap<Article, AddArticleDto>().ReverseMap();
            CreateMap<Article, UpdateArticleDto>().ReverseMap();
            CreateMap<Article, ArticleDto>().ReverseMap();



        }
    }
}
