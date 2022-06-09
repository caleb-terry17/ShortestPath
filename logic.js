///////////////////
// globals
///////////////////

let table = document.getElementById("table");  // table to dispaly search
let colorButtons = document.getElementById("colorButtons");  // div tag that will hold color selection buttons
let computeButton = document.getElementById("compute");  // div tag that is used to hold the button to compute sp
let distnaceDiv = document.getElementById("distance");  // div to show the distance once it's computed

// colors
let red = "#E70000";
let yellow = "#FFF827";
let green = "#00E700";
let blue = "#0000FF";
let lightBlue = "#ABCDEF";
let white = "#FFF";
let selectionColor = yellow;  // starts out as yellow (barriers)
let selectionLetter = 'y';

// number of each square
let numRed;
let numYellow;
let numGreen;

// start and end locations
let startPos;
let endPos;

/////////
// array to store the color of each button, it's parent in the search, and search cost
// will also be used to run search on table
// g: button is green (start point)
// y: button is yellow (barrier)
// r: button is red (end point)
// e: button is empty or blank
// b: button is blue (path)
/////////
// {"value": , "parent": , "depth": }
let searchTable = [];

// number of rows and columns in the table
let tableRows, tableCols;

///////////////////
// table
///////////////////

// renders the table the user will see
function renderTable() {
    // number of each square
    numRed = 0;
    numYellow = 0;
    numGreen = 0;

    // start and end locations
    startPos = {"row": null, "col": null};
    endPos = {"row": null, "col": null};

    // checking if table and color buttons are already rendered
    if (table.children[0] !== undefined) { table.innerHTML = ""; }
    if (colorButtons.children[0] !== undefined) { colorButtons.innerHTML = ""; }

    // checking if compute button or distance is already rendered
    if (computeButton.children[0] !== undefined) { computeButton.innerHTML = ""; }
    if (distnaceDiv.children[0] !== undefined) { distnaceDiv.innerHTML = ""; }

    // filling table
    tableRows = parseInt(document.getElementById("rows").value);
    tableCols = parseInt(document.getElementById("cols").value);
    for (let row = 0; row < tableRows; ++row) {
        searchTable.push([]);
        let tr = document.createElement('tr');
        // creating each column in the row
        for (let col = 0; col < tableCols; ++col) {
            searchTable[row][col] = {"value": 'e', "parent": {"row": null, "col": null}, "depth": Infinity};  // button is currently empty
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

    // creating compute button 
    let button = document.createElement('button');
    button.innerHTML = "Compute Shortest Path";
    button.onclick = function () { return computeSP() };
    computeButton.appendChild(button);
}

// changes the color of the square selected to the "selection" color
function select(row, col) {
    let button = table.children[row].children[col].children[0];  // button the user selected
    // console.log("before: " + searchTable[row][col].value + "-" + searchTable[row][col].parent + "-" + searchTable[row][col].depth);
    // 'e' tells me that the button's color is currently set to empty
    if (searchTable[row][col].value == 'e') {
        // check that there's not already a red or green button if red or green
        if (selectionColor == green) {
            if (numGreen > 0) { 
                alert("There can only be 1 green/start position");
                return;
            } else { 
                numGreen++; 
                startPos.row = row;
                startPos.col = col;
            }
        } else if (selectionColor == red) {
            if (numRed > 0) {
                alert("There can only be 1 red/end position");
                return;
            } else { 
                numRed++; 
                endPos.row = row;
                endPos.col = col;
            }
        }
        button.style.background = selectionColor;  // set button color
        // set new attributes of table
        searchTable[row][col].value = selectionLetter;
    } else {  // otherwise => change to empty
        // checking to see if start, end points are being changed
        if (searchTable[row][col].value == 'g') { 
            numGreen--; 
            startPos.row = null;
            startPos.col = null;
        }
        else if (searchTable[row][col].value == 'r') { 
            numRed--; 
            endPos.row = null;
            endPos.col = null;
        }
        button.style.background = white;
        searchTable[row][col].value = 'e';
    }
    // console.log("after: " + searchTable[row][col].value + "-" + searchTable[row][col].parent + "-" + searchTable[row][col].depth);
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
function computeSP() {
    // getting rid of compute button
    computeButton.innerHTML = "";

    // all vertices already set to null parent, inf depth
    // set source to null, 0
    searchTable[startPos.row][startPos.col].depth = 0;

    // queue
    // push row, col pair of the next node to be popped
    let queue = [];
    for (let row = 0; row < tableRows; ++row) {
        for (let col = 0; col < tableCols; ++col) {
            if (searchTable[row][col].value != 'y') {
                queue.push({"row": row, "col": col});
            }
        }
    }
    // queue.sort(function);  // sort the array by depth
    // queue.shift();  // removes and returns first element from the array
    // queue.push(elem);  // pushes a new element to the end of the array
    
    // while there's still a node in the queue to search
    while (queue.length > 0) {
        // sort to get min at beginning
        queue.sort((a, b) => {
            return searchTable[a.row][a.col].depth - searchTable[b.row][b.col].depth;
        });

        for (let i = 0; i < tableRows; ++i) {
            let line = ""
            for (let j = 0; j < tableCols; ++j) {
                line += searchTable[i][j].depth + ", ";
            }
            console.log(line)
        }
        // console.log("---------")

        // remove min element from queue
        let min = queue.shift();

        console.log("(" + min.row + ", " + min.col + ")")
        console.log("---------")

        // for all of min's neighbors
            // each node has a 3x3 grid where it's the center,
            // iterate from top left to bottom right, check to make 
            // sure it's not a barrier and it's not out of bounds
        for (let rOffset = -1; rOffset <= 1; ++rOffset) {
            for (let cOffset = -1; cOffset <= 1; ++cOffset) {
                // make sure it's within the bounds 
                if (min.row + rOffset < 0 || 
                    min.row + rOffset >= tableRows ||
                    min.col + cOffset < 0 ||
                    min.col + cOffset >= tableCols) {
                    continue;
                }

                // make sure not a barrier
                // console.log("r: " + (min.row + rOffset));
                // console.log("c: " + (min.col + cOffset));
                if (searchTable[min.row + rOffset][min.col + cOffset].value == 'y') {
                    continue;
                }

                // relax vertex
                if (searchTable[min.row + rOffset][min.col + cOffset].depth > searchTable[min.row][min.col].depth + 1) {
                    // new depth
                    searchTable[min.row + rOffset][min.col + cOffset].depth = searchTable[min.row][min.col].depth + 1;
                    // new parent
                    searchTable[min.row + rOffset][min.col + cOffset].parent = {"row": min.row, "col": min.col};
                }
            }
        }

        // color the min button as searched
        if (searchTable[min.row][min.col].value != 'g' && 
            searchTable[min.row][min.col].value != 'r') {
            table.children[min.row].children[min.col].children[0].style.background = lightBlue;
        }
    }
    
    // trace from end to start to find path and color it; also compute distance
    let distance = searchTable[endPos.row][endPos.col].depth;
    console.log("distance: " + distance);
    let currPos = searchTable[endPos.row][endPos.col].parent;

    // endPos still has distance infinity => no path from start to finish
    if (distance == Infinity) {
        alert("there is no possible path from the start to end position");
        return;
    }

    // console.log(endPos.parent);

    for (let i = 0; i < tableRows; ++i) {
        let line = i + ": ";
        for (let j = 0; j < tableCols; ++j) {
            line += "(" + searchTable[i][j].parent.row + ", " + searchTable[i][j].parent.col + ", " + searchTable[i][j].depth + ", " + searchTable[i][j].value + ") ";
            // console.log("r: " + searchTable[i][j].parent.row);
            // console.log("c: " + searchTable[i][j].parent.col);
        }
        console.log(line)
    }

    while (currPos.row != startPos.row || currPos.col != startPos.col) {
        // console.log("cr: " + currPos.row);
        // console.log("cc: " + currPos.col);
        // console.log("sr: " + startPos.row);
        // console.log("sc: " + startPos.col);
        // color current square blue as "path"
        table.children[currPos.row];
        console.log("row: " + currPos.row);
        console.log("col: " + currPos.col);
        console.log("len: " +  table.children[currPos.row]);
        table.children[currPos.row].children[currPos.col];
        table.children[currPos.row].children[currPos.col].children[0].style.background = blue;
        // goto child
        currPos = searchTable[currPos.row][currPos.col].parent;
    }

    let tag = `<h3>Length of Shortest Path: ${distance}</h3>`;
    distnaceDiv.innerHTML = tag;
}