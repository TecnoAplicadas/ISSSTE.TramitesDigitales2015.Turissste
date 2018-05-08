using System.Linq;
using System.Web.Mvc;
using Microsoft.Practices.Unity.Mvc;
using ISSSTE.TramitesDigitales2016.PeticionesWeb.Presentacion.App_Start;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ISSSTE.TramitesDigitales2015.Turissste.Presentacion.App_Start.UnityWebActivator), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(ISSSTE.TramitesDigitales2015.Turissste.Presentacion.App_Start.UnityWebActivator), "Shutdown")]

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.App_Start
{
    /// <summary>Provides the bootstrapping for integrating Unity with ASP.NET MVC.</summary>
    public static class UnityWebActivator
    {
        /// <summary>Integrates Unity when the application starts.</summary>
        public static void Start() 
        {
            var container = UnityConfig.GetConfiguredContainer();

            FilterProviders.Providers.Remove(FilterProviders.Providers.OfType<FilterAttributeFilterProvider>().First());
            FilterProviders.Providers.Add(new UnityFilterAttributeFilterProvider(container));

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            // Uncomment if you want to use PerRequestLifetimeManager
            // Microsoft.Web.Infrastructure.DynamicModuleHelper.DynamicModuleUtility.RegisterModule(typeof(UnityPerRequestHttpModule));
        }

        /// <summary>Disposes the Unity container when the application is shut down.</summary>
        public static void Shutdown()
        {
            var container = UnityConfig.GetConfiguredContainer();
            container.Dispose();
        }
    }
}