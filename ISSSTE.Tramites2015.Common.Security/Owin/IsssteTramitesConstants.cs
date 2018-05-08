﻿namespace ISSSTE.Tramites2015.Common.Security.Owin
{
    using System.Configuration;

    /// <summary>
    /// Contiene constantes a utilizar durante le proceso de autorización
    /// </summary>
    public class IsssteTramitesConstants
    {
        #region Fields

        /// <summary>
        /// Tipo de autenticación para el sistema de seguridad del ISSSTE del app.config
        /// </summary>
        public const string DefaultAuthenticationType = "Tramites ISSSTE";

        #endregion

        #region Properties

        /// <summary>
        /// Url base del sistema de seguridad del ISSSTE del app.config
        /// </summary>
        public static string BaseUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["ISSSTE.Tramites2015.Common.Security.Owin.Constants.Server.WSBaseUrl"];
            }
        }

        /// <summary>
        /// Url absoluta para obtener un token OAuth 2.0 dentro del sistema de seguridad del ISSSTE del app.config
        /// </summary>
        public static string TokenUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["ISSSTE.Tramites2015.Common.Security.Owin.Constants.Client.TokenUrl"];
            }
        }

        /// <summary>
        /// Url absoluta para validar un token OAuth 2.0 dentro del sistema de seguridad del ISSSTE del app.config
        /// </summary>
        public static string TokenValidationUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["ISSSTE.Tramites2015.Common.Security.Owin.Constants.Server.TokenValidationUrl"];
            }
        }

        /// <summary>
        /// Url absoluta para iniciar sesión dentro del sistema de seguridad del ISSSTE del app.config
        /// </summary>
        public static string LogoutUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["ISSSTE.Tramites2015.Common.Security.Owin.Constants.Client.LogoutUrl"];
            }
        }

        /// <summary>
        /// Url absoluta para cerrar sesión dentro del sistema de seguridad del ISSSTE del app.config
        /// </summary>
        public static string LoginUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["ISSSTE.Tramites2015.Common.Security.Owin.Constants.Client.LoginUrl"];
            }
        }

        #endregion
    }
}