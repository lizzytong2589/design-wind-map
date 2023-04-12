function calc_LEP(test_value, sigma, xi, u, lambda, NTC_coeff, m) {
    let p_TC = 1;
    for (let i = 0; i < lambda.length; i++) {
      p_TC *= Math.exp(-lambda[i] * Math.pow(1 + xi / sigma * (test_value - u), -1 / xi));
    }
    let p_NTC = Math.pow(Math.exp(-(test_value - NTC_coeff[0]) / NTC_coeff[1]), m);
    p = 1 - p_NTC * p_TC;
    if (p < 0) {
      p = 1;
    }
    return p;
  }

function nonstationary_return(x, sigma, xi, u, lambda, NTC_coeff, stationary) {
    let m = sigma.length;
    let test_value;
    if (stationary == 1) {
      test_value = x; // design wind
      return calc_LEP(test_value, sigma, xi, u, lambda, NTC_coeff, m);
    } else {
      test_value = Math.ceil(Math.max(...u));
    }
    let p = 1;
    while (p > x) {
      p = calc_LEP(test_value, sigma, xi, u, lambda, NTC_coeff, m);
      test_value++;
    }
    let xd = test_value - 1;
    return xd;
}

function nonstationary_return_MRI(N, lat, long, sigma, xi, u, lambda, NTC_coeff) {
    let test_value_i = Math.ceil(Math.max(...u));
    let MRI = 0;
    while (N > MRI) {
      let T_TC = Math.pow(1 - Math.exp(-lambda[0] * Math.pow(1 + xi[0] * (test_value_i - u[0]) / sigma[0], -1 / xi[0])), -1);
      if (isNaN(T_TC)) {
        T_TC = Infinity;
      }
      let T_NTC = Math.pow(1 - Math.exp(-(test_value_i - NTC_coeff[0]) / NTC_coeff[1]), -1);
      MRI = Math.pow(1 - (1 - 1 / T_TC) * (1 - 1 / T_NTC), -1);
      if (MRI < 0) {
        MRI = 0;
      }
      test_value_i++;
    }
    let test_value_f = Math.ceil(Math.max(...u));
    MRI = 0;
    while (N > MRI) {
      let T_TC = Math.pow(1 - Math.exp(-lambda[1] * Math.pow(1 + xi[1] * (test_value_f - u[1]) / sigma[1], -1 / xi[1])), -1);
      if (isNaN(T_TC)) {
        T_TC = Infinity;
      }
      let T_NTC = Math.pow(1 - Math.exp(-(test_value_i - NTC_coeff[0]) / NTC_coeff[1]), -1);
      MRI = Math.pow(1 - (1 - 1 / T_TC) * (1 - 1 / T_NTC), -1);
      if (MRI < 0) {
        MRI = 0;
      }
      test_value_f++;
    }
    let xd = Math.max(test_value_i, test_value_f) - 1;
    return xd;
}

function calc_winds(countyData, buildYear, riskCat, lifespan, method, units) {
    // if (!which(data.county_fips === FIPS)) {
    //     throw new Error('Invalid FIPS Code or No Data at Location');
    // }
    // const countyData = data.filter((row) => row.county_fips === FIPS);

    // Set up
    const past_i = 1984 // first year of past climate
    const past_m = 2000 // middle year of past climate
    const past_f = 2015 // last year of past climate
    const future_i = 2070 // first year of future climate
    const future_f = 2100 // last year of future climate

    if (buildYear < past_m) {
        console.warn('stationary climate assumed for years before 2000');
    }
    
    const past = [countyData.scale_past, countyData.shp_past];
    const future = [countyData.scale_future, countyData.shp_future];
    const u_past = countyData.uS_past;
    const u_future = countyData.uS_future;
    const lambda_past = countyData.lambda_past;
    const lambda_future = countyData.lambda_future;


    const years_list = [10, 25, 50, 100, 300, 700, 1700, 3000, 10000, 100000, 1000000];
    if (method === 'LEP' || method === 'AEP') {
        const year = new Array(lifespan).fill().map((_, i) => buildYear + (i / lifespan));

        if (year.some(y => y > future_f)) {
            console.warn('stationary climate assumed for years after 2100');
        }

        let coeff_p = year.map(y => (future_f - y) / (future_f - past_m));
        let coeff_f = year.map(y => (y - past_m) / (future_f - past_m));

        for (let i = 0; i < lifespan; i++) {
            if (year[i] <= past_m) {
                coeff_p[i] = 1;
                coeff_f[i] = 0;
            }
            if (year[i] >= future_f) {
                coeff_p[i] = 0;
                coeff_f[i] = 1;
            }
        }

        // Linear Interpolation
        let sigma = coeff_p * past[0] + coeff_f * future[0]; // scale param
        let xi = coeff_p * past[1] + coeff_f * future[1]; // shape param
        let u = coeff_p * u_past + coeff_f * u_future; // threshold
        let lambda = coeff_p * lambda_past + coeff_f * lambda_future;
        const ASCE = [300, 700, 1700, 3000];
        const MRI = ASCE[riskCat];
        let x = 1 - Math.pow(1 - 1 / MRI, lifespan);

        let stationary = 0;
        if (testVal !== null && method == "LEP") {
            x = testVal;
            stationary = 1;
        }

        // design wind speed
        let xd_LEP = nonstationary_return(x, sigma, xi, u, lambda, [countyData.NTC_1, countyData.NTC_2], stationary);

        if (method == "AEP") {
            // check against LEP design wind
            let AEP = new Array(lifespan);
            for (let i = 0; i < lifespan; i++) {
                AEP[i] = calc_LEP(xd_LEP, sigma[i], xi[i], u[i], lambda[i], [countyData.NTC_1, countyData.NTC_2], 1); // 1 for one year
            }
            // check direction
            let x_arr = Array.from({ length: lifespan }, (_, i) => i + 1);
            let m = regression.linear(x_arr, AEP).m;
            let dir = m > 0 ? 1 : 0;

            if (dir === 1 && max(AEP) > 1/MRI) {
                const year_max = which(AEP === max(AEP));
                
                if (year_max) {
                  sigma = sigma[year_max];
                  xi = xi[year_max];
                  u = u[year_max];
                  lambda = lambda[year_max];
                  x = 1/MRI;
              
                  xd = nonstationary_return(x, sigma, xi, u, lambda,
                                             [countyData.NTC_1, countyData.NTC_2],
                                             stationary);
                }
            }
            if (method === "LEP" || !xd) {   // when AEP met, use LEP design wind
                xd = xd_LEP;
            }

            let winds = new Array(years_list.length);
            for (let i = 0; i < years_list.length; i++) {
                let x;
                if (method == "LEP" || !year_max) {
                    x = Math.pow(1 - 1 / years_list[i], lifespan);
                } else if (method == "AEP") {
                    x = 1 / years_list[i];
                }
            
                winds[i] = nonstationary_return(x, sigma, xi, u, lambda, [countyData.NTC_1, countyData.NTC_2], stationary);
            }
        }
    }
    if (method === "MRI") {
        const year = [buildYear, buildYear + lifespan - 1];
        if (Math.max(...year) > future_f) console.warning('stationary climate assumed for years after 2100');
        const coeff_p = year.map(y => (future_f - y) / (future_f - past_m));
        const coeff_f = year.map(y => (y - past_m) / (future_f - past_m));
        for (let i = 0; i < 2; i++) {
          if (year[i] <= past_m) {
            coeff_p[i] = 1;
            coeff_f[i] = 0;
          }
          if (year[i] >= future_f) {
            coeff_p[i] = 0;
            coeff_f[i] = 1;
          }
        }
        
        const sigma = coeff_p[0] * past[0] + coeff_f[0] * future[0];
        const xi = coeff_p[1] * past[1] + coeff_f[1] * future[1];
        const u = coeff_p[0] * u_past + coeff_f[0] * u_future;
        const lambda = coeff_p[0] * lambda_past + coeff_f[0] * lambda_future;
        
        const ASCE = [300, 700, 1700, 3000];
        const N = ASCE[riskCat];
        const xd = nonstationary_return_MRI(N, countyData.latP, countyData.lonP, 
                                           sigma, xi, u, lambda,
                                           [countyData.NTC_1, countyData.NTC_2]);
        
        // Additional wind return levels
        const winds = Array.from({length: years_list.length}, () => NaN);
        for (let i = 0; i < years_list.length; i++) {
          const N = years_list[i];
          winds[i] = nonstationary_return_MRI(N, countyData.latP, countyData.lonP, 
                                              sigma, xi, u, lambda,
                                              [countyData.NTC_1, countyData.NTC_2]);
        }
    }      

    const ms_to_mph = 2.23694;
    xd = units === "SI" ? xd : ms_to_mph*xd;
    xd = Math.round(xd * 100) / 100;
    units = units === "SI" ? "m/s" : "mph";
    console.log(`Design wind speed for the ${method} approach: ${xd} ${units}`);

    const res1 = [xd, countyData.latP.toFixed(2), countyData.lonP.toFixed(2), riskCat].map(String);
    const res2 = winds.map(w => w.toFixed(2));
    const res = [res1, res2];
    const rows = ["Design Wind (" + units + ")", "Lat", "Long", "Risk Category",
                "10-year MRI", "25-year MRI", "50-year MRI",
                "100-year MRI", "300-year MRI", "700-year MRI",
                "1,700-year MRI", "3,000-year MRI", "10,000-year MRI",
                "100,000-year MRI", "1,000,000-year MRI"];
    res.unshift(rows);

    if (units === "mph") {
        for (let i = 4; i < res.length; i++) {
            for (let j = 0; j < res[i].length; j++) {
                res[i][j] = (res[i][j] * ms_to_mph).toFixed(2);
            }
    }
    }

    console.table(res);
    return(xd)

}

function processForm(event) {
    event.preventDefault(); // Prevent the form from submitting
    const form = document.getElementById("form");

    // User Inputs
    const scenario = document.getElementById("scenario-select");
    const loc = document.getElementById("fips-input");
    const lifespan = document.getElementById("lifespan-input");
    const buildYear = document.getElementById("buildYear-input");
    const riskCat = document.getElementById("category-select");
    const method = document.getElementById("method-select");
    const units = document.getElementById("units-select");
    const submitBtn = document.getElementById("submit-btn");

    // Get FIPS code from location input
    var geometryService = new esri.tasks.GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");

    // Set up a new instance of the FeatureLayer to query for counties
    var countyLayer = new esri.layers.FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3");

    // Use the GeometryService to geocode the address and get its point location
    var geocodeParams = new esri.tasks.GeocodeParameters();
    geocodeParams.address = { SingleLine: loc };
    geometryService.geocode(geocodeParams, function(result) {
      var point = result[0].location;

      // Set up a query to find the county the point is located in
      var query = new esri.tasks.Query();
      query.geometry = point;
      query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

      // Execute the query against the county layer and get the county FIPS code
      countyLayer.queryFeatures(query, function(featureSet) {
        var countyFeature = featureSet.features[0];
        var fipsCode = countyFeature.attributes["STATE_FIPS"] + countyFeature.attributes["COUNTY_FIPS"];
        console.log("County FIPS code: " + fipsCode);
        var FIPS = fipsCode
      });
    });


    // Query
    featureLayer.setQuery(scenario)
    var query = new esri.tasks.Query();
    query.where = "county_fips = " + FIPS;
    
    featureLayer.queryFeatures(query, function(featureSet) {
      // Iterate through the features and do something with each one
      var features = featureSet.features;
      for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        // Do something with the feature, such as display its attributes or geometry
        console.log(feature.attributes);
        console.log(feature.geometry);
      }
    });
    
    // calc_winds(data, buildYear, riskCat, lifespan, method, units)



}


