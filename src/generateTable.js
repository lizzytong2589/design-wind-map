export function goBack() {
    const formDiv = document.getElementById("form-div");
    formDiv.classList.remove("hidden");
    
    const tableDiv = document.getElementById("table-div");
    tableDiv.classList.add("hidden");
}

export function generateTable(data) {
    // Hide Form
    const formDiv = document.getElementById("form-div");
    formDiv.classList.add("hidden");

    // Unhide Table
    const tableDiv = document.getElementById("table-div");
    tableDiv.classList.remove("hidden");
    tableDiv.innerHTML = "";

    // Add back button
    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.value = "&#8592;";
    backButton.addEventListener("click", function() { goBack(); });
    tableDiv.appendChild(backButton);

    // Create table and add data to rows
    let table = document.createElement("table");
    for (const key in data) {   
        let row = table.insertRow(-1);

        // left cell
        let cell = row.insertCell(-1);
        const strong = document.createElement("strong");
        cell.appendChild(strong.appendChild( document.createTextNode(key)) );

        // right cell
        cell = row.insertCell(-1);
        cell.innerHTML = data[key];
    }

    // add table to panel div 
    tableDiv.appendChild(table);
}

