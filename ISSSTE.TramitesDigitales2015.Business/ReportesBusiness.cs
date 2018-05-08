using ISSSTE.TramitesDigitales2015.DataAccess;
using ISSSTE.TramitesDigitales2015.Domain.DTO;
using ISSSTE.TramitesDigitales2015.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using ISSSTE.Tramites2015.Common.Convertion;
using ISSSTE.Tramites2015.Common.Export;
using System.IO;
using ISSSTE.Tramites2015.Common.Web;
using static ISSSTE.Tramites2015.Common.Util.Enums;
using ISSSTE.Tramites2015.Common.Util;

namespace ISSSTE.TramitesDigitales2015.Business
{
    public class ReportesBusiness
    {
        private readonly IGenericDataRepository<Encuesta> _encuestaRepository;
        private readonly IGenericDataRepository<Derechohabiente> _derechohabienteRepository;
        private readonly IGenericDataRepository<CatTiposDestino> _tiposDestinoRepository;
        private readonly IGenericDataRepository<CatTemporadas> _temporadasRepository;
        private readonly IGenericDataRepository<CatTiposViaje> _tiposViajeRepository;
        private readonly IGenericDataRepository<CatGenero> _generoRepository;
        private readonly IGenericDataRepository<CatEstados> _estadoRepository;

        public ReportesBusiness()
        {
            _encuestaRepository = new GenericDataRepository<Encuesta>();
            _derechohabienteRepository = new GenericDataRepository<Derechohabiente>();
            _tiposDestinoRepository = new GenericDataRepository<CatTiposDestino>();
            _temporadasRepository = new GenericDataRepository<CatTemporadas>();
            _tiposViajeRepository = new GenericDataRepository<CatTiposViaje>();
            _generoRepository = new GenericDataRepository<CatGenero>();
            _estadoRepository = new GenericDataRepository<CatEstados>();
        }

        public ApiResponse<IList<DTOReporteEstatico>> GetReporteEstatico(DTOReporteEstatico reporteEstatico)
        {
            ApiResponse<IList<DTOReporteEstatico>> apiResponse = new ApiResponse<IList<DTOReporteEstatico>>();

            try
            {
                IList<Derechohabiente> derechohabientes = _derechohabienteRepository.GetList(x => (reporteEstatico.IdEstado != null ? x.IdEstado == reporteEstatico.IdEstado : x.IdEstado == x.IdEstado)
                                                                                                 && (reporteEstatico.IdGenero != null ? x.IdGenero == reporteEstatico.IdGenero : x.IdGenero == x.IdGenero)
                                                                                                 && (reporteEstatico.RangoInferior != null ? (reporteEstatico.RangoInferior <= (DateTime.Now.Year - x.FechaNacimiento.Year)) : x.FechaNacimiento == x.FechaNacimiento)
                                                                                                 && (reporteEstatico.RangoInferior != null ? (reporteEstatico.RangoSuperior >= (DateTime.Now.Year - x.FechaNacimiento.Year)) : x.FechaNacimiento == x.FechaNacimiento));

                apiResponse.Data = (from encuesta in _encuestaRepository.GetList(x => x.FechaAplicacion >= reporteEstatico.FechaInicio.Date && x.FechaAplicacion.Date <= reporteEstatico.FechaFin.Date)
                                    join derechohabiente in derechohabientes on encuesta.IdDerechohabiente equals derechohabiente.IdDerechohabiente
                                    from tipoDestino in _tiposDestinoRepository.GetList(x => x.IdTipoDestino == encuesta.IdTipoDestino).Take(1).DefaultIfEmpty()
                                    from temporada in _temporadasRepository.GetList(x => x.IdTemporada == encuesta.IdTemporada).Take(1).DefaultIfEmpty()
                                    from viaje in _tiposViajeRepository.GetList(x => x.IdTipoViaje == encuesta.IdTipoViaje).Take(1).DefaultIfEmpty()
                                    from genero in _generoRepository.GetList(x => x.IdGenero == derechohabiente.IdGenero).Take(1).DefaultIfEmpty()
                                    from estado in _estadoRepository.GetList(x => x.IdEstado == derechohabiente.IdEstado).Take(1).DefaultIfEmpty()
                                    select new DTOReporteEstatico
                                    {
                                        Destino = tipoDestino.Nombre,
                                        TemporadaVacacional = temporada.Nombre,
                                        Viaje = viaje.Nombre,
                                        Genero = genero.Genero,
                                        Edad = DateTime.Now.Year - derechohabiente.FechaNacimiento.Year,
                                        Estado = estado.Nombre
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

        public ApiResponse<IList<DTOReporteDinamico>> GetReporteDinamico(DTOReporteDinamico reporteDinamico)
        {
            ApiResponse<IList<DTOReporteDinamico>> apiResponse = new ApiResponse<IList<DTOReporteDinamico>>();

            try
            {
                GenericDataRepository<CatMotivosViaje> motivosViajeRepository = new GenericDataRepository<CatMotivosViaje>();

                apiResponse.Data = (from encuesta in _encuestaRepository.GetList(x => x.FechaAplicacion >= reporteDinamico.FechaInicio.Date && x.FechaAplicacion.Date <= reporteDinamico.FechaFin.Date)
                                    from derechohabiente in _derechohabienteRepository.GetList(x => x.IdDerechohabiente == encuesta.IdDerechohabiente).Take(1).DefaultIfEmpty()
                                    from tipoDestino in _tiposDestinoRepository.GetList(x => x.IdTipoDestino == encuesta.IdTipoDestino).Take(1).DefaultIfEmpty()
                                    from temporada in _temporadasRepository.GetList(x => x.IdTemporada == encuesta.IdTemporada).Take(1).DefaultIfEmpty()
                                    from viaje in _tiposViajeRepository.GetList(x => x.IdTipoViaje == encuesta.IdTipoViaje).Take(1).DefaultIfEmpty()
                                    from motivo in motivosViajeRepository.GetList(x => x.IdMotivoViaje == encuesta.IdMotivoViaje).Take(1).DefaultIfEmpty()
                                    from genero in _generoRepository.GetList(x => x.IdGenero == derechohabiente.IdGenero).Take(1).DefaultIfEmpty()
                                    from estado in _estadoRepository.GetList(x => x.IdEstado == derechohabiente.IdEstado).Take(1).DefaultIfEmpty()
                                    select new DTOReporteDinamico
                                    {
                                        Destino = tipoDestino.Nombre,
                                        TemporadaVacacional = temporada.Nombre,
                                        Viaje = viaje.Nombre,
                                        Motivo = motivo.Nombre,
                                        Nombre = string.Join(" ", new[] { derechohabiente.Nombre, derechohabiente.ApellidoPaterno, derechohabiente.ApellidoMaterno }),
                                        Lada = derechohabiente.Lada,
                                        Telefono = derechohabiente.Telefono,
                                        CorreoElectronico = derechohabiente.CorreoElectronico,
                                        Genero = genero.Genero,
                                        Edad = DateTime.Now.Year - derechohabiente.FechaNacimiento.Year,
                                        Estado = estado.Nombre,
                                        Derechohabiente = derechohabiente.TipoDerechohabiente,
                                        Afiliacion = derechohabiente.Afiliacion,
                                        RecibirInformacion = derechohabiente.RecibirInformacion == true ? "SI" : "NO"
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

        public MemoryStream GetReporteEstatico(DTOReporteEstatico reporteEstatico, string fileName)
        {
            MemoryStream memoryStream = null;

            try
            {
                IList<Derechohabiente> derechohabientes = _derechohabienteRepository.GetList(x => (reporteEstatico.IdEstado != null ? x.IdEstado == reporteEstatico.IdEstado : x.IdEstado == x.IdEstado)
                                                                                                  && (reporteEstatico.IdGenero != null ? x.IdGenero == reporteEstatico.IdGenero : x.IdGenero == x.IdGenero)
                                                                                                  && (reporteEstatico.RangoInferior != null ? (reporteEstatico.RangoInferior <= (DateTime.Now.Year - x.FechaNacimiento.Year)) : x.FechaNacimiento == x.FechaNacimiento)
                                                                                                  && (reporteEstatico.RangoInferior != null ? (reporteEstatico.RangoSuperior >= (DateTime.Now.Year - x.FechaNacimiento.Year)) : x.FechaNacimiento == x.FechaNacimiento));

                IList<DTOReporteEstatico> reporteEstaticoList = (from encuesta in _encuestaRepository.GetList(x => x.FechaAplicacion >= reporteEstatico.FechaInicio.Date && x.FechaAplicacion.Date <= reporteEstatico.FechaFin.Date)
                                                                 join derechohabiente in derechohabientes on encuesta.IdDerechohabiente equals derechohabiente.IdDerechohabiente
                                                                 from tipoDestino in _tiposDestinoRepository.GetList(x => x.IdTipoDestino == encuesta.IdTipoDestino).Take(1).DefaultIfEmpty()
                                                                 from temporada in _temporadasRepository.GetList(x => x.IdTemporada == encuesta.IdTemporada).Take(1).DefaultIfEmpty()
                                                                 from viaje in _tiposViajeRepository.GetList(x => x.IdTipoViaje == encuesta.IdTipoViaje).Take(1).DefaultIfEmpty()
                                                                 from genero in _generoRepository.GetList(x => x.IdGenero == derechohabiente.IdGenero).Take(1).DefaultIfEmpty()
                                                                 from estado in _estadoRepository.GetList(x => x.IdEstado == derechohabiente.IdEstado).Take(1).DefaultIfEmpty()
                                                                 select new DTOReporteEstatico
                                                                 {
                                                                     Destino = tipoDestino.Nombre,
                                                                     TemporadaVacacional = temporada.Nombre,
                                                                     Viaje = viaje.Nombre,
                                                                     Genero = genero.Genero,
                                                                     Edad = DateTime.Now.Year - derechohabiente.FechaNacimiento.Year,
                                                                     Estado = estado.Nombre
                                                                 }).ToList();

                DataTable reporteEstaticoDataTable = ToDataTable.IListToDataTable(new List<DTOReporteEstatico>(reporteEstaticoList));

                memoryStream = ToExcel.ExportToExcel(reporteEstaticoDataTable, fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return memoryStream;
        }

        public MemoryStream GetReporteDinamico(DTOReporteDinamico reporteDinamico, string fileName)
        {
            MemoryStream memoryStream = null;

            try
            {
                GenericDataRepository<CatMotivosViaje> motivosViajeRepository = new GenericDataRepository<CatMotivosViaje>();

                IList<DTOReporteDinamico> reporteDinamicoList = (from encuesta in _encuestaRepository.GetList(x => x.FechaAplicacion >= reporteDinamico.FechaInicio.Date && x.FechaAplicacion.Date <= reporteDinamico.FechaFin.Date)
                                                                 from derechohabiente in _derechohabienteRepository.GetList(x => x.IdDerechohabiente == encuesta.IdDerechohabiente).Take(1).DefaultIfEmpty()
                                                                 from tipoDestino in _tiposDestinoRepository.GetList(x => x.IdTipoDestino == encuesta.IdTipoDestino).Take(1).DefaultIfEmpty()
                                                                 from temporada in _temporadasRepository.GetList(x => x.IdTemporada == encuesta.IdTemporada).Take(1).DefaultIfEmpty()
                                                                 from viaje in _tiposViajeRepository.GetList(x => x.IdTipoViaje == encuesta.IdTipoViaje).Take(1).DefaultIfEmpty()
                                                                 from motivo in motivosViajeRepository.GetList(x => x.IdMotivoViaje == encuesta.IdMotivoViaje).Take(1).DefaultIfEmpty()
                                                                 from genero in _generoRepository.GetList(x => x.IdGenero == derechohabiente.IdGenero).Take(1).DefaultIfEmpty()
                                                                 from estado in _estadoRepository.GetList(x => x.IdEstado == derechohabiente.IdEstado).Take(1).DefaultIfEmpty()
                                                                 select new DTOReporteDinamico
                                                                 {
                                                                     Destino = tipoDestino.Nombre,
                                                                     TemporadaVacacional = temporada.Nombre,
                                                                     Viaje = viaje.Nombre,
                                                                     Motivo = motivo.Nombre,
                                                                     Nombre = derechohabiente.Nombre + " " + derechohabiente.ApellidoPaterno + " " + derechohabiente.ApellidoMaterno,
                                                                     Genero = genero.Genero,
                                                                     Edad = DateTime.Now.Year - derechohabiente.FechaNacimiento.Year,
                                                                     Estado = estado.Nombre,
                                                                     Derechohabiente = derechohabiente.TipoDerechohabiente,
                                                                     Afiliacion = derechohabiente.Afiliacion
                                                                 })
                                                                 .ToList();

                DataTable reporteDinamicoDataTable = ToDataTable.IListToDataTable(new List<DTOReporteDinamico>(reporteDinamicoList));

                memoryStream = ToExcel.ExportToExcel(reporteDinamicoDataTable, fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return memoryStream;
        }
    }
}