﻿using Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
	public class Article : IArticle	
	{
		public long Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int Quantity { get; set; }

		public double Price { get; set; }

		public string ProductImage { get; set; }

		public long SalesmanId { get; set; }

		public Salesman Salesman { get; set; }

		public ICollection<Item> Items { get; set; }
	}
}
