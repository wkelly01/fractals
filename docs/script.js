console.clear()
//Current List of fixes:
//1. Make the canvas window defined based on the points created.
//      Currently window is defined, hten points are plotted, need to reverse that
//      Currenlt solution would be to create the points and save them to a list, find the max values and create the window based on that
//2. Orient the pictures to be right side up

var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");

let fillColor
let point
let a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4, e1, e2, e3, e4, f1, f2, f3, f4
let iterations, val1Input, val2Input, val3Input

function T1(point) {
    point[0] = ((a1 * point[0]) + (b1 * point[1])) + (e1 * canvasWidth);
    point[1] = ((c1 * point[0]) + (d1 * point[1])) + (f1 * canvasWidth);
}
function T2(point) {
    point[0] = ((a2 * point[0]) + (b2 * point[1])) + (e2 * canvasWidth);
    point[1] = ((c2 * point[0]) + (d2 * point[1])) + (f2 * canvasWidth);
}
function T3(point) {
    point[0] = ((a3 * point[0]) + (b3 * point[1])) + (e3 * canvasWidth);
    point[1] = ((c3 * point[0]) + (d3 * point[1])) + (f3 * canvasWidth);
}
function T4(point) {
    point[0] = ((a4 * point[0]) + (b4 * point[1])) + (e4 * canvasWidth);
    point[1] = ((c4 * point[0]) + (d4 * point[1])) + (f4 * canvasWidth);
}

function simulate() {
    //Reset the Canvas dimensions and starting point
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    point = [0.5 * canvasWidth, 0.5 * canvasWidth];
    //Gather inputs into variables to use in calculations
    a1 = Number(document.getElementById("a1").value);
    b1 = Number(document.getElementById("b1").value);
    c1 = Number(document.getElementById("c1").value);
    d1 = Number(document.getElementById("d1").value);
    e1 = Number(document.getElementById("e1").value);
    f1 = Number(document.getElementById("f1").value);
    a2 = Number(document.getElementById("a2").value);
    b2 = Number(document.getElementById("b2").value);
    c2 = Number(document.getElementById("c2").value);
    d2 = Number(document.getElementById("d2").value);
    e2 = Number(document.getElementById("e2").value);
    f2 = Number(document.getElementById("f2").value);
    a3 = Number(document.getElementById("a3").value);
    b3 = Number(document.getElementById("b3").value);
    c3 = Number(document.getElementById("c3").value);
    d3 = Number(document.getElementById("d3").value);
    e3 = Number(document.getElementById("e3").value);
    f3 = Number(document.getElementById("f3").value);
    a4 = Number(document.getElementById("a4").value);
    b4 = Number(document.getElementById("b4").value);
    c4 = Number(document.getElementById("c4").value);
    d4 = Number(document.getElementById("d4").value);
    e4 = Number(document.getElementById("e4").value);
    f4 = Number(document.getElementById("f4").value);
    iterations = Number(document.getElementById("iterations").value);
    v1 = Number(document.getElementById("val1Input").value);
    v2 = Number(document.getElementById("val2Input").value);
    v3 = Number(document.getElementById("val3Input").value);
    v4 = Number(document.getElementById("val4Input").value);
    //Create an empty Array for all plottable points
    let pointsArrayX = new Array();
    let pointsArrayY = new Array();
    //Calculate each point that needs plaotting
    for (i=0 ; i<iterations ; i++) {
        let x = Math.random()
        switch (true) {
            case x < v1 / (v1 + v2 + v3 + v4):
                T1(point);
                break;
            case x < (v1 + v2 ) / (v1 + v2 + v3 + v4):
                T2(point);
                break;
            case x < (v1 + v2 + v3) / (v1 + v2 + v3 + v4):
                T3(point);
                break;
            case x < (v1 + v2 + v3 + v4) / (v1 + v2 + v3 + v4):
                T4(point);
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
    canvas.width = roundUp100(maxX) - roundDown100(minY)
    //Shift all points so they all appear on the canvas
     for (i=0 ; i<pointsArrayX.length ; i++) {
         pointsArrayX[i] -= roundDown100(minX)
         pointsArrayY[i] -= roundDown100(minY)
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

let fields = ["a1","b1","c1","d1","e1","f1","a2","b2","c2","d2","e2","f2","a3","b3","c3","d3","e3","f3","a4","b4","c4","d4","e4","f4"]


function Sierpinski() {
    seeds = ["0.5","0","0","0.5","0","0",
             "0.5","0","0","0.5","0.5","0",
             "0.5","0","0","0.5","0.25","0.5",
             "0","0","0","0","0","0",
            ]
    for (i=0 ; i<fields.length ; i++ ) {
        document.getElementById(fields[i]).value = seeds[i];
    }
    document.getElementById("iterations").value = 50000;
    document.getElementById("val1Input").value = 1;
    document.getElementById("val2Input").value = 1;
    document.getElementById("val3Input").value = 1;
    document.getElementById("val4Input").value = 0;
    simulate()
}


let xp, yp
function Fern() {
    seeds = ["0.2","-0.26","0.23","0.22","0","1.6",
             "0.85","0.04","-0.04","0.85","0","1.6",
             "-0.15","0.28","0.26","0.24","0","0.44",
             "0","0","0","0.16","0","0",
            ]
    for (i=0 ; i<fields.length ; i++ ) {
        document.getElementById(fields[i]).value = seeds[i];
    }
    document.getElementById("iterations").value = 500000;
    document.getElementById("val1Input").value = 7;
    document.getElementById("val2Input").value = 85;
    document.getElementById("val3Input").value = 7;
    document.getElementById("val4Input").value = 1;
    simulate()
}


function roundUp100 (n) {
    return Math.ceil( n / 100 ) * 100
}
function roundDown100 (n) {
    return Math.floor( n / 100 ) * 100
}