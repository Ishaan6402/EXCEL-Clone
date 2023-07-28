let rows = 100;
let columns = 26;

let addColumnContainer = document.querySelector(".address-column-container");
let addRowContainer = document.querySelector(".address-row-container");
let cellContainer = document.querySelector(".cells-container");
let addressBar = document.querySelector(".address-bar");

for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addColumnContainer.appendChild(addressCol);
}

for (let i = 0; i < columns; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addRowContainer.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-container");
    for (let j = 0; j < columns; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");

        //attributes for cell and storage identification
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("spellcheck","false");

        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i, j);
    }
    cellContainer.appendChild(rowCont);  

}

function addListenerForAddressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowNo = i + 1;
        let colNo = String.fromCharCode(65 + j);        
        addressBar.value = `${colNo}${rowNo}`;
    })
}



