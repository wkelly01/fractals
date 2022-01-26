//Creating canvas for graph... eventually go and change ctx variable to ctxGraph
let canvasGraph = document.getElementById("GraphCanvas");
let ctx = canvasGraph.getContext("2d");
//set canvas height based on window size
canvasGraph.height= window.innerHeight * 0.68;
canvasGraph.width = window.innerHeight * 0.68;

//declaration of global variabls
let pointsArrayX, pointsArrayY, distances //arrays to hold points and distances
let fillColor //?? why do you exist
let point //starting point
let iterations = 50000 //Number of iterations of the random walks

setInterval (simulate , 3000)
//simulate()


//Transformation functions
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

//ismulate functionb... this needs cleaning later
function simulate() {
    //Reset the Canvas dimensions and starting point
    ctx.clearRect(0, 0, canvasGraph.width, canvasGraph.height);
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
    distances = new Array()
    for (i=0 ; i<iterations ; i++) {
        distances[i] = distanceFormula(pointsArrayX[i],pointsArrayY[i])
    }
    let max = distances.reduce(function(a, b) {
        return Math.max(a, b);
    }, 0);
    for (i=0 ; i<iterations ; i++) {
        pointsArrayX[i] *= (0.5 * canvasGraph.width) / max;
        pointsArrayX[i] += (0.5 * canvasGraph.width);
        pointsArrayY[i] *= (0.5 * canvasGraph.height) / max;
        pointsArrayY[i] *= -1
        pointsArrayY[i] += (0.5 * canvasGraph.height);
        
    }
    //Plot the points
    for (i=0 ; i<iterations ; i++) {
        ctx.beginPath();
        switch (true) {
            case i <= iterations / 3:
                fillColor = "#73999a";
                break;
            case i <= 2 * iterations / 3:
                fillColor = "#abf0ff";
                break;
            case i <= 3 *iterations / 3:
                fillColor = "#c6fbff";
                break;
        }
        ctx.arc(pointsArrayX[i], pointsArrayY[i], 0.05 * (canvasGraph.height / max), 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = fillColor;
        ctx.stroke();
    }
    drawGraph( distances );
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

////////////////////////////////////////////////////////////

function drawGraph( dataArr ){  
    //Creating canvas for chart... eventuall go and change context to ctxChart
    var canvasChart = document.getElementById( "ChartCanvas" );  
    var context = canvasChart.getContext( "2d" );
    canvasChart.width = window.innerWidth * 0.95
    canvasChart.height = window.innerHeight * 0.28
    // declare graph start and end  
    var GRAPH_TOP = 25/450 * canvasChart.height;  
    var GRAPH_BOTTOM = 375/450 * canvasChart.height;  
    var GRAPH_LEFT = 25/550 * canvasChart.width;  
    var GRAPH_RIGHT = 475/550 * canvasChart.width;   

    var GRAPH_HEIGHT = 350/450 * canvasChart.height;   
    var GRAPH_WIDTH = 450/550 * canvasChart.width; 
  
    var arrayLen = dataArr.length;  
  
    var largest = 0;  
    for( var i = 0; i < arrayLen; i++ ){  
        if( dataArr[ i ] > largest ){  
            largest = dataArr[ i ];  
        }  
    }  
  
    context.clearRect( 0, 0, canvasChart.width, canvasChart.height ); 
    context.fillStyle = "white";
    context.fillRect(0,0,canvasChart.width,canvasChart.height)
    // set font for fillText()  
    context.fillStyle = "black";
    context.font = "16px Arial";  
       
    // draw X and Y axis  
    context.beginPath();  
    context.moveTo( GRAPH_LEFT, GRAPH_BOTTOM );  
    context.lineTo( GRAPH_RIGHT, GRAPH_BOTTOM );  
    context.lineTo( GRAPH_RIGHT, GRAPH_TOP );  
    context.stroke();  
       
    // draw reference line  
    context.beginPath();  
    context.strokeStyle = "#BBB";  
    context.moveTo( GRAPH_LEFT, GRAPH_TOP );  
    context.lineTo( GRAPH_RIGHT, GRAPH_TOP );  
    // draw reference value for hours  
    context.fillText( largest, GRAPH_RIGHT + 15/550*canvasChart.width, GRAPH_TOP);  
    context.stroke();  
   
    // draw reference line  
    context.beginPath();  
    context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
    context.lineTo( GRAPH_RIGHT, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
    // draw reference value for hours  
    context.fillText( largest / 4, GRAPH_RIGHT + 15/550*canvasChart.width, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP);  
    context.stroke();  
   
    // draw reference line  
    context.beginPath();  
    context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
    context.lineTo( GRAPH_RIGHT, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
    // draw reference value for hours  
    context.fillText( largest / 2, GRAPH_RIGHT + 15/550*canvasChart.width, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP);  
    context.stroke();  
   
    // draw reference line  
    context.beginPath();  
    context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
    context.lineTo( GRAPH_RIGHT, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
    // draw reference value for hours  
    context.fillText( largest / 4 * 3, GRAPH_RIGHT + 15/550*canvasChart.width, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP);  
    context.stroke();  
  
    // draw titles  
    context.fillText( "Iterations", GRAPH_RIGHT / 3, GRAPH_BOTTOM + 50/450 * canvasChart.height);  
    context.fillText( "Distance from 0", GRAPH_RIGHT + 30/550 * canvasChart.width, GRAPH_HEIGHT / 2);  
  
    context.beginPath();  
    context.lineJoin = "round";  
    context.strokeStyle = "black";  
  
    context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT - dataArr[ 0 ] / largest * GRAPH_HEIGHT ) + GRAPH_TOP );  
    // draw reference value for day of the week  
    context.fillText( "1", 15/550*canvasChart.width, GRAPH_BOTTOM + 25/450*canvasChart.height);  
    for( var i = 1; i < arrayLen; i++ ){  
        context.lineTo( GRAPH_WIDTH / arrayLen * i + GRAPH_LEFT, ( GRAPH_HEIGHT - dataArr[ i ] / largest * GRAPH_HEIGHT ) + GRAPH_TOP );  
        // draw reference value for day of the week  
        if ((i + 1) % 10000 == 0){
        context.fillText( ( i + 1 ), GRAPH_WIDTH / arrayLen * i + GRAPH_LEFT, GRAPH_BOTTOM + 25/450*canvasChart.height);
        }
    }  
    context.stroke();  
}   
