using Microsoft.EntityFrameworkCore;

namespace Bioskop.Models
{
    public class BioskopContext:DbContext
    {
        public DbSet<BioskopK> Bioskopi{get;set;}
        public DbSet<Sala> Sale{get;set;}
        public DbSet<Film> Filmovi{get;set;}
          public DbSet<FilmSala> FilmSala{get;set;}
        public BioskopContext(DbContextOptions options):base(options)
        {

        }

    }
}