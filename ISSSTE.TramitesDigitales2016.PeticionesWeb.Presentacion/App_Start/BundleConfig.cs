using System.Web;
using System.Web.Optimization;
using ISSSTE.Tramites2015.Common.Web;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion
{
    public class BundleConfig
    {
        // Para obtener más información sobre Bundles, visite http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jquery")
               .IncludeDirectory("~/Scripts/Libraries/jQuery", "*.js", false)
               .Include("~/Scripts/jquery-ui.js")
             );

            bundles.Add(new StyleBundle("~/bundles/EntitleIndex").Include(
                     "~/Content/EntitleCss/EntitleIndex.css"
            ));

            bundles.Add(new StyleBundle("~/bundles/DatePicker")
            .Include("~/Content/jquery-ui.css",
            "~/Content/jquery-ui.structure.css",
            "~/Content/jquery-ui.structure.min.css",
            "~/Content/jquery-ui.theme.css",
            "~/Content/jquery-ui.theme.min.css"));


            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                   .IncludeDirectory("~/Scripts/Libraries/Modernizr", "*.js", false)
               );


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/ramda")
                .Include(
                    "~/Scripts/Libraries/ramda/ramda.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include(
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-route.js",
                    "~/Scripts/angular-sanitize.js",
                    "~/Scripts/angular-local-storage.js",
                    "~/Scripts/angular-base64-upload.js",
                    "~/Scripts/AngularUI/ui-router.min.js",
                    "~/Scripts/angular-messages.js",
                    "~/Scripts/angular-animate.min.js",
                    "~/Scripts/json-export-excel.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/angular-auto-validate")
                .Include(
                    "~/Scripts/Libraries/AngularAutoValidate/jcs-auto-validate.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/angular-upload")
                .Include(
                    "~/Scripts/Libraries/AngularUpload/startup.js",
                    "~/Scripts/Libraries/AngularUpload/ng-file-upload-all.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-datetimepicker")
                .Include(
                    "~/Scripts/Libraries/BootstrapDatetimePicker/moment-with-locales.js",
                    "~/Scripts/Libraries/BootstrapDatetimePicker/bootstrap-datetimepicker.js",
                    "~/Scripts/Libraries/BootstrapDatetimePicker/angular-bootstrap-datetimepicker-directive.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/respond")
                .IncludeDirectory("~/Scripts/Libraries/Respond", "*.js", false)
            );

            bundles.Add(new ScriptBundle("~/bundles/utils")
                .IncludeDirectory("~/Scripts/Libraries/Util", "*.js", false)
            );

            //Applications CSS and UI Scripts
            bundles.Add(new StyleBundle("~/bundles/CssLayoutPeticiones/css")
            .IncludeWithCssRewriteTransform(
            "~/Content/CssLayoutPeticiones/fontModal.css"
            ));

            bundles.Add(new StyleBundle("~/bundles/entitle/css")
                .IncludeWithCssRewriteTransform(
                "~/Content/Entitle/breadcrum.css",
                "~/Content/Entitle/bootstrap-datetimepicker.css",
                "~/Content/Entitle/abl.css",
                "~/Content/Entitle/custom.css",
                "~/Content/Entitle/site.css",
                "~/Content/Entitle/gobmxfix.css"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/entitle/javascript")
                .Include(
                    "~/Scripts/Entitle/UI/bootstrap.min.js",
                    "~/Scripts/Entitle/UI/moment-with-locales.js",
                    "~/Scripts/Entitle/UI/bootstrap-datetimepicker.js",
                    "~/Scripts/Entitle/UI/scripts.js",
                    "~/Scripts/Entitle/UI/systemAlerts.js"
                )
            );

            bundles.Add(new StyleBundle("~/bundles/administrator/css")
                .IncludeWithCssRewriteTransform(
                    "~/Content/Administrator/bootstrap.css",
                    "~/Content/Administrator/font-awesome.min.css",
                    "~/Content/Administrator/general.css",
                    "~/Content/Administrator/menu.css",
                    "~/Content/Administrator/menu-lateral.css",
                    "~/Content/Administrator/buscador.css",
                    "~/Content/Administrator/site.css"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/administrator/javascript")
                .Include(
                    "~/Scripts/Administrator/UI/bootstrap.js",
                    "~/Scripts/Administrator/UI/scripts.js",
                    "~/Scripts/Administrator/UI/agregar-tabla.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/entitle/angular")
                .Include(
                    "~/Scripts/Entitle/App/app.js",
                    "~/Scripts/Entitle/App/config.js"
                )
                .IncludeDirectory("~/Scripts/Entitle/App/Common", "*.js", true)
                .IncludeDirectory("~/Scripts/Entitle/App/Controllers", "*.js", true)
                .IncludeDirectory("~/Scripts/Entitle/App/ServiceFactory", "*.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/administrator/app")
                .IncludeDirectory("~/Scripts/Administrator/App/resources", "*.js", true)
                .Include(
                    "~/Scripts/Administrator/App/app.js",
                    "~/Scripts/Administrator/App/config.js",
                    "~/Scripts/Administrator/App/config.exceptionHandler.js",
                    "~/Scripts/Administrator/App/config.routes.js",
                    "~/Scripts/FileSaver.js"
                )
                .IncludeDirectory("~/Scripts/Administrator/App/common", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/Controllers","*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/ServiceFactory", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/error", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/fileDisplay", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/fileUpload", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/search", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/requests", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/catalogs", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/login", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/indicators", "*.js", true)
                .IncludeDirectory("~/Scripts/Administrator/App/support", "*.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/administrator/app/login")
               .IncludeDirectory("~/Scripts/Administrator/App/resources", "*.js", true)
               .Include(
                   "~/Scripts/Administrator/App/app.js",
                   "~/Scripts/Administrator/App/config.js",
                   "~/Scripts/Administrator/App/config.exceptionHandler.js"
               )
               .IncludeDirectory("~/Scripts/Administrator/App/common", "*.js", true)
               .IncludeDirectory("~/Scripts/Administrator/App/login", "*.js", true)
           );

            //Se deshabilita el bundle, pues cuando se minifica se tiene un problema con las rutas de las fuentes de bootstrap
            BundleTable.EnableOptimizations = false;

            //#if DEBUG
            //            BundleTable.EnableOptimizations = false;
            //#else
            //            BundleTable.EnableOptimizations = true;
            //#endif

        }
    }
}
