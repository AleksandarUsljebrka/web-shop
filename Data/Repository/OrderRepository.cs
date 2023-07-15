﻿using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class OrderRepository: Repository<Order>, IOrderRepository
    {
        public OrderRepository(WebShopDbContext context) : base(context)
        { 
        }
    }
}
