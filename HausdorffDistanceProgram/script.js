console.clear()
let rotation, e_1, e_2, e_3, f_1, f_2, f_3
let tableCount = 0
setParas()

let S = [[0.2,0.4]]
let T1S = T(S)
let T2S = T(T1S)
let T3S = T(T2S)
let T4S = T(T3S)

Hausdorff(S,T1S,"S","T<sup>1</sup>(S)")

Hausdorff(T1S,T2S,"T<sup>1</sup>(S)","T<sup>2</sup>(S)")

Hausdorff(T2S,T3S,"T<sup>2</sup>(S)","T<sup>3</sup>(S)")

Hausdorff(T3S,T4S,"T<sup>3</sup>(S)","T<sup>4</sup>(S)")


function Hausdorff(S2,S1,a="a",b="b"){
    const header1 = document.createElement("div")
    header1.innerHTML = "H(" + a + "," + b + ")"
    document.body.appendChild(header1)
    const table = document.createElement("table")
    document.body.appendChild(table)
    tableCount++
    for (r=0 ; r<= S1.length+2 ; r++){
        let row = table.insertRow(-1)
        for (c=0 ; c<=S2.length+2 ; c++){
            let cell = row.insertCell(-1)
            cID = "t"+tableCount +"r" + r + "c" + c
            cell.id = cID
            //cell.innerHTML = cID
            if (r==0 && c==0){
                cell.innerHTML = ""
            } else if (r==0 && c <= S2.length){
                cell.innerHTML = a + "<sub>" + c + "</sub>"
            } else if (c==0 && r <= S1.length){
                cell.innerHTML = b + "<sub>" + r + "</sub>"
            } 
            if (r==(S1.length+1) && c==0){
                cell.innerHTML = "min{d("+a+"<sub>n</sub>,"+b+"<sub>m</sub>)"
            } else if (c==(S2.length+1) && r==0){
                cell.innerHTML = "min{d("+b+"<sub>n</sub>,"+a+"<sub>m</sub>)"
            }
            if (r == S1.length+2 && c ==1){
                cell.innerHTML = "xxx"
                cell.colSpan = S2.length
            } else if (r == S1.length+2 && c > 1){
                row.deleteCell(-1)
            }
            if (r == 1 && c ==S2.length+2){
                cell.innerHTML = "xxx"
                cell.rowSpan = S1.length
            } else if (r > 1 && r < S1.length+2 && c == S2.length+2){
                row.deleteCell(-1)
            }
        }
    }
    document.body.appendChild(document.createElement("br"))
    tempArray1 = new Array()
    for (i=0 ; i<S1.length ; i++){
        tempArray1.push(new Array())
        for (j=0 ; j<S2.length ; j++){
            tempArray1[i].push(distanceForm(S1[i],S2[j]))
            cID = "t"+tableCount +"r" + (i+1) + "c" + (j+1)
            document.getElementById(cID).innerHTML = tempArray1[i][j].toFixed(4)
            cID2 = "t"+tableCount +"r" + (i+1) + "c" + (S2.length+1)
            if (j==0) {
                small = tempArray1[i][j]
                document.getElementById(cID2).innerHTML = small.toFixed(4)
            }
            if (tempArray1[i][j]<small){
                small = tempArray1[i][j]
                document.getElementById(cID2).innerHTML = small.toFixed(4)
            }
        }
        console.log(tempArray1[i])
        tempArray1[i] = small
        if (i==0) {
                large = tempArray1[i]
            }
            if (tempArray1[i]>large){
                large = tempArray1[i]
            }
    }
    tempArray1 = large
    cID5 = "t"+tableCount +"r" + (1) + "c" + (S2.length+2)
    final = document.getElementById(cID5)
    final.style = "text-align: center; vertical-align: center;"
    final.innerHTML = "h("+b+","+a+") = <br>" + tempArray1.toFixed(4)
    
    tempArray2 = new Array()
    for (i=0 ; i<S2.length ; i++){
        tempArray2.push(new Array())
        for (j=0 ; j<S1.length ; j++){
            tempArray2[i].push(distanceForm(S2[i],S1[j]))
            cID3 = "t"+tableCount +"r" + (S1.length+1) + "c" + (i+1)
            if (j==0) {
                small = tempArray2[i][j]
                document.getElementById(cID3).innerHTML = small.toFixed(4)
            }
            if (tempArray2[i][j]<small){
                small = tempArray2[i][j]
                document.getElementById(cID3).innerHTML = small.toFixed(4)
            }
        }
        tempArray2[i] = small
        if (i==0) {
                large = tempArray2[i]
            }
            if (tempArray2[i]>large){
                large = tempArray2[i]
            }
    }
    tempArray2 = large
    cID6 = "t"+tableCount +"r" + (S1.length+2) + "c" + (1)
    final = document.getElementById(cID6)
    final.style = "text-align: center; vertical-align: center;"
    final.innerHTML = "h("+a+","+b+") = " + tempArray2.toFixed(4)
    
    cID4 = "t"+tableCount +"r" + (S1.length+1) + "c" + (S2.length+1)
    final = document.getElementById(cID4)
    final.style = "background: #ffffb3; text-align: center; vertical-align: center;"
    final.rowSpan = 2
    final.colSpan = 2
    if (tempArray1 > tempArray2){
        final.innerHTML = "H(" + a + "," + b + ") = " + tempArray1.toFixed(4)
    } else {
        final.innerHTML = "H(" + a + "," + b + ") = " + tempArray2.toFixed(4)
    }

    
}



function T(S) {
    let SArr = new Array();
    for (i=0 ; i<S.length ; i++) {
        SArr.push(T1(S[i]))
        SArr.push(T2(S[i]))
        SArr.push(T3(S[i]))
    }
    return SArr
}


function setParas(){
    rotation = Math.PI/3
    e_1 = 0
    f_1 = 0
    e_2 = 1/2
    f_2 = 1/2
    e_3 = -1/2
    f_3 = -1/2
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

//~~Rounding function to work with the numbers
function strip(number) {
    let p = Math.pow(10,15)
    return (Math.round(number * p) / p).toFixed(7)
}

function distanceForm(p1,p2) {
    return Math.sqrt(Math.pow((p1[0] - p2[0]),2) + Math.pow((p1[1] - p2[1]),2))
}