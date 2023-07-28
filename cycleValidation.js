//Storage -> 2D matrix
let collectedGraphComponent=[];
let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//     let row = [];
//     for (let j = 0; j < columns; j++) {
//         //More than 1 child relation(dependancy)
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

//true -> cycle , False -> NOt Cyclic
function isGraphCyclic(graphComponentMatrix) {
    //dependencies -> visited , dfsVisited ( 2D array )
    let visited = []; //Node Visit Trace
    let dfsVisited = []; //Stack Visit Trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < columns; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (visited[i][j] === false) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                //found cycle immediately , no need to explore more path
                if (response === true) return [i,j];
            }
        }
    }
    return null;
}

//Start -> vis(True) dfsvis(True)
// End -> dfsvis(false)
// if vis[i][j] -> already explored path , so go back no us eto explore again
//Cycle Detection Condition -> if(vis[i][j] ==true && dfxvis[i][j]==true)-> cycle it is
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    //A! -> [[0,1],[1,0],[5,10]......]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            //found cycle immediately , no need to explore more path
            if (response === true) return true;
        } else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            //found cycle immediately , no need to explore more path
            return true;
        }
    }
    dfsVisited[srcr][srcc] = false;
    return false;
}