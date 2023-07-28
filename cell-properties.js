//storage 
let collectedSheetDB=[]; // contains all sheetDB
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}

// for (let i = 0; i < rows; i++) {
//     let sheetRow = [];
//     for (let j = 0; j < columns; j++) {
//         let cellProp = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "20",
//             fontColor: "#000000",
//             BGcolor: "#000000",
//             value: "",
//             formula: "",
//             children: [], //for indication purpose
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

//selectors for the cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-property");
let fontFamily = document.querySelector(".font-family-property");
let fontColor = document.querySelector(".font-color-property");
let BGcolor = document.querySelector(".bgcolor-property");
let alignment = document.querySelectorAll(".alignment");
let leftalign = alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];

let activecolorprop = "#d1d8e0";
let inactivecolorprop = "#f8e4b7";


//application of 2-way-binding (data change and UI change)
// attach property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change
    bold.style.backgroundColor = cellProp.bold ? activecolorprop : inactivecolorprop;

});

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change
    italic.style.backgroundColor = cellProp.italic ? activecolorprop : inactivecolorprop;

});

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change
    underline.style.backgroundColor = cellProp.underline ? activecolorprop : inactivecolorprop;

});

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value; //data change
    cell.style.fontSize = cellProp.fontSize + "px"; //UI change
    fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontFamily = fontFamily.value; //data change
    cell.style.fontFamily = cellProp.fontFamily; //UI change
    fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value; //data change
    cell.style.color = cellProp.fontColor; //UI change
    fontColor.value = cellProp.fontColor;
});

BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.BGcolor = BGcolor.value; //data change
    cell.style.backgroundColor = cellProp.BGcolor; //UI change
    BGcolor.value = cellProp.BGcolor;
});

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; //data change
        cell.style.justifyContent = cellProp.alignment; //UI change

        switch (alignValue) {
            case "left":
                leftalign.style.backgroundColor = activecolorprop;
                centeralign.style.backgroundColor = inactivecolorprop;
                rightalign.style.backgroundColor = inactivecolorprop;
                break;
            case "center":
                leftalign.style.backgroundColor = inactivecolorprop;
                centeralign.style.backgroundColor = activecolorprop;
                rightalign.style.backgroundColor = inactivecolorprop;
                break;
            case "right":
                leftalign.style.backgroundColor = inactivecolorprop;
                centeralign.style.backgroundColor = inactivecolorprop;
                rightalign.style.backgroundColor = activecolorprop;
                break;
        }
    });
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    //work
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        //apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.justifyContent = cellProp.alignment;


        //apply properties to UI
        bold.style.backgroundColor = cellProp.bold ? activecolorprop : inactivecolorprop;
        italic.style.backgroundColor = cellProp.italic ? activecolorprop : inactivecolorprop;
        underline.style.backgroundColor = cellProp.underline ? activecolorprop : inactivecolorprop;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        switch (cellProp.alignment) {
            case "left":
                leftalign.style.backgroundColor = activecolorprop;
                centeralign.style.backgroundColor = inactivecolorprop;
                rightalign.style.backgroundColor = inactivecolorprop;
                break;
            case "center":
                leftalign.style.backgroundColor = inactivecolorprop;
                centeralign.style.backgroundColor = activecolorprop;
                rightalign.style.backgroundColor = inactivecolorprop;
                break;
            case "right":
                leftalign.style.backgroundColor = inactivecolorprop;
                centeralign.style.backgroundColor = inactivecolorprop;
                rightalign.style.backgroundColor = activecolorprop;
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}

function getCellAndCellProp(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    //access cell and storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return ([cell, cellProp]);
}

function decodeRIDCIDFromAddress(address) {
    //address -> "A1"
    let rid = Number(address.slice(1)) - 1; //1 -> 0
    let cid = Number(address.charCodeAt(0)) - 65; //A -> 65
    return ([rid, cid]);
}