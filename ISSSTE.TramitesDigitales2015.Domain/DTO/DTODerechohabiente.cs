using System;

namespace ISSSTE.TramitesDigitales2015.Domain.DTO
{
    public class DTODerechohabiente
    {
        public long? IdDerechohabiente { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Rfc { get; set; }
        public string Curp { get; set; }
        public string NoIssste { get; set; }
        public string Delegacion { get; set; }
        public string Telefono { get; set; }
        public string Lada { get; set; }
        public string CorreoElectronico { get; set; }
        public string TipoDerechohabiente { get; set; }
        public string Afiliacion { get; set; }
        public int IdGenero { get; set; }
        public int IdEstado { get; set; }
        public bool? RecibirInformacion { get; set; }

        public string NombreCompleto { get; set; }
        public string Genero { get; set; }
        public int? Edad { get; set; }
        public string Estado { get; set; }
    }
}