using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class SalesmanConfiguration : IEntityTypeConfiguration<Salesman>
	{
		public void Configure(EntityTypeBuilder<Salesman> builder)
		{
			builder.HasKey(x => x.Id);

			builder.Property(x => x.Id).ValueGeneratedOnAdd();

			builder.HasIndex(x => x.Username)
				.IsUnique();
			builder.Property(x => x.Username)
				.IsRequired();

			builder.Property(x => x.Email)
				.IsRequired();

			builder.Property(x => x.ProfileImage)
				.HasColumnType("varchar(100)");

			builder.Property(x => x.ApprovalStatus)
				.HasConversion<string>();

			builder.HasMany(x => x.Articles)
				.WithOne(x => x.Salesman)
				.HasForeignKey(x => x.SalesmanId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
