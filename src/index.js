import * as serviceWorker from './serviceWorker';
import './index.css'
serviceWorker.unregister();

/*设置画板宽高*/
var board=document.getElementById('xxx');
var context=board.getContext('2d');
var lineWidth=5

autoSetCanvasSize(board)
listenToMouse(board)

/*******/
let pen=document.getElementById('pen');
let eraser=document.getElementById('eraser');
let red=document.getElementById('red');
let green=document.getElementById('green');
let blue=document.getElementById('blue');
let clear=document.getElementById('clear');
let download=document.getElementById('download');
let thin=document.getElementById('thin');
let thick =document.getElementById('thick');

var eraserEnabled=false

//绑定事件
pen.onclick=function(){
    eraserEnabled=false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick=function(){
    eraserEnabled=true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
red.onclick=function(){
    context.strokeStyle='red'
    context.fillStyle='red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick=function(){
    context.strokeStyle='green'
    context.fillStyle='green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick=function(){
    context.strokeStyle='blue'
    context.fillStyle='blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
}
clear.onclick=function(){
    context.clearRect(0,0,board.width,board.height);
}
download.onclick=function(){
    var url = board.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='我的画'
    a.target='_blank'
    a.click()
}
thin.onclick=function(){
    lineWidth=5;
}
thick.onclick=function(){
    lineWidth=10;
}

/*******/
function listenToMouse(canvas){     
    var lastPoint={x:undefined,y:undefined}
    var using=false
    //特性检测
    if(document.body.ontouchstart!==undefined){
        canvas.ontouchstart=function(aaa){
            var x=aaa.touches[0].clientX;//相对于视口位置！！！
            var y=aaa.touches[0].clientY;
            using=true
            if(eraserEnabled){   
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint={'x':x,'y':y}
            }    
        }
        canvas.ontouchmove=function(aaa){
           var x=aaa.touches[0].clientX;//相对于视口位置！！！
           var y=aaa.touches[0].clientY;
           if(!using){return}
               if(eraserEnabled){
                   context.clearRect(x-5,y-5,10,10)
               }else{ 
                   var newPoint={'x':x,'y':y}
                  // drawCircle(x,y,1)
                   drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                   lastPoint=newPoint;
               }    
        }
        canvas.ontouchend=function(aaa){
          //console.log('松')
          using=false;
        }
    }else{
        canvas.onmousedown=function(aaa){
            var x=aaa.clientX;//相对于视口位置！！！
            var y=aaa.clientY;
            using=true
            if(eraserEnabled){   
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint={'x':x,'y':y}
                // console.log(lastPoint)
                // drawCircle(x,y,1)
            }    
       }
       canvas.onmousemove=function(aaa){    
           var x=aaa.clientX;//相对于视口位置！！！
           var y=aaa.clientY;
           if(!using){return}
               if(eraserEnabled){
                   context.clearRect(x-5,y-5,10,10)
               }else{ 
                   var newPoint={'x':x,'y':y}
                  // drawCircle(x,y,1)
                   drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                   lastPoint=newPoint;
               }           
       }
       canvas.onmouseup=function(aaa){ using=false;}   
    }              
}        
// function drawCircle(x,y,radius){
//     context.beginPath();
//     context.arc(x,y,radius,0,Math.PI*2)
//     //context.stroke()
//     //context.fillStyle='black';
//     context.fill()
// }
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);//起点
    context.lineWidth=lineWidth
    context.lineTo(x2,y2);//终点
    //context.strokeStyle='black'
    context.stroke();
    context.closePath();
}  
function autoSetCanvasSize(canvas){
     //设置canvas宽高 
     pageWidthHeight(); 
     window.onresize=function(){pageWidthHeight();}
     function pageWidthHeight(){
         var pageWidth=document.documentElement.clientWidth;
         var pageHeight=document.documentElement.clientHeight;
         canvas.width=pageWidth;
         canvas.height=pageHeight;
     }
     // //描边 
     // context.strokeStyle='yellow';
     // context.strokeRect(10,10,100,100);//rectangle
     // //填充
     // context.fillStyle='blue';
     // context.fillRect(10,10,100,100);//rectangle
     // //橡皮擦
     // //context.clearRect(50,50,10,10);

     // context.fillStyle='red';
     // context.beginPath();
     // context.moveTo(240,240)
     // context.lineTo(300,240)
     // context.lineTo(300,300)
     // context.fill()
     // context.closePath() 
}
