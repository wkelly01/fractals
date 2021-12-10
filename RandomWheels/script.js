let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//set canvas height based on window size
canvas.height=window.innerHeight;
canvas.width=window.innerHeight;

//declaration of global variabls
let pointsArrayX, pointsArrayY //arrays to hold points
let fillColor //??
let point //starting point
let iterations = 1000000 //Number of iterations of the random walks

setInterval (simulate , 1000)
//simulate()

function T1(x,y) {
    point[0] = ((Math.cos(Math.PI / 3) * x) + (Math.sin(Math.PI / 3) * y));
    point[1] = ((-Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y));
}
function T2(x,y) {
    point[0] = ((Math.cos(Math.PI / 3) * x) + (Math.sin(Math.PI / 3) * y)) + (1/2);
    point[1] = ((-Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y)) + (1/2);
}
function T3(x,y) {
    point[0] = ((Math.cos(Math.PI / 3) * x) + (Math.sin(Math.PI / 3) * y)) - (1/2);
    point[1] = ((-Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y)) - (1/2);
}

function simulate() {
    //Reset the Canvas dimensions and starting point
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    point = [0.2,0.4]
    //Create an empty Array for all plottable points
    pointsArrayX = new Array();
    pointsArrayY = new Array();
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
        pointsArrayX[i] = point[0]
        pointsArrayY[i] = point[1]
    }
    //Fitting the points onto Canvas
    let distances = new Array()
    for (i=0 ; i<iterations ; i++) {
        distances[i] = distanceFormula(pointsArrayX[i],pointsArrayY[i])
    }
    let max = distances.reduce(function(a, b) {
        return Math.max(a, b);
    }, 0);
    for (i=0 ; i<iterations ; i++) {
        pointsArrayX[i] *= (0.5 * canvas.width) / max;
        pointsArrayX[i] += (0.5 * canvas.width);
        pointsArrayY[i] *= (0.5 * canvas.height) / max;
        pointsArrayY[i] *= -1
        pointsArrayY[i] += (0.5 * canvas.height);
        
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

function distanceFormula(x,y) {
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
}

