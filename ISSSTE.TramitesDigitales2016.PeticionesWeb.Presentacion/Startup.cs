using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Startup))]


namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
