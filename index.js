require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/WebMap",
  // "esri/layers/CSVLayer",

  "esri/Basemap",
  "esri/layers/Geoprocessor",
  "esri/tasks/Geoprocessor",
  // "esri/layers/VectorTileLayer",
  // "esri/layers/TileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",

  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/widgets/Expand",
  // "esri/widgets/Compass",

  // "esri/tasks/QueryTask",
  // "esri/tasks/support/Query",
  // "esri/Graphic",

  // "esri/core/urlUtils"

], function(esriConfig, WebMap, MapView, Geoprocessor,
  FeatureLayer,
  // VectorTileLayer, TileLayer, Basemap, 
  Locate, Search, Expand) {

  esriConfig.apiKey = "AAPK67c58f2fc7db4d2c94008117be9258dfQgEtYssZ96mCuu03Lw7S0xw0kMlTLFhj7BNBSpuip6n7BvD-Drz-GoDehFlw5pqx";
  
// const vectorTileLayer = new VectorTileLayer({
//   portalItem: {
//     id: "6976148c11bd497d8624206f9ee03e30" // Forest and Parks Canvas
//   },
//   opacity: .75
// });

// const imageTileLayer = new TileLayer({
//   portalItem: {
//     id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
//   }
// });

// const basemap = new Basemap({
//   baseLayers: [
//     imageTileLayer,
//     vectorTileLayer
//   ]
// });
// Create a WebMap object from a Portal item ID
var webmap = new WebMap({
  portalItem: {
    id: "64bc30d474a540dba020895891b1d5db"
  }
});

// Create a GeoJSONLayer that points to the output of your R geoprocessing tool
var gp = new Geoprocessor({
  portalItem: {
    id: "d71ff138e39b490d84f8b10a861ac929"
  }  
});

// Add the layer to your web map
webmap.add(layer);

// // Set the parameters for your geoprocessing tool
// var params = {
//   "input": processForm(event)
// };

// // Execute the geoprocessing tool and add the results to your web map
// gp.execute(params).then(function(results) {
//   // Create a FeatureLayer from the output of the geoprocessing tool
//   var layer = new FeatureLayer({
//     source: results.output,
//     objectIdField: "OBJECTID",
//     fields: results.fields,
//     renderer: {
//       type: "simple",
//       symbol: {
//         type: "simple-fill",
//         color: [255, 0, 0, 0.5],
//         outline: {
//           color: [255, 0, 0, 1],
//           width: 1
//         }
//       }
//     }
//   });

//   // Add the layer to your web map
//   webmap.add(layer);
// });


// const map = new Map({
//   basemap: "topo-vector" //arcgis-topographic" //Basemap layer service
// });

const view = new MapView({
  container: "viewDiv", // Div element
  map: webmap,//map,
  center: [-74.6, 37.5], // Longitude, latitude
  zoom: 5,             // Zoom level
});

// const locate = new Locate({
//   view: view,
//   useHeadingEnabled: false,
//   goToOverride: function(view, options) {
//     options.target.scale = 1500;
//     return view.goTo(options.target);
//   }
// });
// view.ui.add(locate, "top-left");


// const search = new Search({       // Add Search widget
//   view: view
// });
// view.ui.add(search, "top-right"); 

// const urlSSP245 = "https://services.arcgis.com/4Ko8f1mCWFLyY4NV/arcgis/rest/services/Design_wind_speeds_for_the_U_S__Gulf_and_Atlantic_Coasts_WFL1/FeatureServer/7"
// const urlSSP585 ="https://services.arcgis.com/4Ko8f1mCWFLyY4NV/arcgis/rest/services/Design_wind_speeds_for_the_U_S__Gulf_and_Atlantic_Coasts_WFL1/FeatureServer/6";
// const featureLayerSSP245 = new FeatureLayer({
//   url: urlSSP245,
//   opacity: 0
// });
// map.add(featureLayerSSP245)

// const featureLayerSSP585 = new FeatureLayer({
//   url: urlSSP585,
//   opacity: 0
// });
// map.add(featureLayerSSP585)

// const featureLayer = new FeatureLayer({
//   url: "https://services.arcgis.com/4Ko8f1mCWFLyY4NV/arcgis/rest/services/Design_wind_speeds_for_the_U_S__Gulf_and_Atlantic_Coasts_WFL1/FeatureServer",
//   opacity: 0
// });
// map.add(featureLayer)


});