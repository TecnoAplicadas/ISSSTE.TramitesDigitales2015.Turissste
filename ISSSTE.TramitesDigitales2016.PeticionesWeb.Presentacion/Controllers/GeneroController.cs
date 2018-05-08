using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/Genero")]
    public class GeneroController : Base.BaseApiController
    {
        private readonly GeneroBusiness _repository;

        public GeneroController(ILogger logger) : base(logger)
        {
            _repository = new GeneroBusiness();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetGeneros")]
        public async Task<ApiResponse<IList<CatGenero>>> GetGeneros()
        {
            return await Task.Run(() => _repository.GetGeneros());
        }
    }
}