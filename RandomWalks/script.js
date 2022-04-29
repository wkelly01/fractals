console.clear();
let canvas = document.getElementById("myCanvas");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let ctx = canvas.getContext("2d");

let fillColor, point, iterations, val1Input, val2Input, val3Input
let a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4, e1, e2, e3, e4, f1, f2, f3, f4
let minX, maxX, minY, maxY
let pointsArrayX, pointsArrayY
//// Transformation Functions ////
function T1(x,y) {
    point[0] = ((a1 * x) + (b1 * y)) + (e1 * canvasWidth);
    point[1] = ((c1 * x) + (d1 * y)) + (f1 * canvasWidth);
}
function T2(x,y) {
    point[0] = ((a2 * x) + (b2 * y)) + (e2 * canvasWidth);
    point[1] = ((c2 * x) + (d2 * y)) + (f2 * canvasWidth);
}
function T3(x,y) {
    point[0] = ((a3 * x) + (b3 * y)) + (e3 * canvasWidth);
    point[1] = ((c3 * x) + (d3 * y)) + (f3 * canvasWidth);
}
function T4(x,y) {
    point[0] = ((a4 * x) + (b4 * y)) + (e4 * canvasWidth);
    point[1] = ((c4 * x) + (d4 * y)) + (f4 * canvasWidth);
}

//// Simulate Function ////
function simulate() {
    //Reset the Canvas dimensions and starting point
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    point = [0.5 * canvasWidth, 0.5 * canvasWidth];
    //Gather inputs into variables to use in calculations
    //Is there an easier way to do this? Possilby with a loop?
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
    pointsArrayX = new Array();
    pointsArrayY = new Array();
    //Calculate each point that needs plaotting
    for (i=0 ; i<iterations ; i++) {
        let x = Math.random()
        switch (true) {
            case x < v1 / (v1 + v2 + v3 + v4):
                T1(point[0],point[1]);
                break;
            case x < (v1 + v2 ) / (v1 + v2 + v3 + v4):
                T2(point[0],point[1]);
                break;
            case x < (v1 + v2 + v3) / (v1 + v2 + v3 + v4):
                T3(point[0],point[1]);
                break;
            case x < (v1 + v2 + v3 + v4) / (v1 + v2 + v3 + v4):
                T4(point[0],point[1]);
                break;
        }
        //Assigns all the x and y values of our points to arrays
        pointsArrayX.push(point[0])
        pointsArrayY.push(point[1])
    }
    
    //Find the dimensions of the canvas based on max and min values
    maxX = pointsArrayX[0];
    maxY = pointsArrayY[0];
    minX = pointsArrayX[0];
    minY = pointsArrayY[0];
    for (j=1 ; j<pointsArrayX.length ; j++) {
        if (pointsArrayX[j] > maxX) {
            maxX = pointsArrayX[j]
        }
        if (pointsArrayY[j] > maxY) {
            maxY = pointsArrayY[j]
        }
        if (pointsArrayX[j] < minX) {
            minX = pointsArrayX[j]
        }
        if (pointsArrayY[j] < minY) {
            minY = pointsArrayY[j]
        }
    }
    canvas.height = roundUp(maxY) - roundDown(minY)
    canvas.width = roundUp(maxX) - roundDown(minX)
    //Shift all points so they all appear on the canvas
    for (i=0 ; i<pointsArrayX.length ; i++) {
        pointsArrayX[i] = transX(pointsArrayX[i])
        pointsArrayY[i] = transY(pointsArrayY[i])
    }
    //Plot the points
    plotPoints();   
}

//Drawing Functions
let toggle = 0
function axisToggle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plotPoints();
    if (toggle == 0) {
        drawAxis();
        toggle = 1 
    } else {
        toggle = 0
    }
}
function plotPoints() {
        for (i=0 ; i<iterations ; i++) {
            ctx.beginPath();
            colorPicker(i);
            ctx.arc(pointsArrayX[i], pointsArrayY[i], 0.25, 0, 2 * Math.PI);
            ctx.fillStyle = fillColor;
            ctx.strokeStyle = fillColor;
            ctx.stroke()
            ctx.closePath();
        }
    }
//Functions used the create the Axis
function drawAxis() {
    // Y Axis
    ctx.beginPath();
    ctx.moveTo(transX(0),transY(minY));
    ctx.lineTo(transX(0),transY(maxY));
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "red";
    ctx.stroke()
    ctx.closePath();
    for (i=Math.floor(roundDown(minY) / canvasWidth); i <= roundUp(maxY) / canvasWidth; i++) {
        if (i != 0 ) {
            tickMarkMakerY(0*canvasWidth,i*canvasWidth);
        }
    }
    // X Axis
    ctx.beginPath();
    ctx.moveTo(transX(minX),transY(0));
    ctx.lineTo(transX(maxX),transY(0));
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke()
    ctx.closePath();
    for (i=Math.floor(roundDown(minX) / canvasWidth); i <= roundUp(maxX) / canvasWidth; i++) {
        if (i != 0 ) {
            tickMarkMakerX(i*canvasWidth,0*canvasWidth);
        }
    }

}
function tickMarkMakerY(x,y) {
    ctx.beginPath();
    ctx.fillRect(transX(x-5),transY(y+1),10,2);
    ctx.font = "12px Comic Sans MS";
    ctx.textAlign = "left";
    ctx.fillText(y / canvasWidth, 
                 transX(x+5),
                 transY(y-4)
                );
    ctx.closePath();
}
function tickMarkMakerX(x,y) {
    ctx.beginPath();
    ctx.fillRect(transX(x-1),transY(y+5),2,10);
    ctx.font = "12px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText(x / canvasWidth, 
                 transX(x),
                 transY(y+8)
                );
    ctx.closePath();
}
//// Preset Functions ////
let fields = ["a1","b1","c1","d1","e1","f1",
              "a2","b2","c2","d2","e2","f2",
              "a3","b3","c3","d3","e3","f3",
              "a4","b4","c4","d4","e4","f4"]

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

//// Math Funcitons ////
function roundUp (n) {
    return Math.ceil( n / 100 ) * 100
}
function roundDown (n) {
    return Math.floor( n / 100 ) * 100
}
//// Other Functions ///
function colorPicker (i) {
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
}
//Transform Points. Function need to take a point and shift and reflect.
function transX (x) {
    //return x - roundDown(minX)
    return x - minX + ((canvas.width - (maxX - minX)) / 2)

}
function transY (y) {
    return (((y - minY) - ((canvas.height - (maxY-minY)) / 2)) * -1) + (maxY - minY) 
    //return ((y - roundDown(minY)) * -1) + (roundUp(maxY) - roundDown(minY))
}
