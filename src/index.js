import './styles.css';
import * as winds from './calcWinds.js';
import * as esriLoader from 'esri-loader';
import * as table from './generateTable.js';

esriLoader.loadModules([  
  "esri/config", "esri/WebMap", "esri/views/MapView", 
  "esri/widgets/Locate", "esri/widgets/Search", 
  "esri/widgets/ScaleBar","esri/widgets/Compass",
  "esri/widgets/BasemapGallery", "esri/layers/FeatureLayer",
  "esri/rest/support/Query", "esri/rest/locator", "esri/Graphic", "esri/geometry/Extent"
], {css: true})
  .then(([esriConfig, WebMap, MapView, Locate, Search, ScaleBar, Compass, FeatureLayer, Query, locator, Extent]) => {
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
          geometry: {
            type: "extent",
            xmin: -107,
            ymin:  25,
            xmax: -66,
            ymax:  48
          },
          spatialReference: {
            wkid: 4326
          }
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
          options.target.scale = 10000;
          return view.goTo(options.target);
      }
    });

    const compass = new Compass({
      view: view,
    });

    const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    const search = new Search({
      view: view,
      sources: [{
        url: serviceUrl,
        countryCode: "US",
        category: "Address",
        name: "Search",
        singleLineFieldName: "SingleLine",
        maxResults: 1,
        searchExtent: view.extent,
        autoSelect: true,
        visible: false,
        exactMatch: false,
      }],
      popupEnabled: false,
      // showPopupOnSelect: false,
    });
      
    // Add widgets to map
    view.ui.add(scalebar, "bottom-left");
    view.ui.add([locate, compass], "top-left");

    // Click listener to check for change in tab
    let openTab;
    let tabs = document.querySelectorAll(".tablinks");
    tabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        if (tab !== openTab) {
          view.graphics.removeAll();
          openTab = tab;
        }
      });
    });

    const formDiv = document.getElementById("form-div");
    var loc;
    
    // Location search
    let searchBtn = document.getElementById("search-btn");
    searchBtn.onclick = (e)=> {
      e.preventDefault()
      search.clear();       // Clear previous search result

      let el = document.getElementById("input-loc")
      search.search(el.value);
    }
    
    // Lat/Long Search
    let searchCoord = document.getElementById("search-latLong-btn"); 
    searchCoord.onclick = (e)=> {
      e.preventDefault();
      search.clear();       // Clear previous search result
  
      let lat = document.getElementById("lat").value;
      let long = document.getElementById("long").value;
      let coord = `${lat},${long}`;
      search.search(coord);
    }

    // Map Click
    view.on("click", clickListener);
    let searchClick = document.getElementById("tablinksClick");
    function clickListener(e) {
      search.clear();       // Clear previous search result

      let pt = e.mapPoint;
      if (searchClick.classList.contains("active")) {
          search.search(pt)
      }
    }

    var fipsLayer;
    webmap.load().then(function() {
      fipsLayer = webmap.allLayers.find(function(layer) {
        return layer.title === "USA Census Counties";
      });
    });

    // Get search results
    // search.on("search-complete", function(event){
    //   formDiv.classList.remove("hidden");
    //   loc = event.results[0].results[0].feature;
    //   console.log(loc)
    // })
    search.on("select-result", function(event){
      view.goTo({
        scale: 10000
      });
      formDiv.classList.remove("hidden");
      loc = event.result.feature;

      // Perform wind speed calculations
      let form = document.getElementById("form");
      form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault(); // Prevent the form from submitting

        // User Inputs
        const scenario = document.getElementById("scenario-select").value;
        const lifespan = parseInt(document.getElementById("lifespan-input").value);
        const buildYear = parseInt(document.getElementById("year-input").value);
        const riskCat = parseInt(document.getElementById("category-select").value);
        const method = document.getElementById("method-select").value;
        const units = document.getElementById("units-select").value;

        // Get FIPS code from search
        const queryFIPS = fipsLayer.createQuery();
        queryFIPS.geometry = loc.geometry;
        queryFIPS.spatialRelationship = "intersects";
        queryFIPS.outFields = ["FIPS", "NAME"];
        
        fipsLayer.queryFeatures(queryFIPS).then(function(response) {
          if (response.features.length === 0) {
            alert("Please select a valid location.")
          }
          else {
            const county = response.features[0];
            loc = county.attributes.FIPS;

            // Get relevant feature layer
            var featureLayer = webmap.allLayers.find(function(layer) {
              return layer.title === scenario;
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

                  // Calculate design winds
                  let results = winds.calc_winds(dataList, buildYear, riskCat, lifespan, method, units);
                  // Save form HTML and generate table with results
                  table.generateTable(results);
                  view.graphics.removeAll();
                  
                } else {
                  alert(`No data was found for ${county.attributes.NAME}. Note: only states along the Gulf and Atlantic Coasts are currently supported. Please try again with a different location.`)
                }
              })
            })
          }
        }, { once: true });  
      });
    });
  });