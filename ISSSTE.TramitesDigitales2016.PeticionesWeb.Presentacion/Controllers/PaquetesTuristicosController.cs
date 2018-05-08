using System.Collections.Generic;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.Domain.DTO;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/PaquetesTuristicos")]
    public class PaquetesTuristicosController : Base.BaseApiController
    {
        private readonly PaquetesTuristicosBusiness _repository;

        public PaquetesTuristicosController(ILogger logger) : base(logger)
        {
            _repository = new PaquetesTuristicosBusiness();
        }

        [HttpGet]
        [Route("GetPaquetesTuristicos")]
        public async Task<ApiResponse<IList<DTOCatPaquetesTuristicos>>> GetPaquetesTuristicos()
        {
            return await Task.Run(() => _repository.GetPaquetesTuristicos());
        }

        [HttpGet]
        [Route("GetPaqueteTuristicoPorDerechohabiente")]
        public async Task<ApiResponse<CatPaquetesTuristicos>> GetPaqueteTuristicoPorDerechohabiente(long idDerechohabiente)
        {
            return await Task.Run(() => _repository.GetPaqueteTuristicoPorDerechohabiente(idDerechohabiente));
        }

        [HttpGet]
        [Route("GetPaqueteTuristicoPromocionado")]
        public async Task<ApiResponse<CatPaquetesTuristicos>> GetPaqueteTuristicoPromocionado()
        {
            return await Task.Run(() => _repository.GetPaqueteTuristicoPromocionado());
        }

        [HttpPost]
        [Route("AddPaqueteTuristico")]
        public async Task<ApiResponse<int>> AddPaqueteTuristico(CatPaquetesTuristicos paqueteTuristico)
        {
            return await Task.Run(() => _repository.AddPaqueteTuristico(paqueteTuristico));
        }

        [HttpPut]
        [Route("UpdatePaqueteTuristico")]
        public async Task<ApiResponse<int>> UpdatePaqueteTuristico(CatPaquetesTuristicos paqueteTuristico)
        {
            return await Task.Run(() => _repository.UpdatePaqueteTuristico(paqueteTuristico));
        }

        [HttpGet]
        [Route("ExistsPaquetePromocional")]
        public async Task<ApiResponse<bool>> ExistsPaquetePromocional()
        {
            return await Task.Run(() => _repository.ExistsPaquetePromocional());
        }
    }
}