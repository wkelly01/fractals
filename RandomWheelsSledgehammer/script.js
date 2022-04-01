console.clear()
let rotation, e_1, f_1, e_2, f_2;
const colors = ["#2f4f4f","#2e8b57","#8b0000","#808000","#483d8b","#b03060","#ff0000","#ff8c00","#ffff00","#00ff00","#ba55d3","#00fa9a","#e9967a","#00ffff","#00bfff","#0000ff","#ff00ff","#f0e68c","#dda0dd","#2f4f4f","#2e8b57","#8b0000","#808000","#483d8b","#b03060","#ff0000","#ff8c00","#ffff00","#00ff00","#ba55d3","#00fa9a","#e9967a","#00ffff","#00bfff","#0000ff","#ff00ff","#f0e68c","#dda0dd","#2f4f4f","#2e8b57","#8b0000","#808000","#483d8b","#b03060","#ff0000","#ff8c00","#ffff00","#00ff00","#ba55d3","#00fa9a","#e9967a","#00ffff","#00bfff","#0000ff","#ff00ff","#f0e68c","#dda0dd"]

let data = new Object();

function doTheThing(n,rot,e1,f1,e2,f2){
    setUsUpThePage(rot,e1,f1,e2,f2)
    createStarterData();
    createPathPoints(n);
    analysisSteps(n);
    uniquenessPrune(n);
    uniquenessColors(n);
    createPageTable(n);
    graphTheGraphs(n);
    graphTheLegends(n);
}

//Main Functions
//~~Set up the page with inputted values and cleare previous run
function setUsUpThePage(rot,e1,f1,e2,f2){
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
}
//~~Set up initial Step for Data Object
function createStarterData(){
    data.analysis = new Object();
    data.step0 = new Object();
    data.step0.point1 = new point([0.2,0.4])
}
//~~Create Points for each additional Step
function createPathPoints(n){
    for ( i=1 ; i<=n ; i++){
        eval("data.step"+i+" = new Object()");
        for ( j=1 ; j <= Math.pow(3,i) ; j++) {
            eval("data.step"+i+".point"+j+" = new point(T"+(((j-1)%3)+1)+"(data.step"+(i-1)+".point"+(1+(Math.floor((j-1)/3)))+".coordinateRect))")
            if (eval("data.step"+i+".point"+j+".MaxDistanceOfPath < data.step"+(i-1)+".point"+(1+(Math.floor((j-1)/3)))+".MaxDistanceOfPath")){
                eval("data.step"+i+".point"+j+".MaxDistanceOfPath = data.step"+(i-1)+".point"+(1+(Math.floor((j-1)/3)))+".MaxDistanceOfPath")
            }
            if (eval("data.step"+i+".point"+j+".MinDistanceOfPath > data.step"+(i-1)+".point"+(1+(Math.floor((j-1)/3)))+".MinDistanceOfPath")){
                eval("data.step"+i+".point"+j+".MinDistanceOfPath = data.step"+(i-1)+".point"+(1+(Math.floor((j-1)/3)))+".MinDistanceOfPath")
            }
        }
    }
}
//~~Analysis setps of points per step
function analysisSteps(n){
    for (i=0 ; i<=n ; i++) {
        eval("data.analysis.step"+i+" = new Object()")
        var path = eval("data.step"+i)
        eval("data.analysis.step"+i+".MaxDistanceOfPath = path.point1.MaxDistanceOfPath")
        for (j=2 ; j<=Math.pow(3,i) ; j++){
            if (eval("data.analysis.step"+i+".MaxDistanceOfPath < path.point"+j+".MaxDistanceOfPath")){
                eval("data.analysis.step"+i+".MaxDistanceOfPath = path.point"+j+".MaxDistanceOfPath")
            }
        }
        eval("data.analysis.step"+i+".MinDistanceOfPath = path.point1.MinDistanceOfPath")
        for (j=2 ; j<=Math.pow(3,i) ; j++){
            if (eval("data.analysis.step"+i+".MinDistanceOfPath > path.point"+j+".MinDistanceOfPath")){
                eval("data.analysis.step"+i+".MinDistanceOfPath = path.point"+j+".MinDistanceOfPath")
            }
        }
        eval("data.analysis.step"+i+".GreatestUniqueCount = []")
    }
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
//~~Create an Object conting only Unique values 
function uniquenessPrune(n){
    epsilon = 0.0000002
    for (i = 1 ; i <= n ; i++) {
        eval("a = Object.keys(data.step"+i+").length")
        for ( j=1 ; j <= a ; j++) {
            if (eval("data.step"+i+".point"+j+" != undefined")){
                for (k=j+1 ; k <=a ; k++){
                    if (eval("data.step"+i+".point"+k+" != undefined")){
                        eval("x1 = data.step"+i+".point"+j+".coordinateRect[0]")
                        eval("x2 = data.step"+i+".point"+k+".coordinateRect[0]")
                        eval("y1 = data.step"+i+".point"+j+".coordinateRect[1]")
                        eval("y2 = data.step"+i+".point"+k+".coordinateRect[1]")
                        if ((Math.abs(x1 - x2) <= epsilon) && (Math.abs(y1 - y2) <= epsilon)) {
                            eval("delete data.step"+i+".point"+k+"");
                            eval("data.step"+i+".point"+j+".UniquenessCounter++")
                            
                        }
                    }
                }
            }
        }
    }
}
//~~Create any array of values correlating to Uniqueness counts
function uniquenessColors(n){
    for (i=0 ; i<=n ; i++){
        for (j=1 ; j <= Math.pow(3,i) ; j++){
            if(eval("data.step"+i+".point"+j+" != undefined")){
                eval("data.analysis.step"+i+".GreatestUniqueCount.push(data.step"+i+".point"+j+".UniquenessCounter)")
            }
        }
        eval("uniqSort(data.analysis.step"+i+".GreatestUniqueCount)")
    }
}
//~~Create the Axis and Grpah all points to hte Axis
function graphTheGraphs(n){
    for (i=0 ; i<=n ; i++){
        c= document.getElementById("c"+i);
        ctx = c.getContext("2d");
        c.width = window.innerHeight * 0.50
        c.height= window.innerHeight * 0.50

        ctx.fillStyle = "#8788EE"
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
            a = Math.pow(3,j)
            for (k=1 ; k <= a ; k++){
                if (eval("data.step"+j+".point"+k+" != undefined")){
                    eval("x = data.step"+j+".point"+k+".coordinateRect[0];")
                    eval("y = data.step"+j+".point"+k+".coordinateRect[1];")
                    if (j == i){
                        eval("a1 = data.analysis.step"+j+".GreatestUniqueCount")
                        eval("a2 = data.step"+j+".point"+k+".UniquenessCounter")
                        a3 = a1.indexOf(a2)
                        color = colors[a3]
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
}
//~~Create the Legends
function graphTheLegends(n){
    for (i=0 ; i<=n ; i++){
        c= document.getElementById("l"+i);
        ctx = c.getContext("2d");
        c.width = window.innerHeight * 0.40
        c.height= window.innerHeight * 0.05
        eval("la = data.analysis.step"+i+".GreatestUniqueCount")
        for (j=0 ; j<la.length ; j++){
            ctx.fillStyle = colors[j]
            ctx.fillRect(0 + ((j*c.width)/la.length) , 0, (1/la.length) * c.width, 0.5*c.height)
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black"
                x = ((1/2) * (1/la.length) * c.width) + ((j*c.width)/la.length)
            ctx.fillText(la[j], x, c.height);
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
    if (arr[0] >= 0 && arr[1] >= 0) {
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

//~~Transformation Rules~~
// function T1(arr) {
//     let x = strip(((Math.cos(Math.PI / 3) * arr[0]) - (Math.sin(Math.PI / 3) * arr[1])));
//     let y = strip(((Math.sin(Math.PI / 3) * arr[0]) + (Math.cos(Math.PI / 3) * arr[1])));
//     return [x,y]
// }
// function T2(arr) {
//     let x = strip(((Math.cos(Math.PI / 3) * arr[0]) - (Math.sin(Math.PI / 3) * arr[1])) + (1/2));
//     let y = strip(((Math.sin(Math.PI / 3) * arr[0]) + (Math.cos(Math.PI / 3) * arr[1])) + (1/2));
//     return [x,y]
// }
// function T3(arr) {
//     let x = strip(((Math.cos(Math.PI / 3) * arr[0]) - (Math.sin(Math.PI / 3) * arr[1])) - (1/2));
//     let y = strip(((Math.sin(Math.PI / 3) * arr[0]) + (Math.cos(Math.PI / 3) * arr[1])) - (1/2));
//     return [x,y]
// }
function T1(arr) {
    let x = strip(((Math.cos(rotation) * arr[0]) - (Math.sin(rotation) * arr[1])));
    let y = strip(((Math.sin(rotation) * arr[0]) + (Math.cos(rotation) * arr[1])));
    return [x,y]
}
function T2(arr) {
    let x = strip(((Math.cos(rotation) * arr[0]) - (Math.sin(rotation) * arr[1])) + (e_1));
    let y = strip(((Math.sin(rotation) * arr[0]) + (Math.cos(rotation) * arr[1])) + (f_1));
    return [x,y]
}
function T3(arr) {
    let x = strip(((Math.cos(rotation) * arr[0]) - (Math.sin(rotation) * arr[1])) + (e_2));
    let y = strip(((Math.sin(rotation) * arr[0]) + (Math.cos(rotation) * arr[1])) + (f_2));
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

