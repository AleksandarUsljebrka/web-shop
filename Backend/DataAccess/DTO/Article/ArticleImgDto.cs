using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Article
{
    public class ArticleImgDto
    {

        public string Name { get; set; }

        public IFormFile ProductImage { get; set; }
    }
}
