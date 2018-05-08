using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/MotivosViaje")]
    public class MotivosViajeController : Base.BaseApiController
    {
        private readonly MotivosViajeBusiness _repository;

        public MotivosViajeController(ILogger logger) : base(logger)
        {
            _repository = new MotivosViajeBusiness();
        }

        [HttpGet]
        [Route("GetMotivosViaje")]
        public async Task<ApiResponse<IList<CatMotivosViaje>>> GetMotivosViaje()
        {
            return await Task.Run(() => _repository.GetMotivosViaje());
        }
    }
}