﻿using System.Collections.Generic;

namespace ISSSTE.Tramites2015.Common.Security.Core
{
    /// <summary>
    /// Representa el rol de un usuario
    /// </summary>
    public class IsssteRole
    {
        #region Properties

        /// <summary>
        /// Obtiene o asigna el Id del rol
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Obtiene o asigna el nombre del rol
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Obtiene o asigna la descripción del rol
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Obtiene o asigna los permisos que tiene el rol
        /// </summary>
        public List<IssstePermission> Permissions { get; set; }

        #endregion

        #region Constructor

        /// <summary>
        /// Constructor de la clase
        /// </summary>
        public IsssteRole()
        {
            this.Permissions = new List<IssstePermission>();
        }

        #endregion
    }
}
