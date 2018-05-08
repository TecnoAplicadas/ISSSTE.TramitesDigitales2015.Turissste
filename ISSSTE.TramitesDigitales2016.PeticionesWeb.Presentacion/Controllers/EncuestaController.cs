using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/Encuesta")]
    public class EncuestaController : Base.BaseApiController
    {
        private readonly EncuestaBusiness _repository;

        public EncuestaController(ILogger logger) : base(logger)
        {
            _repository = new EncuestaBusiness();
        }

        [HttpGet]
        [Route("EncuestaExist")]
        public async Task<ApiResponse<bool>> EncuestaExist(int idDerechohabiente)
        {
            return await Task.Run(() => _repository.EncuestaExist(idDerechohabiente));
        }

        [HttpPost]
        [Route("AddEncuesta")]
        public async Task<ApiResponse<int>> AddEncuesta(Encuesta encuesta)
        {
            return await Task.Run(() => _repository.AddEncuesta(encuesta));
        }
    }
}