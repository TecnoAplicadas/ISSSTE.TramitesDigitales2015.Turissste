using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/Temporadas")]
    public class TemporadasController : Base.BaseApiController
    {
        private readonly TemporadasBusiness _repository;

        public TemporadasController(ILogger logger) : base(logger)
        {
            _repository = new TemporadasBusiness();
        }

        [HttpGet]
        [Route("GetTemporadas")]
        public async Task<ApiResponse<IList<CatTemporadas>>> GetTemporadas()
        {
            return await Task.Run(() => _repository.GetTemporadas());
        }
    }
}