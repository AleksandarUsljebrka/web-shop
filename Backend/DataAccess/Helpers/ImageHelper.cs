using Data.Models.Interfaces;
using DataAccess.DTO.Article;
using DataAccess.Helpers.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers
{
    public class ImageHelper:IImageHelper
    {
		private const string articleRelativePath = "../ArticleImages";
		public string ArticleRelativePath => articleRelativePath;

		private const string userRelativePath = "../ProfileImages";
		public string UserRelativePath => userRelativePath;
		public void AddProductImageIfExists(IArticle article, IFormFile receivedImage, long salesmanId)
		{
			if (receivedImage == null)
			{
				return;
			}

			string profileImageDir = Path.Combine(Directory.GetCurrentDirectory(), ArticleRelativePath);

			if (!Directory.Exists(profileImageDir))
			{
				Directory.CreateDirectory(profileImageDir);
			}

			string fileExtension = Path.GetExtension(receivedImage.FileName);
			string imageName = salesmanId + "_" + article.Name;
			string profileImageFileName = Path.Combine(profileImageDir, imageName) + fileExtension;

			using (FileStream fs = new FileStream(profileImageFileName, FileMode.Create))
			{
				receivedImage.CopyTo(fs);
			}

			article.ProductImage = imageName + fileExtension;
		}

		public void UpdateProductImagePath(IArticle article)
		{
			if (article.ProductImage == null)
			{
				return;
			}

			string oldProductImagePath = Path.Combine(Directory.GetCurrentDirectory(), ArticleRelativePath, article.ProductImage);

			if (!File.Exists(oldProductImagePath))
			{
				return;
			}

			string fileExtension = Path.GetExtension(article.ProductImage);
			string newProductImageName = article.SalesmanId + "_" + article.Name + fileExtension;

			string newProductImagePath = Path.Combine(Directory.GetCurrentDirectory(), ArticleRelativePath, newProductImageName);
			File.Move(oldProductImagePath, newProductImagePath);

			article.ProductImage = newProductImageName;
		}

		public byte[] GetArticleProductImage(IArticle article)
		{
			if (article == null || article.ProductImage == null)
			{
				return null; 
			}

			string productImageName = article.ProductImage;

			string productImagePath = Path.Combine(Directory.GetCurrentDirectory(), ArticleRelativePath, productImageName);

			if (!File.Exists(productImagePath))
			{
				return null;
			}

			byte[] image = File.ReadAllBytes(productImagePath);

			return image;
		}

		public void DeleteArticleProductImageIfExists(IArticle article)
		{
			if (article.ProductImage == null)
			{
				return;
			}

			string productImageName = article.ProductImage;
			string productImagePath = Path.Combine(Directory.GetCurrentDirectory(), ArticleRelativePath, productImageName);

			if (!File.Exists(productImagePath))
			{
				return;
			}

			File.Delete(productImagePath);
		}

		public byte[] GetProfileImage(string profileImageName)
		{
			if (profileImageName == null)
			{
				return null;
			}

			string path = Path.Combine(UserRelativePath, profileImageName);

			if (!File.Exists(path))
			{
				return null;
			}

			byte[] image = File.ReadAllBytes(path);

			return image;
		}
		public bool UploadProfileImage(IUser user, IFormFile profileImage)
		{
			if (profileImage == null)
				return false;
			if (user.ProfileImage != null)
			{
				string path = Path.Combine(UserRelativePath, user.ProfileImage);

				if (File.Exists(path))
				{
					File.Delete(path);
				}

				if (profileImage == null)
				{
					return true;
				}
			}
			string profileImageDir = Path.Combine(Directory.GetCurrentDirectory(), UserRelativePath);

			if (!Directory.Exists(profileImageDir))
			{
				Directory.CreateDirectory(profileImageDir);
			}

			string fileExtension = Path.GetExtension(profileImage.FileName);
			string profileImageFileName = Path.Combine(profileImageDir, user.Username) + fileExtension;

			using (FileStream fs = new FileStream(profileImageFileName, FileMode.Create))
			{
				profileImage.CopyTo(fs);
			}

			user.ProfileImage = user.Username + fileExtension;

			return true;
		}
		public void UpdateProfileImagePath(IUser currentUser, string newUsername)
		{
			if (currentUser.Username == newUsername)
			{
				return;
			}

			string oldProfileImagePath = Path.Combine(Directory.GetCurrentDirectory(), UserRelativePath, currentUser.ProfileImage);

			if (!File.Exists(oldProfileImagePath))
			{
				return;
			}

			string fileExtension = Path.GetExtension(currentUser.ProfileImage);
			string profileImageFileName = newUsername + fileExtension;

			string newProfileImagePath = Path.Combine(Directory.GetCurrentDirectory(), UserRelativePath, profileImageFileName);
			File.Move(oldProfileImagePath, newProfileImagePath);

			currentUser.ProfileImage = profileImageFileName;
		}
	}
}
