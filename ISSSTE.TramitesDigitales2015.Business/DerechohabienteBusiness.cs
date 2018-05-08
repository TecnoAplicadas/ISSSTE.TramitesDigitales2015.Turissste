using AutoMapper;
using ISSSTE.Tramites2015.Common.Util;
using ISSSTE.Tramites2015.Common.Web;
using ISSSTE.TramitesDigitales2015.DataAccess;
using ISSSTE.TramitesDigitales2015.Domain.DTO;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System;
using static ISSSTE.Tramites2015.Common.Util.Enums;

namespace ISSSTE.TramitesDigitales2015.Business
{
    public class DerechohabienteBusiness
    {
        private readonly IGenericDataRepository<Derechohabiente> _repository;

        public DerechohabienteBusiness()
        {
            _repository = new GenericDataRepository<Derechohabiente>();
        }

        public ApiResponse<long> AddDerechohabiente(Derechohabiente derechohabiente)
        {
            ApiResponse<long> apiResponse = new ApiResponse<long>();

            try
            {
                int result = _repository.Add(derechohabiente);

                if (result == (int)EntityFrameworkResult.Success)
                {
                    apiResponse.Data = derechohabiente.IdDerechohabiente;
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

        public ApiResponse<DTODerechohabiente> GetDerechohabienteByNoIssste(string noIssste)
        {
            ApiResponse<DTODerechohabiente> apiResponse = new ApiResponse<DTODerechohabiente>();

            try
            {
                MapperConfiguration mapperConfiguration = new MapperConfiguration(x => { x.CreateMap<Derechohabiente, DTODerechohabiente>(); });

                IMapper mapper = mapperConfiguration.CreateMapper();

                Derechohabiente derechohabiente = _repository.GetSingle(x => x.NoIssste == noIssste);

                if (derechohabiente != null)
                {
                    GenericDataRepository<CatEstados> estadosRepository = new GenericDataRepository<CatEstados>();

                    DTODerechohabiente derechohabienteDto = mapper.Map<Derechohabiente, DTODerechohabiente>(derechohabiente);

                    if (derechohabienteDto != null)
                    {
                        derechohabienteDto.TipoDerechohabiente = derechohabienteDto.TipoDerechohabiente == "T" ? "TRABAJADOR" : "PENSIONADO";
                        derechohabienteDto.NombreCompleto = string.Join(" ", new[] { derechohabienteDto.Nombre, derechohabienteDto.ApellidoPaterno, derechohabienteDto.ApellidoMaterno });
                        derechohabienteDto.Genero = derechohabienteDto.IdGenero == 1 ? "MUJER" : "HOMBRE";
                        derechohabienteDto.Edad = DateTime.Now.Year - derechohabienteDto.FechaNacimiento.Year;
                        derechohabienteDto.Estado = estadosRepository.GetSingle(x => x.IdEstado == derechohabienteDto.IdEstado).Nombre.ToUpper();

                        apiResponse.Data = derechohabienteDto;
                        apiResponse.Result = (int)ApiResult.Success;
                        apiResponse.Message = Resources.ConsultaExitosa;
                    }

                    else
                    {
                        apiResponse.Result = (int)ApiResult.Failure;
                        apiResponse.Message = Resources.ConsultaFallida;
                    }
                }

                else if(derechohabiente == null)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                }
            }
            catch (Exception ex)
            {
                apiResponse.Result = (int)ApiResult.Exception;
                apiResponse.Message = ex.Message;
            }

            return apiResponse;
        }

        public ApiResponse<DTODerechohabiente> GetDerechohabienteById(long idDerechohabiente)
        {
            ApiResponse<DTODerechohabiente> apiResponse = new ApiResponse<DTODerechohabiente>();

            try
            {
                MapperConfiguration mapperConfiguration = new MapperConfiguration(x => { x.CreateMap<Derechohabiente, DTODerechohabiente>(); });

                IMapper mapper = mapperConfiguration.CreateMapper();

                Derechohabiente derechohabiente = _repository.GetSingle(x => x.IdDerechohabiente == idDerechohabiente);

                if (derechohabiente != null)
                {
                    GenericDataRepository<CatEstados> estadosRepository = new GenericDataRepository<CatEstados>();

                    DTODerechohabiente derechohabienteDto = mapper.Map<Derechohabiente, DTODerechohabiente>(derechohabiente);

                    if (derechohabienteDto != null)
                    {
                        derechohabienteDto.TipoDerechohabiente = derechohabienteDto.TipoDerechohabiente == "T" ? "TRABAJADOR" : "PENSIONADO";
                        derechohabienteDto.NombreCompleto = string.Join(" ", new[] { derechohabienteDto.Nombre, derechohabienteDto.ApellidoPaterno, derechohabienteDto.ApellidoMaterno });
                        derechohabienteDto.Genero = derechohabienteDto.IdGenero == 1 ? "MUJER" : "HOMBRE";
                        derechohabienteDto.Edad = DateTime.Now.Year - derechohabienteDto.FechaNacimiento.Year;
                        derechohabienteDto.Estado = estadosRepository.GetSingle(x => x.IdEstado == derechohabienteDto.IdEstado).Nombre.ToUpper();

                        apiResponse.Data = derechohabienteDto;
                        apiResponse.Result = (int)ApiResult.Success;
                        apiResponse.Message = Resources.ConsultaExitosa;
                    }

                    else
                    {
                        apiResponse.Result = (int)ApiResult.Failure;
                        apiResponse.Message = Resources.ConsultaFallida;
                    }
                }

                else if (derechohabiente == null)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                }
            }
            catch (Exception ex)
            {
                apiResponse.Result = (int)ApiResult.Exception;
                apiResponse.Message = ex.Message;
            }

            return apiResponse;
        }

        public ApiResponse<int> UpdateDatosContactoDerechohabiente(Derechohabiente derechohabiente)
        {
            ApiResponse<int> apiResponse = new ApiResponse<int>();

            try
            {
                Derechohabiente derechohabienteEntity = _repository.GetSingle(x => x.NoIssste == derechohabiente.NoIssste);

                derechohabienteEntity.Telefono = derechohabiente.Telefono;
                derechohabienteEntity.Lada = derechohabiente.Lada;
                derechohabienteEntity.CorreoElectronico = derechohabiente.CorreoElectronico;
                derechohabienteEntity.RecibirInformacion = derechohabiente.RecibirInformacion;

                apiResponse.Data = _repository.Update(derechohabienteEntity);

                if (apiResponse.Data == (int)EntityFrameworkResult.Success)
                {
                    apiResponse.Result = (int)ApiResult.Success;
                    apiResponse.Message = Resources.ActualizacionExitosa;
                }

                else
                {
                    apiResponse.Result = (int)ApiResult.Failure;
                    apiResponse.Message = Resources.ActualizacionFallida;
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