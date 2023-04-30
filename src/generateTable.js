export function goBack() {
    const locDiv = document.getElementById("location-div");
    locDiv.classList.remove("hidden");
    
    const tableDiv = document.getElementById("table-div");
    tableDiv.classList.add("hidden");
}

export function generateTable(data) {
    // Hide Form
    const locDiv = document.getElementById("location-div");
    locDiv.classList.add("hidden");

    const formDiv = document.getElementById("form-div");
    formDiv.classList.add("hidden");

    // Button set up
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", function() { goBack(); });

    // Fill table with values
    const table = document.getElementById("resTable");
    table.rows[1].cells[0].textContent = Object.keys(data)[1];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowName = row.cells[0].textContent.trim();
        row.cells[1].textContent = data[rowName];
    }
      
    document.getElementById("table-div").classList.remove("hidden");

}

