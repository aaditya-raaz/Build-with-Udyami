const board=document.getElementById("board");
let puzzle=[
    [4,9,0,0,0,2,0,1,7],
    [0,2,0,5,4,0,6,0,0],
    [1,0,5,0,0,0,0,0,0],
    [2,7,0,4,6,5,0,0,0],
    [0,0,1,0,0,7,2,5,3],
    [0,0,8,0,0,0,0,0,4],
    [8,3,0,7,5,0,0,0,1],
    [0,0,0,0,1,0,0,0,5],
    [0,0,9,0,0,4,0,0,0],
];
let playerGrid=[];
        for(let row=0; row<9; row++){
            playerGrid.push([...puzzle[row]]);
        }

for(let row=0; row<9; row++){
    for(let col=0; col<9; col++){
        const cell=document.createElement("input");
        cell.classList.add("cell");
        cell.maxLength=1;
        cell.dataset.row=row;
        cell.dataset.col=col;
        cell.addEventListener("input", function(e) {
         let row=e.target.dataset.row;
         let col=e.target.dataset.col;
         let value=parseInt(e.target.value);
         if(isNaN(value)){
            value=0;
         }
         playerGrid[row][col]=value;
         if(value!==0 && !isValid(playerGrid,parseInt(row),parseInt(col),value)){
            e.target.classList.add("invalid");
         } else {
            e.target.classList.remove("invalid");
         }
        });

       let value=puzzle[row][col];
        if(value!==0){
            cell.value=value;
            cell.disabled=true;
            cell.classList.add("given");
        }
        let playerGrid=[];
        for(let row=0; row<9; row++){
            playerGrid.push([...puzzle[row]]);
        }


        board.appendChild(cell);
    }
}
function isValid(grid, row, col, value){
    if(value===0) return true;

    for(let c=0; c<9; c++){
        if(c!==col && grid[row][c]===value){
            return false;
        }
    }
    for(let r=0; r<9; r++){
        if(r!==row && grid[r][col]===value){
            return false;
        }
    }
    let boxRowStart=Math.floor(row/3)*3;
    let boxColStart=Math.floor(col/3)*3;
    for(let r=boxRowStart; r<boxRowStart + 3; r++){
        for(let c=boxColStart; c<boxColStart+3; c++){
            if((r!==row || c!==col) &&  grid[r][c] === value){
                return false;
            }
        }
    }
    return true;
}

const reset= document.getElementById("reset");
reset.addEventListener("click", function() {
    for(let row=0; row<9; row++){
        playerGrid[row]=[...puzzle[row]];
    }

    const allcells=document.querySelectorAll(".cell");
    allcells.forEach(function (cell) {
        let r=parseInt(cell.dataset.row);
        let c=parseInt(cell.dataset.col);
        let value=puzzle[r][c];
        if(value!==0){
            cell.value=value;
        } else{
            cell.value="";
        }
        cell.classList.remove("invalid");
    });
});

 const checkSolution=document.getElementById("checkSolution");
 checkSolution.addEventListener("click", function() {
    let complite=true;
    let valid=true;

    for(let row=0; row<9; row++){
        for(let col=0; col<9; col++){
            let value=playerGrid[row][col];

            if(value===0){
                complete = false;
            } else if(!isValid(playerGrid,row,col,value)){
                valid=false;
            }
        }
    }

    if(complete && valid){
        alert("BINGOOO !👍🎉🎊");
    } else if (!complete){
        alert("YE KYAA TERA BAAP BHAAREGA !CHAAL JALDI KRR");
    } else {
        alert("KUCH GALT HAIN BHAAI ! JARA DEKH KE ");
    }
 });


 function generateSolvedGrid() {
    let grid=[];
    for(let i=0; i<9; i++) grid.push([0,0,0,0,0,0,0,0,0]);

    function fill(pos) {
        if (pos===81) return true;

        let row=Math.floor(pos/9);
        let col=pos%9;

        let numbers=[1,2,3,4,5,6,7,8,9];
        numbers.sort(()=>Math.random()-0.5);

        for(let num of numbers){
            if(isValid(grid,row,col,num)){
                grid[row][col]=num;
                if(fill(pos+1)) return true;
                grid[row][col]=0;
            }
        }
        return false;
    }
    fill(0);
    return grid;
 }

 function generatePuzzle(){
    let solved=generateSolvedGrid();
    let newPuzzle=solved.map(row=>[...row]);

    let cellsToRemove=45;
    while(cellsToRemove>0){
        let row=Math.floor(Math.random()*9);
        let col=Math.floor(Math.random()*9);
        if (newPuzzle[row][col] !==0){
            newPuzzle[row][col]=0;
            cellsToRemove--;
        }
    }
    return newPuzzle;
 }

 const newGame=document.getElementById("newGame");
 newGame.addEventListener("click", function() {
    puzzle=generatePuzzle();
    playerGrid=puzzle.map(row => [...row]);
    document.querySelectorAll(".cell").forEach(function(cell) {
        let r=parseInt(cell,dataset.row);
        let c=parseInt(cell.datasetcol);
        let value=puzzle[r][c];

        cell.classList.remove("invalid");
        if(vlaue!==0){
            cell.value=value;
            cell.disabled=true;
            cell.classList.add("given");
        } else {
            cell.value="";
            cell.disabled=true;
            cell.classList.remove("given");
        }
    });
 });