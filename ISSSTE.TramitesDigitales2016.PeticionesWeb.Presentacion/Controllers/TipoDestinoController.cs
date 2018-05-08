using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/TipoDestino")]
    public class TipoDestinoController : Base.BaseApiController
    {
        private readonly TipoDestinoBusiness _repository;

        public TipoDestinoController(ILogger logger) : base(logger)
        {
            _repository = new TipoDestinoBusiness();
        }

        [HttpGet]
        [Route("GetTiposDestino")]
        public async Task<ApiResponse<IList<CatTiposDestino>>> GetTiposDestino()
        {
            return await Task.Run(() => _repository.GetTiposDestino());
        }
    }
}