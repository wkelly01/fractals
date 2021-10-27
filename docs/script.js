var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

const c = document.getElementById("canvas");
const ctx = c.getContext("2d"); // context variable is used to draw on a 2D plane

const createHexagon = (pos, sidelen) => {
  ctx.beginPath();
  ctx.moveTo(...pos); // go to the left vertex

  // note that (0,0) in canvas is the top left, so 'up' on the vertical component would use substraction.
  ctx.lineTo(pos[0] + sidelen / 2 , pos[1] - sidelen * Math.sqrt(3) / 2);
  ctx.lineTo(pos[0] + 3 * sidelen / 2 , pos[1] - sidelen * Math.sqrt(3) / 2);
  ctx.lineTo(pos[0] + 2 * sidelen, pos[1])
  ctx.lineTo(pos[0] + 3 * sidelen / 2 , pos[1] + sidelen * Math.sqrt(3) / 2);
  ctx.lineTo(pos[0] + sidelen / 2 , pos[1] + sidelen * Math.sqrt(3) / 2);
  ctx.lineTo(...pos); // draw line from right vertex back to left vertex
  ctx.closePath();
  ctx.fill(); // fill triangle
};



const createKellinskiHexagon = (pos, sidelen, depth) => {
  const innerHexagonSidelen = sidelen / 3; // side length of inner Hexagons is a third the side length of the outer hexagon
  const innerHexagonPositions = [
    pos,
    [pos[0] + innerHexagonSidelen , pos[1] - innerHexagonSidelen * Math.sqrt(3)],
    [pos[0] + innerHexagonSidelen * 3 , pos[1] - innerHexagonSidelen * Math.sqrt(3)],
    [pos[0] + innerHexagonSidelen * 4, pos[1]],
    [pos[0] + innerHexagonSidelen * 3, pos[1] + innerHexagonSidelen * Math.sqrt(3)],
    [pos[0] + innerHexagonSidelen , pos[1] + innerHexagonSidelen * Math.sqrt(3)],
  ];
  if(depth == 0) {
    innerHexagonPositions.forEach((hexagonPosition) => {
      createHexagon(hexagonPosition, innerHexagonSidelen);
    });
  } else {
    innerHexagonPositions.forEach((hexagonPosition) => {
      createKellinskiHexagon(hexagonPosition, innerHexagonSidelen, depth - 1);
    });
  }
}

//createKellinskiHexagon([0, 250], 250, 0);

createHexagon([0, 500] , 500)

slider.oninput = function() {
  output.innerHTML = this.value;
  ctx.clearRect(0, 0, 1000, 1000);
  if (this.value == 0) {
    createHexagon([0, 500] , 500)
  } else {
    createKellinskiHexagon([0, 500], 500, this.value-1);
  }
}