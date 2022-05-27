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
let white = "#FFF";
let selectionColor = yellow;  // starts out as yellow (barriers)
let selectionLetter = 'y';

// number of each square
let numRed = 0;
let numYellow = 0;
let numGreen = 0;

/////////
// array to store the color of each button
// will also be used to run search on table
// g: button is green (start point)
// y: button is yellow (barrier)
// r: button is red (end point)
// e: button is empty or blank
// b: button is blue (path)
/////////
let buttonColors = [];

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
        buttonColors.push([]);
        let tr = document.createElement('tr');
        // creating each column in the row
        for (let col = 0; col < cols; ++col) {
            buttonColors[row][col] = 'e';  // button is currently empty
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
    let greenButton = `<button style="background-color: ${green}" onclick="setSelection('${green}')" name="e">Start</button>`;
    let yellowButton = `<button style="background-color: ${yellow}" onclick="setSelection('${yellow}')" name="e">Barrier</button>`;
    let redButton = `<button style="background-color: ${red}" onclick="setSelection('${red}')" name="e">End</button>`;
    colorButtons.innerHTML = greenButton + "&nbsp;" + yellowButton + "&nbsp;" + redButton;
}

// changes the color of the square selected to the "selection" color
function select(row, col) {
    let button = table.children[row].children[col].children[0];  // button the user selected
    console.log(buttonColors[row][col]);
    // 'e' tells me that the button's color is currently set to empty
    if (buttonColors[row][col] == 'e') {
        // check that there's not already a red or green button if red or green
        if (selectionColor == green) {
            if (numGreen > 0) { 
                alert("There can only be 1 green/start position");
                return;
            } else { numGreen++; }
        } else if (selectionColor == red) {
            if (numRed > 0) {
                alert("There can only be 1 red/end position");
                return;
            } else { numRed++; }
        }
        button.style.background = selectionColor;  // set button color
        buttonColors[row][col] = selectionLetter;
    } else {  // otherwise => change to empty
        // checking to see if start, end points are being changed
        if (buttonColors[row][col] == 'g') { numGreen--; }
        else if (buttonColors[row][col] == 'r') { numRed--; }
        button.style.background = white;
        buttonColors[row][col] = 'e';
    }
}

// changes the selection color
function setSelection(color) {
    selectionColor = color;
    if (color == green) { selectionLetter = 'g'; }
    else if (color == yellow) { selectionLetter = 'y'; }
    else { selectionLetter = 'r'; }
}

///////////////////
// shortest path algorithms
///////////////////
// dijkstra's 
// each index in the graph needs to hold
    // 1) its color
    // 2) parent
    // 3) current distance from source
/* steps:
 * 1) find position of start, end blocks
 * 2) set all vertices parent to NULL and distance to INF, source to 0
 * 3) start at start block
 * 4) relax each edge
 * 5) 
 */

function computeSP() {}