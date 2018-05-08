using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Http;
using Newtonsoft.Json;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion
{
   
   
    //public class WebApiApplication : System.Web.HttpApplication
    //{

    //    protected void Application_Start()
    //    {
    //        AreaRegistration.RegisterAllAreas();
    //        UnityApiConfig.RegisterComponents();
    //        GlobalConfiguration.Configure(WebApiConfig.Register);
    //        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
    //        RouteConfig.RegisterRoutes(RouteTable.Routes);
    //        BundleConfig.RegisterBundles(BundleTable.Bundles);

    //        //Configura comportamiento de la serialización JSON de Web API
    //        HttpConfiguration config = GlobalConfiguration.Configuration;
    //        config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    //        config.Formatters.JsonFormatter.SerializerSettings.DateFormatString = "dd/MM/yyyy";
    //    }
    //    //protected void Application_Start()
    //    //{
    //    //    AreaRegistration.RegisterAllAreas();
    //    //    UnityApiConfig.RegisterComponents();
    //    //    GlobalConfiguration.Configure(WebApiConfig.Register);
    //    //    FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
    //    //    RouteConfig.RegisterRoutes(RouteTable.Routes);
    //    //    BundleConfig.RegisterBundles(BundleTable.Bundles);

    //    //    //Configura comportamiento de la serialización JSON de Web API
    //    //    HttpConfiguration config = GlobalConfiguration.Configuration;
    //    //    config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    //    //    config.Formatters.JsonFormatter.SerializerSettings.DateFormatString = "dd/MM/yyyy";
    //    //}
    //}

    #region Old Code
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            UnityApiConfig.RegisterComponents();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //Configura comportamiento de la serialización JSON de Web API
            HttpConfiguration config = GlobalConfiguration.Configuration;
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            config.Formatters.JsonFormatter.SerializerSettings.DateFormatString = "dd/MM/yyyy";
        }
    }

    #endregion
}
