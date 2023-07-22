using DataAccess.DTO.Article;
using DataAccess.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface ISalesmanService
    {
        IResult GetAllArticles(string token);
        IResult GetFinishedOrders(string token);
        IResult AddArticle(AddArticleDto addArticleDto, string token);
        IResult UpdateArticle(UpdateArticleDto updateArticleDto, string token);
        IResult GetOrderDetails(string token, long orderId);
        IResult GetPendingOrders(string token);
        IResult GetArticleDetails(string token, string name);
        IResult DeleteArticle(string token, string name);

    }
}
