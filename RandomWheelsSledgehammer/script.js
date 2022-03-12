console.clear()
//number of graphs to graph
let c, ctx, l;
//pointX[] = [x,y,currentDist,minDist,maxDist]\
//pointAnalysis = [AbsMaxDist, AbsMeanDist, MeanMaxDist]
let point = new Object()
point.step0 = [[0.2,0.4]]
point.step0analysis = []
for (i=2 ; i<=4 ; i++){
    point.step0[0][i]=distanceForm(point.step0[0])
}

function doTheThing(n){
    document.getElementById("header").remove()
    for (i=1 ; i<=n ; i++){
        eval("point.step"+i+"=new Array()")
        eval("point.step"+i+"analysis=new Array()")
    }

    for (j=1 ; j<=n ; j++){
        eval("func1 ( point.step"+j+" , point.step"+(j-1)+")")
    }

    //axis window dimenstions 
    eval("l = Math.ceil(maxValueXY(point.step"+n+"))")

    // for (i=0 ; i<=n ; i++) {
    //     g = document.createElement('div');
    //     g.style = "text-align: center"
    //     document.body.appendChild(g)
    //     h = document.createElement("canvas")
    //     eval('h.id = "c'+i+'"')
    //     g.appendChild(h)
    // }
    analysis(n)
    let table  = document.querySelector("#data")
    for (i=0 ; i <= n ; i++){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        h = document.createElement("canvas")
        eval('h.id = "c'+i+'"')
        cell1.appendChild(h)
        d1 = document.createElement("div")
        eval('d1.innerHTML = "Step: "+i+""')
        cell2.appendChild(d1)
        d2 = document.createElement("div")
        eval('d2.innerHTML = "Max Distance: "+point.step'+i+'analysis[0]')
        cell2.appendChild(d2)
        d3 = document.createElement("div")
        eval('d3.innerHTML = "Max Distance: "+point.step'+i+'analysis[1]')
        cell2.appendChild(d3)
        d4 = document.createElement("div")
        d4.innerHTML = "Points:"
        cell2.appendChild(d4)
        for ( j=0 ; j < Math.pow(3,i) ; j++){
            p1 = document.createElement("div")
            eval('x = point.step'+i+'['+j+'][0]')
            eval('y = point.step'+i+'['+j+'][1]')
            eval('r = point.step'+i+'['+j+'][2]')
            theta = polarDegree(x,y)
            p1.innerHTML = "("+x+","+y+") || ("+r+","+theta+"°)"
            cell2.appendChild(p1)
        }
    }
    
    for (k=0 ; k<=n ; k++) {
        eval('axisMaker("c'+k+'")');
        for (j=0 ; j<k ; j++) {
            eval('func2(point.step'+j+',"gray")')
        }
        eval("func2(point.step"+k+")")
    }
}

// My Functions
function axisMaker(id){

    c= document.getElementById(id);
    ctx = c.getContext("2d");
    c.width = window.innerHeight * 0.50
    c.height= window.innerHeight * 0.50

    ctx.fillStyle = "#8788EE"
    ctx.fillRect(0,0,c.width,c.height)
    //x and y axes
    ctx.beginPath();  
    ctx.moveTo( 0 , c.height * 0.5 );  
    ctx.lineTo( c.width, c.height * 0.5 );  
    ctx.stroke(); 

    ctx.beginPath();  
    ctx.moveTo( c.width * 0.5 , 0 );  
    ctx.lineTo( c.width * 0.5 , c.height);  
    ctx.stroke(); 
}
function func1 (arr, arrSeed) {
    for ( i=0 ; i < (3 * arrSeed.length) ; i+= 3){
    arr[i] = new Array()
        T1(arrSeed[i/3][0],arrSeed[i/3][1],arr[i])
        arr[i][2]=distanceForm(arr[i])
        if (arr[i][2] < arrSeed[i/3][3]) {
            arr[i][3] = arr[i][2]
        } else {
            arr[i][3] = arrSeed[i/3][3]
        }
        if (arr[i][2] > arrSeed[i/3][4]) {
            arr[i][4] = arr[i][2]
        } else {
            arr[i][4] = arrSeed[i/3][4]
        }
    arr[i+1] = new Array()
        T2(arrSeed[i/3][0],arrSeed[i/3][1],arr[i+1])
        arr[i+1][2]=distanceForm(arr[i+1])
        if (arr[i+1][2] < arrSeed[i/3][3]) {
            arr[i+1][3] = arr[i+1][2]
        } else {
            arr[i+1][3] = arrSeed[i/3][3]
        }
        if (arr[i+1][2] > arrSeed[i/3][4]) {
            arr[i+1][4] = arr[i+1][2]
        } else {
            arr[i+1][4] = arrSeed[i/3][4]
        }
    arr[i+2] = new Array()
        T3(arrSeed[i/3][0],arrSeed[i/3][1],arr[i+2])
        arr[i+2][2]=distanceForm(arr[i+2])
        if (arr[i+2][2] < arrSeed[i/3][3]) {
            arr[i+2][3] = arr[i+2][2]
        } else {
            arr[i+2][3] = arrSeed[i/3][3]
        }
        if (arr[i+2][2] > arrSeed[i/3][4]) {
            arr[i+2][4] = arr[i+2][2]
        } else {
            arr[i+2][4] = arrSeed[i/3][4]
        }
    }
}
function func2(arr,color="black"){
    for (i=0 ; i<arr.length ; i++) {
        pointPlotter(arr[i][0],arr[i][1],color)
    }
}
function maxValueXY(arr){
    let d = Math.sqrt(Math.pow(arr[0][0],2)+Math.pow(arr[0][1],2))
    for ( i=1 ; i<arr.length ; i++){
        
        if (d < Math.sqrt(Math.pow(arr[i][0],2)+Math.pow(arr[i][1],2))){
            d = Math.sqrt(Math.pow(arr[i][0],2)+Math.pow(arr[i][1],2))
        }
    }
    return d
}
function pointPlotter(x,y,color="black",r=2){
    ctx.save();
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(Px(x), Py(y), r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()
    ctx.restore();
}
function Px(x){
    return (c.width * 0.5 * x / l) + (c.width * 0.5)
}
function Py(y){
    return -(c.height * 0.5 * y / l) + (c.height * 0.5)
}
function analysis(n){
    //for loop for each step
    for (i=0 ; i<=n ; i++){
        eval('point.step'+i+'analysis[0] = point.step'+i+'[0][4]')
        //for loop for each point in a step
        for(j=1 ; j<Math.pow(3,i) ; j++){
            eval('t = point.step'+i+'analysis[0] < point.step'+i+'[j][4]')
            if (t){
                eval('point.step'+i+'analysis[0] = point.step'+i+'[j][4]')
            }
        }
    }
    for (i=0 ; i<=n ; i++){
        eval('point.step'+i+'analysis[1] = point.step'+i+'[0][3]')
        //for loop for each point in a step
        for(j=1 ; j<Math.pow(3,i) ; j++){
            eval('t = point.step'+i+'analysis[1] < point.step'+i+'[j][3]')
            if (t){
                eval('point.step'+i+'analysis[1] = point.step'+i+'[j][3]')
            }
        }
    }    
}
function polarDegree(x,y){
    if (x >= 0 && y >= 0) {
        return Math.atan(y/x) * (180/Math.PI)
    } else if (x >= 0 && y <= 0) {
        return Math.atan(y/x) * (180/Math.PI) + 360
    } else {
        return Math.atan(y/x) * (180/Math.PI) + 180
    }
}
//Transformation functions BEGIN
function T1(x,y,arr) {
    arr[0] = ((Math.cos(Math.PI / 3) * x) - (Math.sin(Math.PI / 3) * y));
    arr[1] = ((Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y));
}
function T2(x,y,arr) {
    arr[0] = ((Math.cos(Math.PI / 3) * x) - (Math.sin(Math.PI / 3) * y)) + (1/2);
    arr[1] = ((Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y)) + (1/2);
}
function T3(x,y,arr) {
    arr[0] = ((Math.cos(Math.PI / 3) * x) - (Math.sin(Math.PI / 3) * y)) - (1/2);
    arr[1] = ((Math.sin(Math.PI / 3) * x) + (Math.cos(Math.PI / 3) * y)) - (1/2);
}
//Transformation functions END


function distanceForm(arr){
    return Math.sqrt(Math.pow(arr[0],2) + Math.pow(arr[1],2))
}