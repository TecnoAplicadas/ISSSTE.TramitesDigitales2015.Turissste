using System;

namespace ISSSTE.TramitesDigitales2015.Domain.Entities
{
    public class Encuesta
    {
        public long IdEncuesta { get; set; }
        public long IdDerechohabiente { get; set; }
        public int IdTipoDestino { get; set; }
        public int IdTemporada { get; set; }
        public int IdTipoViaje { get; set; }
        public int IdMotivoViaje { get; set; }
        public DateTime FechaAplicacion { get; set; }
    }
}