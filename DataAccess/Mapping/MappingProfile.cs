using AutoMapper;
using Data.Models;
using DataAccess.DTO.Auth;
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
            CreateMap<Customer, RegisterDto>().ReverseMap();
            CreateMap<Salesman, RegisterDto>().ReverseMap();

        }
    }
}
