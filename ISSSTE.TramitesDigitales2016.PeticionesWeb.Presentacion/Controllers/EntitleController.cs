using System.Web.Mvc;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    public class EntitleController : Controller
    {
        public ActionResult Index(string noIssste)
        {
            return View();
        }
    }
}