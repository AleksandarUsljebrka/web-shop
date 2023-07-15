using Data.Configurations.Context;
using Data.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.UnitOfWork
{
    public class UnitOfWork:IUnitOfWork
    {
        private WebShopDbContext _context;
        public IAdminRepository AdminRepository { get; set; }

        public ICustomerRepository CustomerRepository { get; set; }

        public ISalesmanRepository SalesmanRepository { get; set; }

        public IArticleRepository ArticleRepository { get; set; }

        public IItemRepository ItemRepository { get; set; }

        public IOrderRepository OrderRepository { get; set; }

        public UnitOfWork(WebShopDbContext context)
        {
            _context = context;
            AdminRepository = new AdminRepository(context);
            CustomerRepository = new CustomerRepository(context);
            SalesmanRepository = new SalesmanRepository(context);
            ArticleRepository = new ArticleRepository(context);
            ItemRepository = new ItemRepository(context);
            OrderRepository = new OrderRepository(context);
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
