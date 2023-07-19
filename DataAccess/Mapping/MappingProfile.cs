using AutoMapper;
using Data.Models;
using DataAccess.DTO.Auth;
using DataAccess.DTO.Order;
using DataAccess.DTO.Salesman;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            //orders
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Item, ItemDto>().ReverseMap();
        }
    }
}
