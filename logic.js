///////////////////
// globals
///////////////////

let table = document.getElementById("table");  // table to dispaly search
let colorButtons = document.getElementById("colorButtons");  // div tag that will hold color selection buttons

// colors
let red = "#E70000";
let yellow = "#FFF827";
let green = "#00E700";
let blue = "#0000FF";
let selectionColor = yellow;  // starts out as red

// number of each square
let numRed = 0;
let numYellow = 0;
let numGreen = 0;

///////////////////
// table
///////////////////
// renders the table the user will see
function renderTable() {
    // checking if table and color buttons are already rendered
    if (table.children[0] !== undefined) { table.innerHTML = ""; }
    if (colorButtons.children[0] !== undefined) { colorButtons.innerHTML = ""; }

    // filling table
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

    colorButtons.innerHTML = '<button onclick="clickMe(0);">clickMe</button> &nbsp; <button onclick="clickMe(1);">clickMe</button>';

    // adding color selection buttons
    // green
    let greenButton = `<button style="background-color: #00E700" onclick="setSelection('#00E700')">Start</button>`;
    // button.style.background = green;
    // button.innerHTML = "Start";
    // button.onclick = function () { selectionColor = green; }
    // colorButtons.appendChild(button);
    // yellow
    let yellowButton = `<button style="background-color: #FFF827" onclick="setSelection('#FFF827')">Barrier</button>`;
    // button = document.createElement('button');
    // button.style.background = yellow;
    // button.innerHTML = "Barriers";
    // button.onclick = function () { selectionColor = yellow; }
    // colorButtons.appendChild(button);
    // red
    let redButton = `<button style="background-color: #E70000" onclick="setSelection('#E70000')">End</button>`;
    // button = document.createElement('button');
    // button.style.background = red;
    // button.innerHTML = "End";
    // button.onclick = function () { selectionColor = red; }
    // colorButtons.appendChild(button);

    colorButtons.innerHTML = greenButton + "&nbsp;" + yellowButton + "&nbsp;" + redButton;
}

// changes the color of the square selected to the "selection" color
function select(row, col) {
    let button = table.children[row].children[col].children[0];  // button the user selected
    // "&nbsp;" tells me that the button's color is currently set to the "selection" color
    if (button.innerHTML == "&nbsp;") {  // button is already selection color, revert to white
        button.style.background = "#FFF";
        button.innerHTML = "";
    } else {  // otherwise => change to selection color
        // checking number of red and green squares before making change
        if (selectionColor == green) {  // green
            if (numGreen > 0) { 
                console.log("throw error");

                return;
            } else { numGreen++; }
        } else if (selectionColor == red) {  // red
            if (numRed > 0) { 
                console.log("throw error"); 
                
                return;
            } else { numRed++; }
        }
        // setting square color
        button.style.background = selectionColor;
        button.innerHTML = "&nbsp;";
    }
}

// changes the selection color
function setSelection(color) {
    selectionColor = color;
}

///////////////////
// shortest path
///////////////////

function computeSP() {}