using Data.Models.Interfaces;
using DataAccess.DTO.Article;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers.Interfaces
{
    public interface ISalesmanHelper
    {
        List<IArticle> GetArticlesOfSalesman(List<IArticle> articles, long salesmanId);
        List<IOrder> GetOrdersWithSalesmanItems(List<IOrder> orders, long salesmanId);
        void UpdateArticle(UpdateArticleDto updateArticleDto, IArticle article);
        List<IItem> GetItemsOfOrder(List<IItem> allItems, long salesmanId, long orderId);
        List<IItem> GetItemsOfSalesman(List<IItem> items, long salesmanId);



    }
}
