using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.DataAccess;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System;
using static ISSSTE.Tramites2015.Common.Util.Enums;

namespace ISSSTE.TramitesDigitales2015.Business
{
    public class ConfiguracionBusiness
    {
        private readonly IGenericDataRepository<Configuracion> _repository;

        public ConfiguracionBusiness()
        {
            _repository = new GenericDataRepository<Configuracion>();
        }

        public ApiResponse<Configuracion> GetConfigurationByKey(string llave)
        {
            ApiResponse<Configuracion> apiResponse = new ApiResponse<Configuracion>();

            try
            {
                apiResponse.Data = _repository.GetSingle(x => x.Llave == llave);

                if (apiResponse.Data != null)
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

        public ApiResponse<int> UpdateConfiguration(Configuracion configuracion)
        {
            ApiResponse<int> apiResponse = new ApiResponse<int>();

            try
            {
                apiResponse.Data = _repository.Update(configuracion);

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