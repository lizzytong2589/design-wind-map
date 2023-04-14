export function calc_LEP(test_value, sigma, xi, u, lambda, NTC_coeff, m) {
  let prodValue = 1;
  for (let i = 0; i < m; i++) {
    const lambda_i = Array.isArray(lambda) ? lambda[i] : lambda;
    const xi_i = Array.isArray(xi) ? xi[i] : xi;
    const sigma_i = Array.isArray(sigma) ? sigma[i] : sigma;
    const u_i = Array.isArray(u) ? u[i] : u;
    prodValue *= Math.exp(-lambda_i * Math.pow(1 + (xi_i / sigma_i) * (test_value - u_i), (-1 / xi_i)));
  }
  let p_TC = isNaN(prodValue) ? 1 : prodValue;
  let p_NTC = Math.pow(Math.exp(-Math.exp(-(test_value - NTC_coeff[0]) / NTC_coeff[1])), m);
  let p = 1 - p_NTC * p_TC;
  if (p < 0) p = 1;
  return p;
}

export function nonstationary_return(x, sigma, xi, u, lambda, NTC_coeff) {
  let m = Array.isArray(sigma) ? sigma.length : 1;
  let test_value = m === 1 ? u : Math.ceil(ss.max(u));
  let p = 1;
  while (p > x) {
    p = calc_LEP(test_value, sigma, xi, u, lambda, NTC_coeff, m);
    test_value++;
  }
  let xd = test_value - 1;
  return xd;
}

export function nonstationary_return_MRI(N, sigma, xi, u, lambda, NTC_coeff) {
  console.log(u)
  let test_value_i = Math.ceil(ss.max(u));
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

export function addVectors(a, b) {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result.push(a[i] + b[i]);
  }
  
  return result;
}


export function calc_winds(countyData, buildYear, riskCat, lifespan, method, units) {                                                     
  console.log(`Calculating for ${method}`)  
  // Set up
    const past_m = 2000;   // middle year of past climate
    const future_f = 2100; // last year of future climate

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

    let xd;
    let winds;
    if (method === 'LEP' || method === 'AEP') {
      // console.log("LEP or AEP")
      const year = Array.from({length:lifespan}, (_,i) => buildYear+i);

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
      let sigma = addVectors(coeff_p.map(x => x * past[0]), coeff_f.map(x => x * future[0])); // scale param 
      let xi = addVectors(coeff_p.map(x => x * past[1]), coeff_f.map(x => x * future[1]));    // shape param
      let u = addVectors(coeff_p.map(x => x * u_past), coeff_f.map(x => x * u_future));       // threshold param
      let lambda = addVectors(coeff_p.map(x => x * lambda_past), coeff_f.map(x => x * lambda_future)); // freq

      const ASCE = [300, 700, 1700, 3000];
      const MRI = ASCE[riskCat - 1];
      let x = 1 - Math.pow(1 - 1 / MRI, lifespan);

      // design wind speeds
      let year_max;
      let xd_LEP = nonstationary_return(x, sigma, xi, u, lambda, [countyData.NTC_1, countyData.NTC_2]);
      if (method === "AEP") {
        // console.log("AEP")
        // check against LEP design wind
        let AEP = new Array(lifespan.length);
        for (let i = 0; i < lifespan; i++) {
          AEP[i] = calc_LEP(xd_LEP, sigma[i], xi[i], u[i], lambda[i], [countyData.NTC_1, countyData.NTC_2], 1); // 1 for one year
        }

        // check direction
        let x_arr = Array.from({ length: lifespan }, (_, i) => i + 1);
        let m = ss.linearRegression([x_arr, AEP]).m;
        let dir = m > 0 ? 1 : 0;
        let maxAEP = ss.max(AEP)

        if (dir === 1 && (maxAEP > 1/MRI)) {
          // console.log("Getting AEP design wind")
          const idxs = [];
          AEP.forEach((item, index) => item === maxAEP ? idxs.push(index): null);
          console.log(idxs)
          year_max = idxs.slice(-1);

          sigma = sigma[year_max];
          xi = xi[year_max];
          u = u[year_max];
          lambda = lambda[year_max];

          xd = nonstationary_return(1/MRI, sigma, xi, u, lambda,[countyData.NTC_1, countyData.NTC_2]);
        } 
      }
      console.log(xd)
      if (method === "LEP" || (typeof xd === 'undefined')) {   // when AEP met, use LEP design wind
        // console.log(`Use LEP wind in the ${method} approach`)
        xd = xd_LEP;
      }
      
      winds = new Array(years_list.length);
      for (let i = 0; i < years_list.length; i++) {
        let x;
        if (method == "LEP" || (typeof year_max === 'undefined')) {
          console.log("LEP")
          x = 1 - Math.pow(1 - (1 / years_list[i]), lifespan);
        } else if (method === "AEP") {
          console.log("AEP")
          x = 1 / years_list[i];
        }
        
        winds[i] = nonstationary_return(x, sigma, xi, u, lambda, [countyData.NTC_1, countyData.NTC_2]);
      }
      console.log(winds)
      
    }
    else if (method === "MRI") {
      console.log("MRI")
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
      
      const sigma = addVectors(coeff_p[0] * past[0], coeff_f[0] * future[0]);
      const xi = addVectors(coeff_p[1] * past[1], coeff_f[1] * future[1]);
      const u = addVectors(coeff_p[0] * u_past, coeff_f[0] * u_future);
      const lambda = addVectors(coeff_p[0], lambda_past + coeff_f[0] * lambda_future);
      
      const ASCE = [300, 700, 1700, 3000];
      const N = ASCE[riskCat - 1];
      xd = nonstationary_return_MRI(N, countyData.latP, countyData.lonP, sigma, xi, u, lambda,
                                          [countyData.NTC_1, countyData.NTC_2]);
      
      // Additional wind return levels
      winds = Array.from({length: years_list.length}, () => NaN);
      for (let i = 0; i < years_list.length; i++) {
        const N = years_list[i];
        winds[i] = nonstationary_return_MRI(N, countyData.latP, countyData.lonP, 
                                            sigma, xi, u, lambda,
                                            [countyData.NTC_1, countyData.NTC_2]);
      }
    }      

    const ms_to_mph = 2.23694;
    xd = units === "SI" ? xd : ms_to_mph*xd;
    xd = Math.round(xd * 100) / 100;    // rounds to 2 decimal places
    units = units === "SI" ? "m/s" : "mph";
    console.log(`Design wind speed for the ${method} approach: ${xd} ${units}`);

    const res = { 
      designWind: xd,
      buildYear: buildYear,
      lifespan: lifespan,
      lat: countyData.latP.toFixed(2),
      lon: countyData.lonP.toFixed(2),
      cat: riskCat,
      wind10: (units === "m/s" ? winds[0] : ms_to_mph*winds[0]).toFixed(0),
      wind25: (units === "m/s" ? winds[1] : ms_to_mph*winds[1]).toFixed(0),
      wind50: (units === "m/s" ? winds[2] : ms_to_mph*winds[2]).toFixed(0),
      wind100: (units === "m/s" ? winds[3] : ms_to_mph*winds[3]).toFixed(0),
      wind300: (units === "m/s" ? winds[4] : ms_to_mph*winds[4]).toFixed(0),
      wind700: (units === "m/s" ? winds[5] : ms_to_mph*winds[5]).toFixed(0),
      wind1700: (units === "m/s" ? winds[6] : ms_to_mph*winds[6]).toFixed(0),
      wind3000: (units === "m/s" ? winds[7] : ms_to_mph*winds[7]).toFixed(0),
      wind10000: (units === "m/s" ? winds[8] : ms_to_mph*winds[8]).toFixed(0),
      wind100000: (units === "m/s" ? winds[9] : ms_to_mph*winds[9]).toFixed(0),
      wind1000000: (units === "m/s" ? winds[10] : ms_to_mph*winds[10]).toFixed(0)
    };

    console.table(res);
    return({wind:xd, result:res})
}