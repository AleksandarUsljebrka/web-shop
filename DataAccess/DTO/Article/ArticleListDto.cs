using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Article
{
    public class ArticleListDto:IDto
    {
        public List<ArticleDto> Articles { get; set; }
    }
}
