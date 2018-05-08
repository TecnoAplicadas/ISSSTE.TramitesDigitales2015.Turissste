using ISSSTE.Tramites2015.Common.Mail;
using ISSSTE.Tramites2015.Common.Util;
using Microsoft.Practices.Unity;
using System.Configuration;
using System.Web.Http;
using Unity.WebApi;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion
{
    public static class UnityApiConfig
    {
        #region Static Properties

        /// <summary>
        /// Obtiene la ruta relativa donde se encuentra el html a utilizar como plantilla de los correos
        /// </summary>
        //private static string MailMasterPagePath
        //{
        //    get
        //    {
        //        return System.Web.Hosting.HostingEnvironment.MapPath(ConfigurationManager.AppSettings["MailMasterPagePath"]);
        //    }
        //}

        ///// <summary>
        ///// Obtiene la ruta relativa donde se encuentra la a utilizar como logo para los correos
        ///// </summary>
        //private static string MailMasterPageLogoPath
        //{
        //    get
        //    {
        //        return System.Web.Hosting.HostingEnvironment.MapPath(ConfigurationManager.AppSettings["MailMasterPageLogoPath"]);
        //    }
        //}

        #endregion

        #region Static Methods

        /// <summary>
        /// Registra los tipos necesarios para los controladores Web API
        /// </summary>
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            container.RegisterType<ILogger, Logger>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        #endregion Static Methods
    }
}