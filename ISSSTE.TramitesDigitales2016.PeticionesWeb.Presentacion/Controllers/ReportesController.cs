using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.DTO;
using System.Web.Http;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.Tramites2015.Common.Util;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/Reportes")]
    public class ReportesController : BaseApiController
    {
        private readonly ReportesBusiness _repository;

        public ReportesController(ILogger logger) : base(logger)
        {
            _repository = new ReportesBusiness();
        }

        [HttpPost]
        [Route("GetReporteEstatico")]
        public async Task<ApiResponse<IList<DTOReporteEstatico>>> GetReporteEstatico(DTOReporteEstatico reporteEstatico)
        {
            return await Task.Run(() => _repository.GetReporteEstatico(reporteEstatico));
        }

        [HttpPost]
        [Route("GetReporteDinamico")]
        public async Task<ApiResponse<IList<DTOReporteDinamico>>> GetReporteDinamico(DTOReporteDinamico reporteDinamico)
        {
            return await Task.Run(() => _repository.GetReporteDinamico(reporteDinamico));
        }
    }
}