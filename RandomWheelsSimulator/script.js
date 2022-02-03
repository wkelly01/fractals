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

function simulateRun(runs,iter){
    console.clear()
    let maxDistsRuns = new Array()
    for(j=0 ; j<runs ; j++){
        point = [0.2,0.4]
        //Create an empty Array for all plottable points
        let pointsArrayX = new Array();
        let pointsArrayY = new Array();
        //Calculate each point that needs plaotting
        for (i=0 ; i<iter ; i++) {
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
        maxDistsRuns[j] = maxDistance(pointsArrayX,pointsArrayY)
    }
    analysisCalc(maxDistsRuns)
    drawGraph(maxDistsRuns,runs)
}

function distanceFormula(x,y) {
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
}

function maxDistance(XArr,YArr){
    let maxDistArray = new Array();
    for (i=0 ; i<XArr.length ; i++) {
        maxDistArray[i] = distanceFormula( XArr[i], YArr[i])
    }
    d = maxDistArray[0]
    for (i=1 ; i<maxDistArray.length ; i++) {
       if(maxDistArray[i] > d){
           d = maxDistArray[i]
       }    
    }
    return d
}

function analysisCalc(arr){
    divCreator("#MaxVal","Maximun Value: " + maxVal(arr))
    divCreator("#MinVal","Minimum Value: " + minVal(arr))
    divCreator("#MeanVal","Mean Value: " + meanVal(arr))
    divCreator("#MedianVal","Median Value: " + medianVal(arr))
    divCreator("#stdVal","Standard Deviation: " + stdVal(arr))
}

function maxVal(arr){
    let x = arr[0];
    for(i=1 ; i<arr.length ; i++){
        if (arr[i] > x){
            x = arr[i]
        }
    }
    return x
}

function minVal(arr){
    let x = arr[0];
    for(i=1 ; i<arr.length ; i++){
        if (arr[i] < x){
            x = arr[i]
        }
    }
    return x  
}

function meanVal(arr){
    let x = 0
    for(i=0 ; i<arr.length ; i++) {
        x += arr[i]
    }
    return x / arr.length
}

function medianVal(arr){
    arr.sort(function(a, b){return a-b});
    let x = arr.length % 2;
    if ( x == 1) {
        x = arr[(arr.length / 2 - 0.5)];
    } else {
        x = (arr[(arr.length / 2)] + arr[(arr.length / 2 - 1)]) / 2
    }
    return x;
}

function stdVal(arr){
    let x = 0
    for (j=0 ; j<arr.length ; j++){
        x += Math.pow(arr[j]-meanVal(arr),2)
    }
   return  x = Math.sqrt(x / (arr.length - 1))
}

function divCreator(id,text){
    divStats = document.querySelector(id)
    divStats.innerHTML = "";
    divStats.appendChild(document.createTextNode(text));
}

function drawGraph(dataPoints,r){
    let canvasGraph = document.getElementById("GraphCanvas");
    let context = canvasGraph.getContext("2d");
    canvasGraph.width = window.innerWidth * 0.475;
    canvasGraph.height= window.innerHeight * 0.5;
    
    let GRAPH_TOP = 0.10 * canvasGraph.height;
    let GRAPH_BOT = 0.90 * canvasGraph.height;
    let GRAPH_RGHT= 0.90 * canvasGraph.width;
    let GRAPH_LEFT= 0.10 * canvasGraph.width;
    
    let GRAPH_HEIGHT = GRAPH_BOT - GRAPH_TOP;
    let GRAPH_WIDTH  = GRAPH_RGHT-GRAPH_LEFT;
    
    let arrayLen = dataPoints.length;
    
    context.clearRect( 0, 0, canvasGraph.width, canvasGraph.height);
    
    context.fillStyle = "black";
    context.font = "16px Arial";
    
    // draw X and Y axis  
    context.beginPath();  
    context.moveTo( GRAPH_LEFT, GRAPH_TOP );  
    context.lineTo( GRAPH_LEFT, GRAPH_BOT );  
    context.lineTo( GRAPH_RGHT, GRAPH_BOT );  
    context.stroke();  
    
    let frequency = new Array();
    for (i=0; i<16 ; i++){
        frequency[i] = 0
    }
    let m = maxVal(dataPoints)
    for (k=0 ; k<dataPoints.length ; k++ ) {
        for (l=0 ; l<16 ; l++){
            if (dataPoints[k] > (l/16 * m) && dataPoints[k] <= ((l+1)/16 * m)){
                frequency[l] ++
            }
        }
        
    }
    
    let maxFreq = maxVal(frequency)
        
    // draw Bars
    context.font = "16px Arial";
    for(i=0 ; i<16 ; i++){
        context.fillRect(GRAPH_LEFT + (i/16) * GRAPH_WIDTH,
                     GRAPH_BOT - (frequency[i]/maxFreq) * GRAPH_HEIGHT,
                     (1/16) * GRAPH_WIDTH,
                     (frequency[i]/maxFreq) * GRAPH_HEIGHT
                    )
        //Add frequency counts to the top of the bars
        rotateText(frequency[i],
                   GRAPH_LEFT + (i/16) * GRAPH_WIDTH,
                   GRAPH_BOT - (frequency[i]/maxFreq) * GRAPH_HEIGHT,
                   90, context, 10,20)
    }
    //Label the x axis
    for(i=0 ; i<=16 ; i++){
        rotateText(m * i/16,
                   GRAPH_LEFT + (i/16 * GRAPH_WIDTH),
                   GRAPH_BOT,
                   -30,context, 7,15)
    }
    //Label the y axis
    rotateText("Frequency",
               GRAPH_LEFT,
               GRAPH_BOT - GRAPH_HEIGHT / 2,
               90, context,0,-5)
}

function rotateText(text,x,y,angle,context,xNudge=0,yNudge=0){
    context.save();
    context.translate(x,y);
    context.rotate(-Math.PI * angle / 180);
    context.fillText(text,xNudge,yNudge);
    context.restore();
}
