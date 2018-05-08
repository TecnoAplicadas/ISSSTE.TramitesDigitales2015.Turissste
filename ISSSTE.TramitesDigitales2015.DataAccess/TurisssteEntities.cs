using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ISSSTE.TramitesDigitales2015.DataAccess
{
    public class TurisssteEntities : DbContext
    {
        public TurisssteEntities() : base("name=TurisssteEntities")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CatEstados>().HasKey(e => e.IdEstado);
            modelBuilder.Entity<CatGenero>().HasKey(g => g.IdGenero);
            modelBuilder.Entity<CatMotivosViaje>().HasKey(m => m.IdMotivoViaje);
            modelBuilder.Entity<CatPaquetesTuristicos>().HasKey(e => e.IdPaqueteTuristico);
            modelBuilder.Entity<CatRangoEdades>().HasKey(r => r.IdRangoEdad);
            modelBuilder.Entity<CatTemporadas>().HasKey(t => t.IdTemporada);
            modelBuilder.Entity<CatTiposDestino>().HasKey(d => d.IdTipoDestino);
            modelBuilder.Entity<CatTiposViaje>().HasKey(v => v.IdTipoViaje);
            modelBuilder.Entity<Configuracion>().HasKey(c => c.IdConfiguracion);
            modelBuilder.Entity<Derechohabiente>().HasKey(e => e.IdDerechohabiente);
            modelBuilder.Entity<Encuesta>().HasKey(e => e.IdEncuesta);            

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<CatEstados> CatEstados { get; set; }
        public DbSet<CatGenero> CatGenero { get; set; }
        public DbSet<CatMotivosViaje> CatMotivosViaje { get; set; }
        public DbSet<CatPaquetesTuristicos> CatPaquetesTuristicos { get; set; }
        public DbSet<CatRangoEdades> CatRangoEdades { get; set; }
        public DbSet<CatTemporadas> CatTemporadas { get; set; }
        public DbSet<CatTiposDestino> CatTiposDestino { get; set; }
        public DbSet<CatTiposViaje> CatTiposViaje { get; set; }
        public DbSet<Configuracion> Configuracion { get; set; }
        public DbSet<Derechohabiente> Derechohabiente { get; set; }
        public DbSet<Encuesta> Encuesta { get; set; }
    }
}