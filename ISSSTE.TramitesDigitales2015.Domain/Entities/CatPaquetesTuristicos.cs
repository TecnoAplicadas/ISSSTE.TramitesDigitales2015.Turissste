namespace ISSSTE.TramitesDigitales2015.Domain.Entities
{
    public class CatPaquetesTuristicos
    {
        public int IdPaqueteTuristico { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public byte[] Imagen { get; set; }
        public int IdTipoDestino { get; set; }
        public bool Promocionado { get; set; }
    }
}