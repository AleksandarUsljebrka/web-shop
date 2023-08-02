using Data.Repository.Interfaces;

namespace Data.Repository.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IAdminRepository AdminRepository { get; set; }

        public ICustomerRepository CustomerRepository { get; set; }

        public ISalesmanRepository SalesmanRepository { get; set; }

        public IArticleRepository ArticleRepository { get; set; }

        public IItemRepository ItemRepository { get; set; }

        public IOrderRepository OrderRepository { get; set; }

        void SaveChanges();
    }
}
