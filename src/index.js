import './styles.css';
import * as winds from './calcWinds.js';
import ss from 'simple-statistics';
import * as esriLoader from 'esri-loader';

esriLoader.loadModules([  "esri/config", "esri/WebMap", "esri/views/MapView", 
  "esri/widgets/Locate", "esri/widgets/Search","esri/widgets/ScaleBar",
  "esri/widgets/Compass","esri/rest/locator",], {css: true})
  .then(([esriConfig, WebMap, MapView, Locate, Search, ScaleBar, Compass, locator]) => {
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

    // const search = new Search({
    //   view: view,
    //   container: document.getElementById("location")
    // });

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
      const lifespan = parseInt(document.getElementById("lifespan-input").value);
      const buildYear = parseInt(document.getElementById("year-input").value);
      const riskCat = parseInt(document.getElementById("category-select").value);
      const method = document.getElementById("method-select").value;
      const units = document.getElementById("units-select").value;

      // Get relevant feature layer
      var featureLayer = webmap.allLayers.find(function(featureLayer) {
        return featureLayer.title === scenario;
      });

      // Wait for the layer to load
      featureLayer.load().then(() => {
        // Create a new query
        const query = featureLayer.createQuery();
        query.where =  `county_fips = '${parseInt(loc)}'`

        // Run the query and return the results
        featureLayer.queryFeatures(query).then(function(result){
          if (result.features.length > 0) {
            var data = result.features[0].attributes;

            // Create an empty list to store the field-value pairs
            const dataList = {};

            // Loop through the properties of the object and add them to the list
            for (const field in data) {
              if (data.hasOwnProperty(field)) {
                dataList[field] = data[field];
              }
            }

            winds.calc_winds(dataList, buildYear, riskCat, lifespan, method, units)
          } else {
            alert(`No data was found for location: ${loc}. Please try again with a different location.`)
          }
        }).catch(function(error){
          console.error(error);

        });
      }).catch(error => {
        console.error("Error loading feature layer:", error);
      });
      
    })

  }).catch(err => {
    console.error(err);
  });

  

  

  // const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  // view.on("click", function(evt){
  //   const params = {
  //     location: evt.mapPoint
  //   };

  //  locator.locationToAddress(serviceUrl, params)
  //     .then(function(response) { // Show the address found
  //       const address = response.address;
  //       console.log(response)
  //       showAddress(address, evt.mapPoint);
  //     }, function(err) { // Show no address found
  //       showAddress("No address found.", evt.mapPoint);
  //     });

  // });

  // function showAddress(address, pt) {
  //   view.popup.open({
  //     title:  + Math.round(pt.longitude * 100000)/100000 + ", " + Math.round(pt.latitude * 100000)/100000,
  //     content: address,
  //     location: pt
  //   });
  // }