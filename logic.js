///////////////////
// globals
///////////////////

let table = document.getElementById("table");  // table to dispaly search
let actionColor = "#E70000";  // starts out as red

///////////////////
// table
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
            // creating tags for row, col index of table
            let button = document.createElement('button');
            let td = document.createElement('td');
            // adding click event to button
            button.onclick = function () { return select(row, col) };
            // adding tags to table  
            td.appendChild(button);
            tr.appendChild(td);
        }
        // appending row to table
        table.appendChild(tr);
    }
}

// changes the color of the square selected to the "action" color
function select(row, col) {
    let button = table.children[row].children[col].children[0];  // button the user selected
    // "&nbsp;" tells me that the button's color is currently set to the "action" color
    if (button.innerHTML == "&nbsp;") {  // button is already action color, revert to white
        button.style.background = "#FFF";
        button.innerHTML = "";
    } else {  // otherwise => change to action color
        button.style.background = actionColor;
        button.innerHTML = "&nbsp;";
    }
}

///////////////////
// shortest path
///////////////////

function computeSP() {}