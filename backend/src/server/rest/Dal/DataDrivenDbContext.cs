using CaffStore.REST.Models;
using Microsoft.EntityFrameworkCore;

namespace CaffStore.REST.Dal
{
    public partial class DataDrivenDbContext : DbContext
    {
        public DataDrivenDbContext()
        {
        }

        public DataDrivenDbContext(DbContextOptions<DataDrivenDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Caff> Caffs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=caffstore;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Caff>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Name).HasMaxLength(50);
            });

        }
    }
}
