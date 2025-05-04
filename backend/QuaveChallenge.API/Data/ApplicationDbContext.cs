using Microsoft.EntityFrameworkCore;
using QuaveChallenge.API.Models;
using QuaveChallenge.API.Data.Configurations;

namespace QuaveChallenge.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Community> Communities { get; set; }
        public virtual DbSet<Person> People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new CommunityConfiguration());
            modelBuilder.ApplyConfiguration(new PersonConfiguration());
        }
    }
} 