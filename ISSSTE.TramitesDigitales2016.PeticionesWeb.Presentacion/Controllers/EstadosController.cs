using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/Estados")]
    public class EstadosController : Base.BaseApiController
    {
        private readonly EstadosBusiness _repository;

        public EstadosController(ILogger logger) : base(logger)
        {
            _repository = new EstadosBusiness();
        }

        [HttpGet]
        [Route("GetEstados")]
        public async Task<ApiResponse<IList<CatEstados>>> GetEstados()
        {
            return await Task.Run(() => _repository.GetEstados());
        }
    }
}