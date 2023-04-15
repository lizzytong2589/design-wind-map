export function goBack(content) {
    const formDiv = document.getElementById("form-div");
    formDiv.innerHTML = "";
    formDiv.appendChild(content.cloneNode(true));
}

export function generateTable(data, content) {
    const formDiv = document.getElementById("form-div");
    formDiv.innerHTML = "";

    // Add back button
    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.value = "&#8592;";
    backButton.addEventListener("click", function() {
        goBack(content)
    });
    formDiv.appendChild(backButton);

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
    formDiv.appendChild(table);
}

