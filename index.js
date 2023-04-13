require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/geometry/Extent",

  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/widgets/ScaleBar",
  "esri/widgets/Compass",
], function(esriConfig, WebMap, MapView, Extent, Locate, Search, ScaleBar, Compass) {
  esriConfig.apiKey = "AAPK67c58f2fc7db4d2c94008117be9258dfQgEtYssZ96mCuu03Lw7S0xw0kMlTLFhj7BNBSpuip6n7BvD-Drz-GoDehFlw5pqx";

  const webmap = new WebMap({
      portalItem: {
          id: "64bc30d474a540dba020895891b1d5db"
      }
  });

  const view = new MapView({
      container: "viewDiv",
      map: webmap,
      center: [-74.6, 37.5], // Longitude, latitude
      zoom: 5,               // Start zoom level
      constraints: {
          minZoom: 15,
          maxZoom: 4,
      },

  });

  const scalebar = new ScaleBar({
      view: view
  });

  const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function(view, options) {
          options.target.scale = 1500;
          return view.goTo(options.target);
      }
  });

  const compass = new Compass({
      view: view,
  });

  // Add widgets to map
  view.ui.add(scalebar, "bottom-left");
  view.ui.add([locate,compass], "top-left");
  view.ui.add(scalebar, "bottom-left");

});