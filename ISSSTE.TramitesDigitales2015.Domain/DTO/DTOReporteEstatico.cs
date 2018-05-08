using System;

namespace ISSSTE.TramitesDigitales2015.Domain.DTO
{
    public class DTOReporteEstatico
    {
        public string Destino { get; set; }
        public string TemporadaVacacional { get; set; }
        public string Viaje { get; set; }
        public string Motivo { get; set; }
        public string Genero { get; set; }
        public int Edad { get; set; }
        public string Estado { get; set; }

        public int? RangoInferior { get; set; }
        public int? RangoSuperior { get; set; }
        public int? IdGenero { get; set; }
        public int? IdEstado { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
    }
}