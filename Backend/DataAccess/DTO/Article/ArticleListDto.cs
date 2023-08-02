using System.Collections.Generic;

namespace DataAccess.DTO.Article
{
    public class ArticleListDto:IDto
    {
        public List<ArticleDto> Articles { get; set; }
    }
}
