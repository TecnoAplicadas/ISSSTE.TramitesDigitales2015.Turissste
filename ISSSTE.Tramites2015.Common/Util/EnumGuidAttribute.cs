﻿#region

using System;

#endregion

namespace ISSSTE.Tramites2015.Common.Util
{
    /// <summary>
    ///     Clase que exitende un atributo sobre un Enum
    /// </summary>
    public class EnumGuidAttribute : Attribute
    {
        /// <summary>
        /// Guid que el valor del enumerador representa
        /// </summary>
        public Guid Guid;

        /// <summary>
        /// Constructor de la clase
        /// </summary>
        /// <param name="guid">Guid que el valor del enumerador representa</param>
        public EnumGuidAttribute(String guid)
        {
            Guid = new Guid(guid);
        }
    }
}