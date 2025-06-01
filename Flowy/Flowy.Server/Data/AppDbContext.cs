using Microsoft.EntityFrameworkCore;
using Flowy.Server.Models;

namespace Flowy.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<FlowyWorkFlowNameList> FlowyWorkFlowNameList { get; set; }
    }
}
