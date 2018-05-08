using System.Web.Http;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.TramitesDigitales2015.Business;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System.Threading.Tasks;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.Domain.DTO;
using System.Net.Http;
using System.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;
using static ISSSTE.Tramites2015.Common.Util.Enums;
using ISSSTE.TramitesDigitales2015.DataAccess;
using System.Linq;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers
{
    [RoutePrefix("api/Derechohabiente")]
    public class DerechohabienteController : Base.BaseApiController
    {
        private readonly DerechohabienteBusiness _repository;

        public DerechohabienteController(ILogger logger) : base(logger)
        {
            _repository = new DerechohabienteBusiness();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="derechohabiente"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddDerechohabiente")]
        public async Task<ApiResponse<long>> AddDerechohabiente(Derechohabiente derechohabiente)
        {
            return await Task.Run(() => _repository.AddDerechohabiente(derechohabiente));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="noIssste"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDerechohabienteByNoIssste")]
        public async Task<ApiResponse<DTODerechohabiente>> GetDerechohabienteByNoIssste(string noIssste)
        {
            return await Task.Run(() => _repository.GetDerechohabienteByNoIssste(noIssste));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idDerechohabiente"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDerechohabienteById")]
        public async Task<ApiResponse<DTODerechohabiente>> GetDerechohabienteById(long idDerechohabiente)
        {
            return await Task.Run(() => _repository.GetDerechohabienteById(idDerechohabiente));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="derechohabiente"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("UpdateDatosContactoDerechohabiente")]
        public async Task<ApiResponse<int>> UpdateDatosContactoDerechohabiente(Derechohabiente derechohabiente)
        {
            return await Task.Run(() => _repository.UpdateDatosContactoDerechohabiente(derechohabiente));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="noIssste"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDerechohabienteService")]
        public async Task<ApiResponse<DTODerechohabiente>> GetDerechohabienteService(string noIssste)
        {
            ApiResponse<DTODerechohabiente> apiResponse = new ApiResponse<DTODerechohabiente>();

            try
            {
                string result = string.Empty;

                string aVBaseUrl = ConfigurationManager.AppSettings["InformixWSBaseUrl"];
                string aVService = string.Format(ConfigurationManager.AppSettings["InformixWSEntitle"], noIssste);

                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(aVBaseUrl);

                    HttpResponseMessage response = await client.GetAsync(aVService);

                    if (response.IsSuccessStatusCode)
                    {
                        result = await response.Content.ReadAsStringAsync();
                    }
                }

                if (result.Length >= 3)
                {
                    DTODerechohabienteService derechohabienteService = JsonConvert.DeserializeObject<IList<DTODerechohabienteService>>(result).FirstOrDefault();

                    GenericDataRepository<CatEstados> estadosRepository = new GenericDataRepository<CatEstados>();

                    CatEstados estadoDerechohabiente = estadosRepository.GetSingle(x => x.Clave == derechohabienteService.EntityBirth);

                    apiResponse.Data = new DTODerechohabiente()
                    {
                        Nombre = derechohabienteService.Name,
                        ApellidoPaterno = derechohabienteService.FirstSurname,
                        ApellidoMaterno = derechohabienteService.SecondSurname,
                        NombreCompleto = string.Join(" ", new[] { derechohabienteService.Name, derechohabienteService.FirstSurname, derechohabienteService.SecondSurname }),
                        FechaNacimiento = derechohabienteService.BirthDate,
                        Edad = DateTime.Now.Year - derechohabienteService.BirthDate.Year,
                        Rfc = derechohabienteService.Rfc,
                        Curp = derechohabienteService.Curp,
                        NoIssste = derechohabienteService.NumIssste,
                        Delegacion = derechohabienteService.DelegationCode,
                        Afiliacion = derechohabienteService.State,
                        IdGenero = derechohabienteService.Genger == "M" ? 1 : 2,
                        Genero = derechohabienteService.Genger == "M" ? "MUJER" : "HOMBRE",
                        IdEstado = estadoDerechohabiente.IdEstado,
                        TipoDerechohabiente = derechohabienteService.DirectType == "T" ? "TRABAJADOR" : "PENSIONADO",
                        Estado = estadoDerechohabiente.Nombre.ToUpper()
                    };

                    if (apiResponse.Data != null)
                    {
                        apiResponse.Result = (int)ApiResult.Success;
                        apiResponse.Message = Resources.ConsultaExitosa;
                    }

                    else
                    {
                        apiResponse.Result = (int)ApiResult.Failure;
                        apiResponse.Message = Resources.ConsultaFallida;
                    }
                }

                else
                {
                    apiResponse.Result = (int)ApiResult.Failure;
                    apiResponse.Message = Resources.ConsultaFallida;
                }
            }
            catch (Exception ex)
            {
                apiResponse.Result = (int)ApiResult.Exception;
                apiResponse.Message = ex.Message;
            }

            return apiResponse;
        }
    }
}