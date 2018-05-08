using System.Web.Http;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.Tramites2015.Common.Util;

namespace ISSSTE.TramitesDigitales2016.PeticionesWeb.Presentacion.Controllers
{
    [RoutePrefix("api/Configuracion")]
    public class ConfiguracionController : BaseApiController
    {
        private readonly ConfiguracionBusiness _repository;

        public ConfiguracionController(ILogger logger) : base(logger)
        {
            _repository = new ConfiguracionBusiness();
        }

        [HttpGet]
        [Route("GetConfigurationByKey")]
        public async Task<ApiResponse<Configuracion>> GetConfigurationByKey(string key)
        {
            return await Task.Run(() => _repository.GetConfigurationByKey(key));
        }

        [HttpPost]
        [Route("UpdateConfiguration")]
        public async Task<ApiResponse<int>> UpdateConfiguration(Configuracion configuracion)
        {
            return await Task.Run(() => _repository.UpdateConfiguration(configuracion));
        }
    }
}