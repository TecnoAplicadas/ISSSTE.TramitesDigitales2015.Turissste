using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.DataAccess;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System;
using static ISSSTE.Tramites2015.Common.Util.Enums;

namespace ISSSTE.TramitesDigitales2015.Business
{
    public class EncuestaBusiness
    {
        private readonly IGenericDataRepository<Encuesta> _repository;

        public EncuestaBusiness()
        {
            _repository = new GenericDataRepository<Encuesta>();
        }

        public ApiResponse<bool> EncuestaExist(int idDerechohabiente)
        {
            ApiResponse<bool> apiResponse = new ApiResponse<bool>();

            try
            {
                Encuesta encuesta = _repository.GetSingle(x => x.IdDerechohabiente == idDerechohabiente && x.FechaAplicacion.Year == DateTime.Now.Year);

                apiResponse.Data = encuesta != null ? true : false;

                if (apiResponse.Data)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                    apiResponse.Message = Resources.ConsultaExitosa;
                }

                else if (!apiResponse.Data && encuesta == null)
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
            catch (Exception ex)
            {
                apiResponse.Result = (int)ApiResult.Exception;
                apiResponse.Message = ex.Message;
            }

            return apiResponse;
        }

        public ApiResponse<int> AddEncuesta(Encuesta encuesta)
        {
            ApiResponse<int> apiResponse = new ApiResponse<int>();

            try
            {
                apiResponse.Data = _repository.Add(encuesta);

                if (apiResponse.Data == (int)EntityFrameworkResult.Success)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                    apiResponse.Message = Resources.RegistroExitoso;
                }

                else
                {
                    apiResponse.Result = (int)ApiResult.Failure;
                    apiResponse.Message = Resources.RegistroFallido;
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