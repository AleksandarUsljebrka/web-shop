using Data.Models.Interfaces;
using DataAccess.DTO.Article;
using DataAccess.Helpers.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers
{
    public class SalesmanHelper : ISalesmanHelper
    {
        public List<IArticle> GetArticlesOfSalesman(List<IArticle> articles, long salesmanId)
        {
            List<IArticle> result = new List<IArticle>();

            foreach(var artical in articles)
            {
                if (artical.SalesmanId == salesmanId)
                    result.Add(artical);
            }
            return result;
        }

        public List<IOrder> GetOrdersWithSalesmanItems(List<IOrder> orders, long salesmanId)
        {
            List<IOrder> resultOrders = new List<IOrder>();

            resultOrders = orders.Where(order => order.Items.Any(item => item.Article.SalesmanId == salesmanId)).ToList();
            return resultOrders;
        }

		public void UpdateArticle(UpdateArticleDto updateArticleDto, IArticle article)
		{
			if (updateArticleDto == null || article == null)
			{
				return;
			}

			if (!string.IsNullOrWhiteSpace(updateArticleDto.NewName))
			{
				article.Name = updateArticleDto.NewName;
				
			}

			if (!string.IsNullOrWhiteSpace(updateArticleDto.Description))
			{
				article.Description = updateArticleDto.Description;
			}

			if (updateArticleDto.Quantity >= 0)
			{
				article.Quantity = updateArticleDto.Quantity;
			}

			if (updateArticleDto.Price >= 1)
			{
				article.Price = updateArticleDto.Price;
			}
		}


		//obrisati ovu, ne radi nacin sa njom
		public List<IItem> GetItemsOfOrder(List<IItem> allItems, long salesmanId, long orderId)
        {
			List<IItem> resultList = new List<IItem>();

			resultList = allItems.FindAll(i => i.Article.SalesmanId == salesmanId && i.OrderId == orderId);
			return resultList;
        }
		public List<IItem> GetItemsOfSalesman(List<IItem> items, long salesmanId)
        {
			List<IItem> resultList = new List<IItem>();
			resultList = items.FindAll(i => i.Article.SalesmanId == salesmanId);
			return resultList;
        }
	}
}
