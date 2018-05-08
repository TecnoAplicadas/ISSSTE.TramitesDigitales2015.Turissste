using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.DataAccess;
using ISSSTE.TramitesDigitales2015.Domain.DTO;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using static ISSSTE.Tramites2015.Common.Util.Enums;

namespace ISSSTE.TramitesDigitales2015.Business
{
    public class PaquetesTuristicosBusiness
    {
        private readonly IGenericDataRepository<CatPaquetesTuristicos> _repository;

        public PaquetesTuristicosBusiness()
        {
            _repository = new GenericDataRepository<CatPaquetesTuristicos>();
        }

        public ApiResponse<IList<DTOCatPaquetesTuristicos>> GetPaquetesTuristicos()
        {
            ApiResponse<IList<DTOCatPaquetesTuristicos>> apiResponse = new ApiResponse<IList<DTOCatPaquetesTuristicos>>();

            try
            {
                GenericDataRepository<CatTiposDestino> tiposDestinoRepository = new GenericDataRepository<CatTiposDestino>();

                IList<CatTiposDestino> tiposDestinoList = tiposDestinoRepository.GetAll();

                IList<CatPaquetesTuristicos> paquetesTuristicosList = _repository.GetAll();

                apiResponse.Data = (from paquete in paquetesTuristicosList
                                    join tipoDestino in tiposDestinoList on paquete.IdTipoDestino equals tipoDestino.IdTipoDestino
                                    select new DTOCatPaquetesTuristicos
                                    {
                                        IdPaqueteTuristico = paquete.IdPaqueteTuristico,
                                        Nombre = paquete.Nombre,
                                        Descripcion = paquete.Descripcion,
                                        Imagen = paquete.Imagen,
                                        IdTipoDestino = paquete.IdTipoDestino,
                                        Promocionado = paquete.Promocionado,
                                        TipoDestino = tipoDestino.Nombre
                                    }).ToList();

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

        public ApiResponse<int> AddPaqueteTuristico(CatPaquetesTuristicos paqueteTuristico)
        {
            ApiResponse<int> apiResponse = new ApiResponse<int>();

            try
            {
                apiResponse.Data = _repository.Add(paqueteTuristico);

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

        public ApiResponse<int> UpdatePaqueteTuristico(CatPaquetesTuristicos paqueteTuristico)
        {
            ApiResponse<int> apiResponse = new ApiResponse<int>();

            try
            {
                apiResponse.Data = _repository.Update(paqueteTuristico);

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

        public ApiResponse<CatPaquetesTuristicos> GetPaqueteTuristicoPorDerechohabiente(long idDerechohabiente)
        {
            ApiResponse<CatPaquetesTuristicos> apiResponse = new ApiResponse<CatPaquetesTuristicos>();

            try
            {
                GenericDataRepository<Encuesta> encuestaRepository = new GenericDataRepository<Encuesta>();

                Encuesta encuesta = encuestaRepository.GetSingle(x => x.IdDerechohabiente == idDerechohabiente && x.FechaAplicacion.Year == DateTime.Now.Year);

                apiResponse.Data = _repository.GetSingle(x => x.IdTipoDestino == encuesta.IdTipoDestino && x.Promocionado == false);

                if (apiResponse.Data != null)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                    apiResponse.Message = Resources.ConsultaExitosa;
                }

                else if (apiResponse.Data == null)
                {
                    apiResponse.Result = (int)ApiResult.Initial;
                    apiResponse.Message = Resources.ConsultaSinResultados;
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

        public ApiResponse<CatPaquetesTuristicos> GetPaqueteTuristicoPromocionado()
        {
            ApiResponse<CatPaquetesTuristicos> apiResponse = new ApiResponse<CatPaquetesTuristicos>();

            try
            {
                Random random = new Random();

                apiResponse.Data = _repository.GetList(x => x.Promocionado == true)
                                              .OrderBy(x => random.Next())
                                              .Take(1)
                                              .FirstOrDefault();

                if (apiResponse.Data != null)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                    apiResponse.Message = Resources.ConsultaExitosa;
                }

                else if (apiResponse.Data == null)
                {
                    apiResponse.Result = (int)ApiResult.Initial;
                    apiResponse.Message = Resources.ConsultaSinResultados;
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

        public ApiResponse<bool> ExistsPaquetePromocional()
        {
            ApiResponse<bool> apiResponse = new ApiResponse<bool>();

            try
            {
                CatPaquetesTuristicos paqueteTuristico = _repository.GetSingle(x => x.Promocionado);

                apiResponse.Data = paqueteTuristico != null ? true : false;

                if (apiResponse.Data || (!apiResponse.Data && paqueteTuristico == null))
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