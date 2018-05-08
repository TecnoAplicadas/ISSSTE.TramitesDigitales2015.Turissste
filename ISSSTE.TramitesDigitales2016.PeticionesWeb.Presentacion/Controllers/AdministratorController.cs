using System.Web.Mvc;

namespace ISSSTE.TramitesDigitales2015.PeticionesWeb.Presentacion.Controllers
{
    [Authorize]
    public class AdministratorController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}