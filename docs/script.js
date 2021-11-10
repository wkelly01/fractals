var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");



function T1(point) {
    point[0] = 0.5 * point[0];
    point[1] = 0.5 * point[1];
}
function T2(point) {
    point[0] = (0.5 * point[0]) + (0.5 * point[2]);
    point[1] = 0.5 * point[1];
}
function T3(point) {
    point[0] = (0.5 * point[0]) + (0.25 * point[2]);
    point[1] = (0.5 * point[1]) + (0.5 * point[2]);
}

function myFunction() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let val1Input = Number(document.getElementById("val1Input").value);
    let val2Input = Number(document.getElementById("val2Input").value);
    let val3Input = Number(document.getElementById("val3Input").value);
    for (j=0 ; j<50000 ; j++) {
        point = [0.5 * canvasWidth, 0.5 * canvasWidth, canvasWidth]
        for (i=0 ; i<=2000 ; i++) {
            let x = Math.random()
            switch (true) {
                case x < ((val1Input)/(val1Input + val2Input + val3Input)):
                    T1(point);
                    break;
                case x < ((val1Input + val2Input)/(val1Input + val2Input + val3Input)):
                    T2(point);
                    break;
                case x < 1:
                    T3(point);
                    break;
            }
        }
        ctx.beginPath();
        ctx.arc(point[0], point[1], 0.1, 0, 2 * Math.PI);
        ctx.stroke();

    }
}
