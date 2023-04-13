require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/views/layers/FeatureLayerView",

  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/widgets/ScaleBar",
  "esri/widgets/Compass",
  "esri/rest/locator",
], function(esriConfig, WebMap, MapView, Locate, Search, ScaleBar, Compass, locator, FeatureLayer, FeatureLayerView) {
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

  // Add widgets
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

  const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  view.on("click", function(evt){
    const params = {
      location: evt.mapPoint
    };

   locator.locationToAddress(serviceUrl, params)
      .then(function(response) { // Show the address found
        const address = response.address;
        console.log(response)
        showAddress(address, evt.mapPoint);
      }, function(err) { // Show no address found
        showAddress("No address found.", evt.mapPoint);
      });

  });

  function showAddress(address, pt) {
    view.popup.open({
      title:  + Math.round(pt.longitude * 100000)/100000 + ", " + Math.round(pt.latitude * 100000)/100000,
      content: address,
      location: pt
    });
  }

  const search = new Search({
    view: view,
    container: document.getElementById("location")
  });

  // Add widgets to map
  view.ui.add(scalebar, "bottom-left");
  view.ui.add([locate,compass], "top-left");
  view.ui.add(scalebar, "bottom-left");

  // Perform analysis
  let form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the form from submitting

      // User Inputs
      const scenario = document.getElementById("scenario-select").value;
      const loc = document.getElementById("location-input").value;
      const lifespan = document.getElementById("lifespan-input").value;
      const buildYear = document.getElementById("year-input").value;
      const riskCat = document.getElementById("category-select").value;
      const method = document.getElementById("method-select").value;
      const units = document.getElementById("units-select").value;
      // const submitBtn = document.getElementById("submit-btn");

      // console.log(scenario)
      // console.log(loc)
      // console.log(lifespan)
      // console.log(buildYear)
      // console.log(riskCat)
      // console.log(method)
      // console.log(units)
      console.log(webmap.layers.getItemAt())

      // // Get FIPS code from location input
      // var geometryService = new esri.tasks.GeometryService("https://geoenrich.arcgis.com/arcgis/rest/services/World/GeoEnrichmentServer/StandardGeographyQuery");

      // // Set up a new instance of the FeatureLayer to query for counties
      // var countyLayer = new esri.layers.FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3");

      // // Use the GeometryService to geocode the address and get its point location
      // var geocodeParams = new esri.tasks.GeocodeParameters();
      // geocodeParams.address = { SingleLine: loc };
      // geometryService.geocode(geocodeParams, function(result) {
      //   var point = result[0].location;

      //   // Set up a query to find the county the point is located in
      //   var query = new esri.tasks.Query();
      //   query.geometry = point;
      //   query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

      //   // Execute the query against the county layer and get the county FIPS code
      //   countyLayer.queryFeatures(query, function(featureSet) {
      //     var countyFeature = featureSet.features[0];
      //     var fipsCode = countyFeature.attributes["STATE_FIPS"] + countyFeature.attributes["COUNTY_FIPS"];
      //     console.log("County FIPS code: " + fipsCode);
      //     var FIPS = fipsCode
      //   });
      // });


      // // Query
      // featureLayer.setQuery(scenario)
      // var query = new esri.tasks.Query();
      // query.where = "county_fips = " + FIPS;
      
      // featureLayer.queryFeatures(query, function(featureSet) {
      //   // Iterate through the features and do something with each one
      //   var features = featureSet.features;
      //   for (var i = 0; i < features.length; i++) {
      //     var feature = features[i];
      //     // Do something with the feature, such as display its attributes or geometry
      //     console.log(feature.attributes);
      //     console.log(feature.geometry);
      //   }
      // });
      
      console.log(calc_winds(data, buildYear, riskCat, lifespan, method, units))
    })

});