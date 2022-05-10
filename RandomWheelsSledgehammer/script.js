console.clear()
let rotation, e_1, f_1, e_2, f_2, e_3, f_3;
const colors = ["#2f4f4f","#2e8b57","#8b0000","#808000","#483d8b","#b03060","#ff0000","#ff8c00","#ffff00","#00ff00","#ba55d3","#00fa9a","#e9967a","#00ffff","#00bfff","#0000ff","#ff00ff","#f0e68c","#dda0dd"]
let data = new Object();

function doTheThing(n,rot,e1,f1,e2,f2,e3,f3,x,y){
    setUsUpThePage(rot,e1,f1,e2,f2,e3,f3)
    createStarterData(x,y);
    createPrunedPathPoints(n);
    createPageTable(n);
    graphTheGraphs(n);
    graphTheLegends(n);
}

//Main Functions
//~~Set up the page with inputted values and cleare previous run
function setUsUpThePage(rot,e1,f1,e2,f2,e3,f3){
    if (document.getElementById("data") != null){
        document.getElementById("data").remove()
    }
    var Table = document.createElement("table")
    Table.id = "data"
    document.body.appendChild(Table)
    rotation = rot * Math.PI / 180
    e_1 = e1;
    f_1 = f1;
    e_2 = e2;
    f_2 = f2;
    e_3 = e3;
    f_3 = f3;
}
//~~Set up initial Step for Data Object
function createStarterData(x,y){
    data.analysis = new Object();
    data.step0 = new Object();
    data.step0.point1 = new point([x,y])
    data.analysis.step0 = {MaxDistanceOfPath:data.step0.point1.MaxDistanceOfPath,
                           MinDistanceOfPath:data.step0.point1.MinDistanceOfPath,
                           GreatestUniqueCount:[1]
                          }
}
//~~New Function to create Pruned Path Points
function createPrunedPathPoints(n){
    for ( i=1 ; i <=n ; i++){
        eval("data.step"+i+" = new Object()"); //Create empty nth step Object
        let step
            eval("step = data.step"+i)
        let preStep
            eval("preStep = data.step"+(i-1))
        let stepAnal
            eval("stepAnal = data.analysis.step"+i+" = new Object()")
        let stepPAnal
            eval("stepPAnal = data.analysis.step"+(i-1))
        let previousArray = Object.keys(preStep)
        eval("key = previousArray.length * 3")
        for ( j=1 ; j <= key ; j++) {
            eval("pointC = data.step"+i+".point"+j+"")
            eval("T = T"+(((j-1)%3)+1))
            eval("pointC = data.step"+i+".point"+j+" = new point(T(preStep[previousArray[Math.floor((j-1)/3)]].coordinateRect))") 
            if (pointC.MaxDistanceOfPath < preStep[previousArray[Math.floor((j-1)/3)]].MaxDistanceOfPath){
                pointC.MaxDistanceOfPath = preStep[previousArray[Math.floor((j-1)/3)]].MaxDistanceOfPath
            }
            if (pointC.MinDistanceOfPath > preStep[previousArray[Math.floor((j-1)/3)]].MinDistanceOfPath){
                pointC.MinDistanceOfPath = preStep[previousArray[Math.floor((j-1)/3)]].MinDistanceOfPath
            }
            pointC.UniquenessCounter = preStep[previousArray[Math.floor((j-1)/3)]].UniquenessCounter
        }
        
        let currentArray = new Array()
            eval("currentArray = Object.keys(data.step"+i+")")
        analysisSteps(step,currentArray,stepAnal,stepPAnal)
        uniquenessPrune(step,currentArray)
            eval("currentArray = Object.keys(data.step"+i+")")
        uniquenessColors(step,currentArray,stepAnal)
    }
}
//~~Create an Object conting only Unique values 
function uniquenessPrune(step,currentArray){
    let epsilon = 0.0000002
    for (ui = 0 ; ui < currentArray.length ; ui++){
        if (step[currentArray[ui]] != undefined){
            for (uj = ui+1 ; uj < currentArray.length ; uj++){
                if (step[currentArray[uj]] != undefined){
                    x1 = step[currentArray[ui]].coordinateRect[0]
                    x2 = step[currentArray[uj]].coordinateRect[0]
                    y1 = step[currentArray[ui]].coordinateRect[1]
                    y2 = step[currentArray[uj]].coordinateRect[1]
                    if ((Math.abs(x1 - x2) <= epsilon) && (Math.abs(y1 - y2) <= epsilon)) {
                        step[currentArray[ui]].UniquenessCounter += step[currentArray[uj]].UniquenessCounter
                        delete step[currentArray[uj]]
                    }
                }
            }   
        }
    }
}
//~~Analysis setps of points per step
function analysisSteps(step,currentArray,stepAnal,stepPAnal){
    stepAnal.MaxDistanceOfPath = stepPAnal.MaxDistanceOfPath;
    stepAnal.MinDistanceOfPath = stepPAnal.MinDistanceOfPath;
    for (ui=0 ; ui < currentArray.length ; ui++){
        if (step[currentArray[ui]].MaxDistanceOfPath > stepAnal.MaxDistanceOfPath){
            stepAnal.MaxDistanceOfPath = step[currentArray[ui]].MaxDistanceOfPath
        }
        if (step[currentArray[ui]].MinDistanceOfPath < stepAnal.MinDistanceOfPath){
            stepAnal.MinDistanceOfPath = step[currentArray[ui]].MinDistanceOfPath
        }
    }
    stepAnal.GreatestUniqueCount = []
}
//~~Create any array of values correlating to Uniqueness counts
function uniquenessColors(step,currentArray,stepAnal){
    let stepAUC = stepAnal.GreatestUniqueCount
    for (ui = 0 ; ui < currentArray.length ; ui++){
        stepAUC.push(step[currentArray[ui]].UniquenessCounter)
    }
    uniqSort(stepAUC)
}
//~~Create the table to display the graph and information
function createPageTable(n){
    let table  = document.querySelector("#data")
    for (i=0 ; i <= n ; i++){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var path = eval("data.step"+i)
        var st = Object.keys(path).length
        
        h = document.createElement("canvas")
            eval('h.id = "c'+i+'"')
            cell1.appendChild(h)
        h = document.createElement("br")
            cell1.appendChild(h)
        h = document.createElement("canvas")
            eval('h.id = "l'+i+'"')
            cell1.appendChild(h)
        d1 = document.createElement("div")
            eval('d1.innerHTML = "Step: "+i+": "+st+" unique points out of " + Math.pow(3,i)')
            cell2.appendChild(d1)
        d2 = document.createElement("div")
            eval('d2.innerHTML = "Max Distance of the path: "+data.analysis.step'+i+'.MaxDistanceOfPath')
            cell2.appendChild(d2)
        d3 = document.createElement("div")
            eval('d3.innerHTML = "Min Distance of the path: "+data.analysis.step'+i+'.MinDistanceOfPath')
            cell2.appendChild(d3)
        d4 = document.createElement("div")
        d4.innerHTML = "Points:"
        cell2.appendChild(d4)
        for ( j=1 ; j <= Math.pow(3,i) ; j++){
            if (eval("data.step"+i+".point"+j+" != undefined")){
                p1 = document.createElement("div")
                eval("x = data.step"+i+".point"+j+".coordinateRect[0]")
                eval("y = data.step"+i+".point"+j+".coordinateRect[1]")
                eval("r = data.step"+i+".point"+j+".coordinatePol[0]")
                eval("t = data.step"+i+".point"+j+".coordinatePol[1]")
                p1.innerHTML = "("+x+" , "+y+") || ("+r+" , "+t+"°)"
                cell2.appendChild(p1)
            }
        }
    }
}
//~~Create the Axis and Grpah all points to hte Axis
function graphTheGraphs(n){
    for (i=0 ; i<=n ; i++){
        c= document.getElementById("c"+i);
        ctx = c.getContext("2d");
        c.width = window.innerHeight * 0.50
        c.height= window.innerHeight * 0.50

        ctx.fillStyle = "#FAF9F6"
        ctx.fillRect(0,0,c.width,c.height)
    //~~ x and y axes ~~//
        ctx.beginPath();  
        ctx.moveTo( 0 , c.height * 0.5 );  
        ctx.lineTo( c.width, c.height * 0.5 );  
        ctx.stroke(); 
        ctx.beginPath();  
        ctx.moveTo( c.width * 0.5 , 0 );  
        ctx.lineTo( c.width * 0.5 , c.height);  
        ctx.stroke(); 
    //~~ Plotting the Points ~~//
        eval("l = Math.ceil(data.analysis.step"+n+".MaxDistanceOfPath)")
        var checkBox = document.getElementById("PreviousSteps");
        if (checkBox.checked == true){
            a = i
        } else {
            a = 0
        }
        for (j=a ; j<=i ; j++) {
            let step
                eval("step = data.step"+j)
            let currentArray = Object.keys(step)
            let stepAnal
                eval("stepAnal = data.analysis.step"+j)
            for (k=0 ; k < currentArray.length ; k++){
                x = step[currentArray[k]].coordinateRect[0];
                y = step[currentArray[k]].coordinateRect[1];
                if (j == i){
                    a1 = stepAnal.GreatestUniqueCount
                    console.log(a1)
                    a2 = step[currentArray[k]].UniquenessCounter
                    console.log(a2)
                    a3 = a1.indexOf(a2)
                    color = colors[a3%colors.length]
                }else {
                    color = "#D3D3D3"
                }
                ctx.save();
                ctx.fillStyle = color
                ctx.beginPath();
                ctx.arc(Px(x), Py(y), 2, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill()
                ctx.restore();
            }
        }
    }
}
//~~Create the Legends
function graphTheLegends(n){
    for (i=0 ; i<=n ; i++){
        let step
        eval("step = data.step"+i)
        let currentArray = Object.keys(step)
        let stepAnal
        eval("stepAnal = data.analysis.step"+i)
        let analArray = Object.keys(stepAnal.GreatestUniqueCount)
        c= document.getElementById("l"+i);
        ctx = c.getContext("2d");
        c.width = window.innerHeight * 0.50
        rowHeight = window.innerHeight * 0.05
        c.height= rowHeight * Math.ceil(analArray.length / 8)
        console.log(c.height)
        rowHeight = window.innerHeight * 0.05
        let la = stepAnal.GreatestUniqueCount
        for (j=0 ; j<la.length ; j++){
            ctx.fillStyle = colors[j%colors.length]
            ca = (1/8)*c.width * (j  % 8)
            cb = Math.floor(j/8) * rowHeight
            cc = (1/8)*c.width
            cd = 0.5*rowHeight
            ctx.fillRect(ca, cb, cc, cd)
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black"
                x = ca + (1/2)*cc
                y = rowHeight + (rowHeight * Math.floor(j/8)) -2
                //y = c.height
            ctx.fillText(la[j], x, y);
        }
    }
}

//Math Functionss
//~~Distance formula (From Center)~~
function distanceFormula(arr){
    return strip(Math.sqrt(Math.pow(arr[0],2) + Math.pow(arr[1],2)))
}
//~~Finds the polar measure of a point in Degrees
function polarDegree(arr){
    if (arr[0] == 0 && arr[1] == 0) {
        return strip(0)
    } else if (arr[0] >= 0 && arr[1] >= 0) {
        return strip(Math.atan(arr[1]/arr[0]) * (180/Math.PI))
    } else if (arr[0] >= 0 && arr[1] <= 0) {
        return strip(Math.atan(arr[1]/arr[0]) * (180/Math.PI) + 360)
    } else {
        return strip(Math.atan(arr[1]/arr[0]) * (180/Math.PI) + 180)
    }
}
//~~Rounding function to work with the numbers
function strip(number) {
    let p = Math.pow(10,15)
    return (Math.round(number * p) / p).toFixed(7)
}
//~~Corrects Points for plotting on Canvas
function Px(x){
    return (c.width * 0.5 * x / l) + (c.width * 0.5)
}
function Py(y){
    return -(c.height * 0.5 * y / l) + (c.height * 0.5)
}

//Transformation Functions
function T1(arr) {
    let x = strip(((Math.cos(rotation) * arr[0]) - (Math.sin(rotation) * arr[1])) + (e_1));
    let y = strip(((Math.sin(rotation) * arr[0]) + (Math.cos(rotation) * arr[1])) + (f_1));
    return [x,y]
}
function T2(arr) {
    let x = strip(((Math.cos(rotation) * arr[0]) - (Math.sin(rotation) * arr[1])) + (e_2));
    let y = strip(((Math.sin(rotation) * arr[0]) + (Math.cos(rotation) * arr[1])) + (f_2));
    return [x,y]
}
function T3(arr) {
    let x = strip(((Math.cos(rotation) * arr[0]) - (Math.sin(rotation) * arr[1])) + (e_3));
    let y = strip(((Math.sin(rotation) * arr[0]) + (Math.cos(rotation) * arr[1])) + (f_3));
    return [x,y]
}

//Point Class Creator
class point {
    constructor(coord,max=0,min=0,uc=1) {
        this.coordinateRect = coord
        this.coordinatePol = [distanceFormula(this.coordinateRect),polarDegree(this.coordinateRect)]
        this.distanceFromOrigin = distanceFormula(this.coordinateRect)
        this.MaxDistanceOfPath = this.distanceFromOrigin
        this.MinDistanceOfPath = this.distanceFromOrigin
        this.UniquenessCounter = uc
    }
}

//~~ Sorts and removes Duplicates from an Array
function uniqSort(a) {
    let b = a.sort(function(a, b){return a-b});
    for (p=1 ; p<b.length ; ){
        if (b[p-1] == b[p]) {
            b.splice(p,1)
        } else {
            p++
        }
    }
    return b
}

