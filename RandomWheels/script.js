let canvas = document.getElementById("myCanvas");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let ctx = canvas.getContext("2d");

let fillColor
let point
let iterations, val1Input, val2Input, val3Input

function T1(x,y) {
    point[0] = ((Math.cos(Math.PI / 3) * x) + (Math.sin(Math.PI / 3) * y));
    point[1] = ((-Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y));
}
function T2(x,y) {
    point[0] = ((Math.cos(Math.PI / 3) * x) + (Math.sin(Math.PI / 3) * y)) + (1/2 * canvasWidth);
    point[1] = ((-Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y)) + (1/2 * canvasWidth);
}
function T3(x,y) {
    point[0] = ((Math.cos(Math.PI / 3) * x) + (Math.sin(Math.PI / 3) * y)) - (1/2 * canvasWidth);
    point[1] = ((-Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y)) - (1/2 * canvasWidth);
}

function simulate() {
    //Reset the Canvas dimensions and starting point
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    point = [0.2 * canvasWidth, 0.4 * canvasWidth];
    //Gather inputs into variables to use in calculations
    iterations = Number(document.getElementById("iterations").value);
    //Create an empty Array for all plottable points
    let pointsArrayX = new Array();
    let pointsArrayY = new Array();
    //Calculate each point that needs plaotting
    for (i=0 ; i<iterations ; i++) {
        let x = Math.random()
        switch (true) {
            case x < 1/3:
                T1(point[0],point[1]);
                break;
            case x < 2/3:
                T2(point[0],point[1]);
                break;
            case x < 1:
                T3(point[0],point[1]);
                break;
        }
        //Assigns all the x and y values of our points to arrays
        pointsArrayX.push(point[0])
        pointsArrayY.push(point[1])
    }
    
    //Find the dimensions of the canvas based on max and min values
    let maxX = pointsArrayX[0];
    let maxY = pointsArrayY[0];
    let minX = pointsArrayX[0];
    let minY = pointsArrayY[0];
    for (j=1 ; j<pointsArrayX.length ; j++) {
        if (pointsArrayX[j] > maxX) {
            maxX = pointsArrayX[j]
        }
    }
    for (j=1 ; j<pointsArrayY.length ; j++) {
        if (pointsArrayY[j] > maxY) {
            maxY = pointsArrayY[j]
        }
    }
    for (j=1 ; j<pointsArrayX.length ; j++) {
        if (pointsArrayX[j] < minX) {
            minX = pointsArrayX[j]
        }
    }
    for (j=1 ; j<pointsArrayY.length ; j++) {
        if (pointsArrayY[j] < minY) {
            minY = pointsArrayY[j]
        }
    }
    canvas.height = roundUp100(maxY) - roundDown100(minY)
    canvas.width = roundUp100(maxX) - roundDown100(minX)
    //Shift all points so they all appear on the canvas
    for (i=0 ; i<pointsArrayX.length ; i++) {
        pointsArrayX[i] -= roundDown100(minX)
        pointsArrayY[i] -= roundDown100(minY)
     }
    //Reflect the image up right
    for (i=0 ; i<pointsArrayY.length ; i++) {
        pointsArrayY[i] = (pointsArrayY[i] * -1) + (roundUp100(maxY) - roundDown100(minY))
    }
    //Plot the points
    for (i=0 ; i<iterations ; i++) {
        ctx.beginPath();
        switch (true) {
            case i <= iterations / 3:
                fillColor = "blue";
                break;
            case i <= 2 * iterations / 3:
                fillColor = "red";
                break;
            case i <= 3 *iterations / 3:
                fillColor = "green";
                break;
        }
        ctx.arc(pointsArrayX[i], pointsArrayY[i], 0.05, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    }
}


function roundUp100 (n) {
    return Math.ceil( n / 5 ) * 5
}
function roundDown100 (n) {
    return Math.floor( n / 5 ) * 5
}