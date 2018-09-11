using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext( DbContextOptions<DataContext> options) : base(options){

        }

        public DbSet<Value> Values{ set; get;}
        public DbSet<User> Users{ set; get;}
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { set; get;}

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Like>()
                    .HasKey(k => new { k.LikerId, k.LikeeId });
            builder.Entity<Like>()
            .HasOne(u => u.Likee)
            .WithMany(u => u.Liker)
            .HasForeignKey( u => u.LikerId)
            .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Like>()
           .HasOne(u => u.Liker)
           .WithMany(u => u.Likee)
           .HasForeignKey(u => u.LikeeId)
           .OnDelete(DeleteBehavior.Restrict);

        }
    }
}