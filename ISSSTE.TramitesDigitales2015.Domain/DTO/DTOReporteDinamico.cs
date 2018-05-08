using System;

namespace ISSSTE.TramitesDigitales2015.Domain.DTO
{
    public class DTOReporteDinamico
    {
        public string Destino { get; set; }
        public string TemporadaVacacional { get; set; }
        public string Viaje { get; set; }
        public string Motivo { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Lada { get; set; }
        public string CorreoElectronico { get; set; }
        public string Genero { get; set; }
        public int Edad { get; set; }
        public string Estado { get; set; }
        public string Derechohabiente { get; set; }
        public string Afiliacion { get; set; }
        public string RecibirInformacion { get; set; }

        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
    }
}