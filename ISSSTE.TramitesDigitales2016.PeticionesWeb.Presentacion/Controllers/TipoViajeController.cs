using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/TipoViaje")]
    public class TipoViajeController : Base.BaseApiController
    {
        private readonly TipoViajeBusiness _repository;

        public TipoViajeController(ILogger logger) : base(logger)
        {
            _repository = new TipoViajeBusiness();
        }

        [HttpGet]
        [Route("GetTiposViaje")]
        public async Task<ApiResponse<IList<CatTiposViaje>>> GetTiposViaje()
        {
            return await Task.Run(() => _repository.GetTiposViaje());
        }
    }
}