let canvas = document.getElementById('canvas');
let color = document.getElementById('myColor');
let width = document.getElementById('width');
let cxt = canvas.getContext('2d');
let down = false;
let id =null;
let PreviousX = 0;
let PreviousY = 0;
let CircleIsClick = false;
let toCheckStartAnimation = false;
let AnimationX = new Array();
let AnimationY = new Array();
let AnimationDownX = new Array();
let AnimationDownY = new Array();
let widthforCircle;
cxt.lineWidth = 4;
canvas.onmousedown = function(e){
  down = true;
  PreviousX = e.clientX;
  PreviousY = e.clientY;
 id = requestAnimationFrame(draw);
};
canvas.onmouseup = function(){
  down = false;
};
// thisfunction make user settings apply
function toApply(){
  cxt.strokeStyle = color.value;
  if(width.value>=1&&width.value<=15){
    cxt.lineWidth = width.value;
    CircleIsClick = false;
  }else{
    alert("Please Enter less then 15 or 15!")
    cxt.lineWidth = 4;
    CircleIsClick = false;
  }
}
// this method start drawing
function draw(){
  if(down){
   canvas.onmousemove = toDraw;
  id= requestAnimationFrame(draw);
}else{
  down = false;
  canvas.onmousemove = null;
  cancelAnimationFrame(id);
}
}
// this method draw in canvas
function toDraw(e){
  if(!CircleIsClick){
  cxt.beginPath();
  cxt.moveTo(PreviousX-50, PreviousY);
  cxt.lineTo(e.clientX-50,e.clientY);
  cxt.stroke();
  PreviousX = e.clientX;
  PreviousY = e.clientY;
}else{
  cxt.beginPath();
  cxt.arc(e.clientX-50,e.clientY, widthforCircle , 0, 2 * Math.PI);
  cxt.strokeStyle = color.value;
  cxt.stroke();
}
if(toCheckStartAnimation){
 if(down){
  AnimationX.push(e.clientX);
  AnimationY.push(e.clientY);}
  if(!down){
  AnimationDownX.push(e.clientX);
  AnimationDownY.push(e.clientY);}
}
}
// so i want to do taht when mouse button is down i want to measer the mouse movement the i want to get corrent postion of moune
// so now i want to know that to same
// this method is use to clear all 
function toClean(){
  cxt.clearRect(0,0, canvas.width, canvas.height);
}

// this function Erase 
function toErase(){
  CircleIsClick = false;
  cxt.strokeStyle = "#FFFFFF";
  if(document.getElementById("widthForErase").value>1){
    cxt.lineWidth = document.getElementById("widthForErase").value;
  }
}

// this code is written to make a line style circle style
function toMakeCircle(){
  let ThicknessforCircle =document.getElementById("ThicknessForCircle").value;
  widthforCircle  =document.getElementById("widthForCircle").value;
  if(widthforCircle>1&&ThicknessforCircle>1){
    cxt.lineWidth = ThicknessforCircle;
  CircleIsClick = true;
}
}
// this method is use to start animation 

function startAnimation(){
  AnimationDownX= [];
  AnimationDownY= [];
  AnimationX= [];
  AnimationY= [];
  toCheckStartAnimation = true;
}
// this method is use to stop animation
function stopAnimation(){
  toCheckStartAnimation = false;
}
// this method replay animation 
let i =0;
function playAnimation(){
  toClean();
if(AnimationX.length>1){
setInterval(function(){
  if(!AnimationDownX.includes(AnimationX[i])&&!AnimationDownY.includes(AnimationY[i])){
  cxt.beginPath();
  cxt.moveTo(AnimationX[i],AnimationY[i]);
  cxt.lineTo(AnimationX[i+1],AnimationY[i+1]);
  cxt.stroke();
}else{
  console.log("happened Bro !")
}
  i= i+1;
},30);
}else{
  alert("please Record Animation first!")
}
}

/// so i am here to do something really intresting 
// i am not here to wast em y timeso 
// i want when button is pressed i will recored all his