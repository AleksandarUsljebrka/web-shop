using Data.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers.Interfaces
{
    public interface IImageHelper
    {
        public void AddProductImageIfExists(IArticle article, IFormFile receivedImage, long salesmanId);
        public void UpdateProductImagePath(IArticle article);
        public byte[] GetArticleProductImage(IArticle article);
        public void DeleteArticleProductImageIfExists(IArticle article);
        public byte[] GetProfileImage(string profileImageName);
        public bool UploadProfileImage(IUser user, IFormFile profileImage);
        public void UpdateProfileImagePath(IUser currentUser, string newUsername);

    }
}
