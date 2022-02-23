console.clear();

//Transformation functions BEGIN
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
//Transformation functions END

let walksArray = [100, 200, 300, 400, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 16000, 18000, 20000, 23000, 26000, 30000, 40000, 50000]
let walksArray2 = [60000, 80000, 100000, 150000]
let point, pointsX, pointsY, maxDistances, dataSets, dataSets2, graphData, alpha, beta;
maxDistances = new Array();
dataSets = new Array();
for (i=0 ; i<4 ; i++){
        dataSets[i] = new Array()
}

function step1(runs){
    pathGenerator(runs,walksArray,0);
    analysis(walksArray,0)
    tableMaker1("#data1",0)
    step2(walksArray,dataSets[0])
    document.querySelector("#button1").remove();
    drawGraph(walksArray,dataSets[0],"graph1")
}

function step2(x,y){
    lobf(x,y)
    document.querySelector(".step2").style.visibility = "visible";
    document.querySelector("#alphabeta").innerHTML = "f(x) = " +alpha + " * x ^   " + beta
    tableMaker2()
}

function step3(runs){
    document.querySelector("#button2").remove();
    walksArray = walksArray.concat(walksArray2)
    pathGenerator(runs,walksArray,27);
    analysis(walksArray,27)
    tableMaker1("#data3",27)
    drawGraph(walksArray,dataSets[0],"graph2")
    document.querySelector("#fun").style.visibility = "visible";
}

function pathGenerator(r,w,num){
    let k = num
    for ( ; k<(w.length); k++){
        maxDistances[k] = new Array();
        for (j=0 ; j<r ; j++){
            point = [0.2,0.4];
            pointsX = new Array();
            pointsY = new Array();
            for (i=0 ; i<w[k] ; i++) {
                n = Math.random()
                switch (true) {
                    case n < 1/3:
                        T1(point[0],point[1]);
                        break;
                    case n < 2/3:
                        T2(point[0],point[1]);
                        break;
                    case n < 1:
                        T3(point[0],point[1]);
                        break;
                };
                pointsX[i] = point[0];
                pointsY[i] = point[1];
            }
            maxDistances[k][j] = maxDistance(pointsX,pointsY)
        }
    }
}

function analysis(arr,num){
    k = num  
    for (; k<(arr.length) ; k++){
        dataSets[0][k] = meanVal(maxDistances[k]);
        dataSets[1][k] = stdVal(maxDistances[k]);
        dataSets[2][k] = std1(maxDistances[k]);
        dataSets[3][k] = std2(maxDistances[k]);
    }
}

function tableMaker1(id,start){
    var table = document.querySelector(id);
    var rowLength = table.rows.length
    if (rowLength > 0) {
        for (i=0 ; i <= rowLength ; i++){
            table.deleteRow(-1);
        }
    }
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = "n";
    cell2.innerHTML = "μ";
    cell3.innerHTML = "σ";
    cell4.innerHTML = "% withing 1 σ";
    cell5.innerHTML = "% withing 2 σ";
    for (j=start ; j<walksArray.length ; j++){
        var table = document.querySelector(id);
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = walksArray[j];
        cell2.innerHTML = dataSets[0][j];
        cell3.innerHTML = dataSets[1][j];
        cell4.innerHTML = dataSets[2][j];
        cell5.innerHTML = dataSets[3][j];
    }
}

function tableMaker2(){
    var table = document.querySelector("#data2");
    var rowLength = table.rows.length
    if (rowLength > 0) {
        for (i=0 ; i <= rowLength ; i++){
            table.deleteRow(-1);
        }
    }
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "n";
    cell2.innerHTML = "μ predicted";
    for (j=0 ; j<walksArray2.length ; j++){
        var table = document.querySelector("#data2");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = walksArray2[j];
        cell2.innerHTML = powerCurve(walksArray2[j]);
    }
}

//// Stat Calculations Start ////
function powerCurve(x){
    return alpha * Math.pow(x,beta)
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
function distanceFormula(x,y) {
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
}
function meanVal(arr){
    let x = 0
    for(i=0 ; i<arr.length ; i++) {
        x += arr[i]
    }
    return x / arr.length
}
function stdVal(arr){
    let x = 0
    for (j=0 ; j<arr.length ; j++){
        x += Math.pow(arr[j]-meanVal(arr),2)
    }
   return  x = Math.sqrt(x / (arr.length - 1))
}
function std1(arr){
    let m = meanVal(arr);
    let s = stdVal(arr);
    let num = 0
    for (i=0; i<arr.length ; i++){
        if( (arr[i] > (m - s)) && (arr[i] < (m + s)) ){
            num++
        };
    };
    return num / arr.length;
};
function std2(arr){
    let m = meanVal(arr)
    let s = stdVal(arr)
    let num = 0
    for (i=0; i<arr.length ; i++){
        if( (arr[i] > (m - s - s)) && (arr[i] < (m + s + s))){
            num++
        }
    }
    return num / arr.length
}
function lobf(Xarr,Yarr){
    let XarrLN = new Array()
    for (i=0 ; i<Xarr.length ; i++){
        XarrLN[i] = Math.log(Xarr[i])
    }
    let YarrLN = new Array()
    for (i=0 ; i<Yarr.length ; i++){
        YarrLN[i] = Math.log(Yarr[i])
    }
    let xBar, yBar, mN, mD, a, b;
    xBar = meanVal(XarrLN);
    yBar = meanVal(YarrLN);
    mN = 0
    mD = 0
    for (i=0 ; i < Xarr.length ; i++){
        mN += ((XarrLN[i] - xBar) * (YarrLN[i] - yBar))
        mD += Math.pow(XarrLN[i] - xBar,2)
    }
    beta = mN / mD
    alpha = Math.exp(yBar - (beta * xBar))
}
///// Stat Calculations End /////

///// Graphing Functions ////////
function drawGraph(arrX, arrY, id){
    let c= document.getElementById(id);
    let ctx = c.getContext("2d");
    c.width = window.innerWidth * 0.90;
    c.height= window.innerHeight * 0.50;
    
    let GRAPH_T = 0.20 * c.height;
    let GRAPH_B = 0.80 * c.height;
    let GRAPH_R = 0.90 * c.width;
    let GRAPH_L= 0.10 * c.width;
    
    let GRAPH_H = GRAPH_B - GRAPH_T;
    let GRAPH_W  = GRAPH_R-GRAPH_L;
    
    let max_X = arrX[arrX.length-1];
    let max_Y
    if (arrY[arrY.length-1] >= powerCurve(arrX[arrX.length-1])){
        max_Y = Math.ceil(arrY[arrY.length-1] / 10) * 10
    } else {
        max_Y = Math.ceil(powerCurve(arrX[arrX.length-1]) / 10) * 10
    }
    ctx.clearRect( 0, 0, c.width, c.height);
    ctx.fillStyle ="#AED6F1 "
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "white"
    ctx.fillRect(GRAPH_L,GRAPH_T,GRAPH_W,GRAPH_H)
    
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    
    // draw X and Y axis  
    ctx.beginPath();  
    ctx.moveTo( GRAPH_L, GRAPH_T );  
    ctx.lineTo( GRAPH_L, GRAPH_B );  
    ctx.lineTo( GRAPH_R, GRAPH_B );  
    ctx.stroke(); 
    
    // draw grid lines
    ctx.strokeStyle = "#CCD1D1"
    let p = 10
    for (i=0 ; i<=10 ; i++) {
        ctx.beginPath();  
        ctx.moveTo( GRAPH_L, GRAPH_B - (i/p) * GRAPH_H );  
        ctx.lineTo( GRAPH_R, GRAPH_B - (i/p) * GRAPH_H );   
        ctx.stroke();
        ctx.beginPath();  
        ctx.moveTo(GRAPH_L + (i/p) * GRAPH_W, GRAPH_B );  
        ctx.lineTo(GRAPH_L + (i/p) * GRAPH_W, GRAPH_T );   
        ctx.stroke();
    }
    // draw Points
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.moveTo(GRAPH_L, GRAPH_B);
    p = 100
    for (i=0 ; i<=p ; i++){
        x = GRAPH_L + ((i / p) * GRAPH_W);
        y = GRAPH_B - (powerCurve((i / p) * max_X) / max_Y * GRAPH_H)
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    ctx.strokeStyle = "black"
    for (i=0 ; i<arrX.length ; i++){
        c_h = GRAPH_L + (arrX[i] / max_X) * GRAPH_W;
        c_k = GRAPH_B - (arrY[i] / max_Y) * GRAPH_H;
        ctx.beginPath();
        ctx.arc(c_h, c_k, 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    ctx.textAlign = "center";
    rotateText("μ (max distance from center)",
               GRAPH_L * 0.5 ,
               c.height * 0.5,
               90, ctx)
    ctx.fillText("n (number of walks in the path)",
                 c.width * 0.5,
                 c.height - 8                
                )
    p = 10
    for (i=0 ; i<=10 ; i++) {
        ctx.textAlign = "right";
        ctx.fillText((i/p)*max_Y,
                     GRAPH_L,
                     GRAPH_B - (i/p) * GRAPH_H
                     );
        ctx.textAlign = "left";
        rotateText((i/p)*max_X,
                   GRAPH_L + (i/p) * GRAPH_W,
                   GRAPH_B + 16,
                   -30, ctx
                  )
    }
    ctx.textAlign = "center"
    ctx.fillText("Walks in a Path vs. Average Max Distance",
                c.width * 0.5,
                GRAPH_T * 0.5)
}

function rotateText(text,x,y,angle,context,xNudge=0,yNudge=0){
    theta = Math.PI * angle / 180
    context.save();
    context.translate(x,y);
    context.rotate(-theta);
    context.fillText(text,
                     xNudge * Math.cos(theta) + yNudge * Math.sin(theta),
                     xNudge * Math.sin(theta) - yNudge * Math.cos(theta)
                     );
    context.restore();
}