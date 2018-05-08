using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/RangoEdades")]
    public class RangoEdadesController : Base.BaseApiController
    {
        private readonly RangoEdadesBusiness _repository;

        public RangoEdadesController(ILogger logger) : base(logger)
        {
            _repository = new RangoEdadesBusiness();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetRangosEdades")]
        public async Task<ApiResponse<IList<CatRangoEdades>>> GetRangosEdades()
        {
            return await Task.Run(() => _repository.GetRangosEdades());
        }
    }
}