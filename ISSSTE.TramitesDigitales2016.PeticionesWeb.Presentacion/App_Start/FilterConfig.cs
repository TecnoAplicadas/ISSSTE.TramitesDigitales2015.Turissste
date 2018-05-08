using System.Web;
using System.Web.Mvc;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
