//number of graphs to graph
let c, ctx, l;
let point = new Object()
point.step0 = [[0.2,0.4]]

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
    arr[i+1] = new Array()
    T2(arrSeed[i/3][0],arrSeed[i/3][1],arr[i+1])
    arr[i+2] = new Array()
    T3(arrSeed[i/3][0],arrSeed[i/3][1],arr[i+2])
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
function doTheThing(n){
    for (i=1 ; i<=n ; i++){
        eval("point.step"+i+"=new Array()")
    }

    for (j=1 ; j<=n ; j++){
        eval("func1 ( point.step"+j+" , point.step"+(j-1)+")")
    }

    //axis window dimenstions 
    eval("l = Math.ceil(maxValueXY(point.step"+n+"))")

    for (i=0 ; i<=n ; i++) {
        g = document.createElement('div');
        g.style = "text-align: center"
        document.body.appendChild(g)
        h = document.createElement("canvas")
        eval('h.id = "c'+i+'"')
        g.appendChild(h)
    }

    for (k=0 ; k<=n ; k++) {
        eval('axisMaker("c'+k+'")');
        for (j=0 ; j<k ; j++) {
            eval('func2(point.step'+j+',"gray")')
        }
        eval("func2(point.step"+k+")")
    }
}