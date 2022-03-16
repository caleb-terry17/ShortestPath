///////////////////
// globals
///////////////////

let table = document.getElementById("table");  // table to dispaly search

// colors
let red = "#E70000";
let yellow = "#FFF827";
let green = "#00E700";
let selectionColor = yellow;  // starts out as red

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

    // adding informative text on next steps
    document.getElementById("tableText").innerHTML = "Select barriers and the starting and ending points for search by clicking on the squares. <br> Barriers will be highlighted in yellow, starting point in green, and ending point in red. <br>"

    // adding color selection buttons
    // green
    let button = document.createElement('button');
    button.style.background = green;
    button.innerHTML = "Start";
    button.onclick = function () { selectionColor = green; }
    document.getElementById("colorButtons").appendChild(button);
    // yellow
    button = document.createElement('button');
    button.style.background = yellow;
    button.innerHTML = "Barriers";
    button.onclick = function () { selectionColor = yellow; }
    document.getElementById("colorButtons").appendChild(button);
    // red
    button = document.createElement('button');
    button.style.background = red;
    button.innerHTML = "End";
    button.onclick = function () { selectionColor = red; }
    document.getElementById("colorButtons").appendChild(button);
}

// changes the color of the square selected to the "selection" color
function select(row, col) {
    let button = table.children[row].children[col].children[0];  // button the user selected
    // "&nbsp;" tells me that the button's color is currently set to the "selection" color
    if (button.innerHTML == "&nbsp;") {  // button is already selection color, revert to white
        button.style.background = "#FFF";
        button.innerHTML = "";
    } else {  // otherwise => change to selection color
        button.style.background = selectionColor;
        button.innerHTML = "&nbsp;";
    }
}

///////////////////
// shortest path
///////////////////

function computeSP() {}