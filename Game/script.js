circleDiv = document.querySelector(".circles")
diffButtonDiv = document.querySelector(".difficulty_buttons")
resetDiv = document.querySelector(".reset")
winDiv = document.querySelector(".win")
let gameSeed = new Array()

//----------This for loop creates the game board
for ( let i = 1 ; i <=5 ; i++ ) {
  for ( let j = 1 ; j <=5 ; j++) {
    newDiv = document.createElement("div");
    newDiv.setAttribute("id",`circle${i}${j}` );
    circleMaker(newDiv,i,j);
    //Found on-line, not sure why it works 
    // newDiv.onclick = (function(i,j) {return function() {
    //       clickMe(i,j)
    //       };
    //     }
    //   ) (i,j);
    newDiv.onclick = () => clickMe(i,j);
    circleDiv.appendChild(newDiv);
  }
}

function circleMaker(div,x,y) {
  div.style.position = "fixed";
  div.style.top = `${-100+(x*100)}px`;
  div.style.left = `${-100+(y*100)}px`;
  div.style.background = "lightgreen";
  div.style.borderRadius = "50%";
  div.style.width = "100px";
  div.style.height = "100px";
  
}

function clickMe(a,b) {
  changeColor(a  ,b  );
  changeColor(a+1,b  );
  changeColor(a-1,b  );
  changeColor(a  ,b+1);
  changeColor(a  ,b-1);
  checkForWin();
}

function changeColor(a,b) {
  id = `#circle${a}${b}`
  div = document.querySelector(id)
  if (div != null) {
    if ( div.style.background == "lightgreen") {
      div.style.background = "red";
    } else {
      div.style.background = "lightgreen";
    }
  }
}

function checkForWin() {
  let winCount = 0
  for (let i=1 ; i<=5 ; i++) {
    for (let j=1 ; j<=5 ; j++) {
      if (document.querySelector(`#circle${i}${j}`).style.background == "lightgreen") {
        winCount++
      }
    }
  }
  if (winCount == 25) {
    circleDiv.style.visibility = "hidden"
    resetDiv.style.visibility = "hidden"
    winDiv.style.visibility = "visible"
  }
}

//----------Game Set-Up Functions Begin
function newGame() {
  freshStart()
  circleDiv.style.visibility = "visible"
  diffButtonDiv.style.visibility = "visible"
  winDiv.style.visibility = "hidden"
}

function gameSelect(x) {
  freshStart()
  diffButtonDiv.style.visibility = "hidden"
  resetDiv.style.visibility = "visible"
  gameSeed = []
  for (let i = 0 ; i<x ; i++) {
    let a = Math.floor((Math.random()*5 + 1));
    let b = Math.floor((Math.random()*5 + 1));
    clickMe(a,b)
    gameSeed.push([a,b])
  }
}

// function randClickFunc() {
//   let a = Math.floor((Math.random()*5 + 1));
//   let b = Math.floor((Math.random()*5 + 1));
//   clickMe(a,b)
//   return 
// }

function freshStart() {
  for ( let i=1 ; i<=5 ; i++) {
    for (let j=1 ; j<=5 ; j++) {
      document.querySelector(`#circle${i}${j}`).style.background = "lightgreen"
    }
  }
}

function resetCurrentGame() {
  freshStart();
  for (let i=0 ; i < gameSeed.length ; i++) {
    clickMe(gameSeed[i][0],gameSeed[i][1])
  }
}
//----------Game Set-Up Functions End