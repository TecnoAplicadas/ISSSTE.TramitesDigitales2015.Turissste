﻿using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.DataAccess;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System;
using System.Collections.Generic;
using static ISSSTE.Tramites2015.Common.Util.Enums;

namespace ISSSTE.TramitesDigitales2015.Business
{
    public class TemporadasBusiness
    {
        private readonly IGenericDataRepository<CatTemporadas> _repository;

        public TemporadasBusiness()
        {
            _repository = new GenericDataRepository<CatTemporadas>();
        }

        public ApiResponse<IList<CatTemporadas>> GetTemporadas()
        {
            ApiResponse<IList<CatTemporadas>> apiResponse = new ApiResponse<IList<CatTemporadas>>();

            try
            {
                apiResponse.Data = _repository.GetAll();

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
            catch (Exception ex)
            {
                apiResponse.Result = (int)ApiResult.Exception;
                apiResponse.Message = ex.Message;
            }

            return apiResponse;
        }
    }
}