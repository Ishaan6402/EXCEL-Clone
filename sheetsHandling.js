let activeSheetColor="#ced6e0";
let sheetsFolderContainer = document.querySelector(".sheets-folder-container");
let addSheetBtn = document.querySelector(".sheet-add-icon");
addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
    `;

    sheetsFolderContainer.appendChild(sheet);
    sheet.scrollIntoView();
    //DB
    createSheetDb();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
});

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button!==2) return;
        
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length ===1){
            alert("You Need To Have At Least 1 Sheet !!! ");
            return;
        }

        let response =confirm("Your Sheet Will Get Deleted Permanently ! Are You Sure ?? ");
        if(response===false) return;

        let sheetIdx = Number(sheet.getAttribute("id"));

        // DB removal
        collectedSheetDB.splice(sheetIdx,1);
        collectedGraphComponent.splice(sheetIdx,1);

        //UI
        handleSheetUIRemoval(sheet);

        //by default DB sheet 1 to active
        sheetDB=collectedSheetDB[0];
        graphComponentMatrix=collectedGraphComponent[0];
        handleSheetProperties();


    });
}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent=allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText=`sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor="transparent";
    }
    allSheetFolders[0].style.backgroundColor=activeSheetColor;
} 

function handleSheetDB(sheetIdx) {
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    //by default click on first cell
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor=activeSheetColor;
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    });
}

function createSheetDb() {
    let sheetDB = [];
    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < columns; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: "20",
                fontColor: "#000000",
                BGcolor: "#000000",
                value: "",
                formula: "",
                children: [], //for indication purpose
            }
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
    let graphComponentMatrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            //More than 1 child relation(dependancy)
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}