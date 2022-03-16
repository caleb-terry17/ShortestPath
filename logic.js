///////////////////
// globals
///////////////////

table = document.getElementById("table");

///////////////////
// i/o
///////////////////
// renders the table the user will see
function renderTable() {
    // checking if table is already rendered
    if (table.children[0] !== undefined) { table.innerHTML = ""; }
    let rows = parseInt(document.getElementById("rows").value);
    let cols = parseInt(document.getElementById("cols").value);
    for (let row = 0; row < rows; ++row) {
        let tr = document.createElement('tr');
        // creating each column in the row
        for (let col = 0; col < cols; ++col) {
            tr.appendChild(document.createElement('td'));
        }
        // appending row to table
        table.appendChild(tr);
    }
}

function computeSP() {}