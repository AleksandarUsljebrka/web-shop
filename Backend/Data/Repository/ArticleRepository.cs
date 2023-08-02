using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;

namespace Data.Repository
{
    public class ArticleRepository: Repository<Article>, IArticleRepository
    {
        public ArticleRepository(ShopDbContext context):base(context)
        {

        }
    }
}
