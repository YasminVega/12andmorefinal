
    var soundFreqency =  [523.251,554.365,587.330,622.254,659.255,698.456,739.989,783.991,830.609,880.000,932.328,987.767];
    var colorFreqency =[1,2,3,4,5,6,7,8,9,10,11,12];

window.onload = function (){
    var scale=document.getElementById('scale');
    
    ///
    var status = 1;
    var r, g, b, rgb,wl;
    var counter = 0;
    var nowCounter = 1;
    var MAX = 1000;  //色の種類の刻み具合
    var cbHeight = 100;//カラーバーの高さ
    var cbWidth = 1000;//カラーバーの幅
    var kimenokomakasa = 10;//グラフ描画の細かさ
    var graphspeed= 20;//グラフを描くスピード（値が小さいほど速い）
    var lotationTime = 5000;//ローテーションするときの一音当たり継続時間
    var colorbar = document.getElementById('color');
    var clickedColor;
    colorbar.style.width = cbWidth +"px";
    colorbar.style.height = cbHeight + "px";
    colorbar.style.position = "relative";
    
    var clicked;

    ////音とボタンの組み合わせをランダムに設定
    
    var randoms = [2,3,5,6,9,1,10,4,7,8,12,11];//音のランダムを決める。
    /*
var min = 1, max = 12;
for(i = min; i <= max; i++){
  while(true){
    var tmp = intRandom(min, max);
    if(!randoms.includes(tmp)){
      randoms.push(tmp);
      break;
    }
  }
}
function intRandom(min, max){
  return Math.floor( Math.random() * (max - min + 1)) + min;
}
*/
    for ( var i = 1; i<13; i ++){
    document.getElementById("audio"+ i).id = "audio" + randoms[i-1];
    }
    ///

for (var i = 0; i < MAX; i++) {
  // HSLカラーを算出
   var hue = i * (360 / MAX);
   var color = "hsl(" + hue + ", 100%, 50%)";
   var between = cbWidth/MAX;
   var x =  i*between;
   var y = 0;

    // シェイプを作成
    var cDiv = "div" + i; 
    var div = document.createElement("div");
    div.id = cDiv;
    div.style.width = between +"px";
    div.style.height = cbHeight + "px";
    //div.style.borderRadius = "30%";
    div.style.backgroundColor = color;
    div.style.position = "absolute";
    div.style.left = x + "px";
    div.style.top = y + "px";
    colorbar.appendChild(div);
    
};

///////////////////////////////////////////////////////////////////




///音を出す
var sID;

var clickedS;
var soundNumber,soundFR;


scale.onclick = function(event){
 
  clickedS = event.target.id;
  soundNumber = clickedS.replace('scale',"");
  soundFR = soundFreqency[soundNumber-1]; 
  
 
  
 

   
  sID = clickedS.replace('scale',"audio");
  console.log(sID);
  document.getElementById(sID).play();
  if(document.getElementById(sID).play){
    console.log("再生");
    document.getElementById(sID).pause();
    document.getElementById(sID).currentTime =0;
    document.getElementById(sID).play();
  }
  
  
}
/////////////////////////////////////////////
colorbar.onclick = function(event){
  clicked = event.target;
  clickedColor = clicked.style.backgroundColor;
  console.log(clickedColor);
  
  rgb = clickedColor.substring(4,clickedColor.length - 1);
  rgb = rgb.split(",");
  console.log(rgb);
  r = rgb[0];
  g = rgb[1];
  b = rgb[2];
  console.log("R="+r +",G="+g+",B="+b);

    r = r / 255;
    g = g / 255;
    b = b / 255;
    
    if ( g == 0 && b == 1) {
      wl = 650 - (650 - 790) * r; 
   } else if( r == 1 && b == 0) {
      wl= 405 + (405 - 300) * g;
   } else if (r == 0 && g == 1) {
      wl = 565 - (565 - 610) * b;
   } else if (g == 1 && b == 0) {
      wl = 565 + (565 - 620) * r; 
   } else if (r == 0 && b == 1) {
      wl = 650 - (650 - 610) * g;
   } else if (r == 1 ) {
      wl = 405 - (405 - 790) * b;
    }
    

  console.log(wl);
  colorFreqency[soundNumber] = wl;
  console.log(colorFreqency);
  document.getElementById(clickedS).style.backgroundColor = clickedColor;
 
  var time = 0.0000000001;
 var lightFR=wl*1000000000000;
 var PI = Math.PI;
  var canvas = document.getElementById("graphcanvas");
   var context = canvas.getContext("2d");

   
   var WIDTH = canvas.width;
   var HEIGHT = canvas.height;
   var N = WIDTH;
   var I =0;
   context.clearRect(0,0,WIDTH,HEIGHT);
   var colorTime = new Date();
   colorTime = colorTime.getTime();
   counter  += 1;
   
   
   window.setInterval(function(){
     if(I <N){
       console.log(nowCounter,counter);
       
       if(nowCounter < counter){
        I = 0;
        context.clearRect(0,0,WIDTH,HEIGHT);
        context.moveTo(0, 0);
        context.stroke();
        nowCounter = counter;
        console.log("transition");
      }
      else if(nowCounter  == counter){
        
      context.clearRect(0,0,WIDTH,HEIGHT);
      context.strokeStyle = clickedColor;
      context.lineWidth = 2;
      var SLx = 0;
      var SLy = 0;
      context.beginPath();
       I += kimenokomakasa;
    for ( var n=0; n<I; n++) {   
      var SLx = n;
      var SLy = HEIGHT/2- 2*Math.sin((((soundFR*PI*2*n*time/WIDTH+lightFR*PI*2*n*time/WIDTH)*2*PI)/2))*HEIGHT/2*Math.cos((((lightFR*PI*2*n*time/WIDTH-soundFR*PI*2*n*time/WIDTH)*2*PI)/2));
      if (n == 0) {
        context.moveTo(SLx, SLy);
        } else {
        context.lineTo(SLx, SLy);
      }}
      console.log(SLx,SLy);
    context.stroke();  
    nowCounter = counter;
  }}
},graphspeed);
    
  

}
  

document.getElementById("infoC").addEventListener('click', function(){
  var i = 0;
  status =  status * -1;
  

  var nowSound,nowColor,lastSound,lastColor;
  var lotation = window.setInterval(function(){
    

    nowSound = i + 1;
    nowColor = i +1;
    if( i == 0){
      lastSound = 12;
    }
    else{
      lastSound = i;
    }
    nowSound = "audio" + nowSound;
    nowColor = "scale" + nowColor;
    lastSound ="audio" + lastSound;
    console.log(nowSound);
    nowSound = document.getElementById(nowSound);
    nowColor = document.getElementById(nowColor);
    lastSound = document.getElementById(lastSound);
    var nowSoundFR = soundFreqency[i];//
    var time = 0.0000000001;
    var lightFR=colorFreqency[i]*1000000000000;
    var PI = Math.PI;
    var canvas = document.getElementById("graphcanvas");
    var context = canvas.getContext("2d");
    
    
    console.log(lastSound);
    if(lastSound.play){
      lastSound.pause();
      lastSound.currentTime = 0;
      nowSound.play();
    } else{
      nowSound.play();

    }

      /////////////////
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
      var N = WIDTH;
      var I =0;
      context.clearRect(0,0,WIDTH,HEIGHT);
      counter  += 1;
      
      
      window.setInterval(function(){
        if(I <N){
          console.log(nowCounter,counter);
          if(nowCounter < counter){
           I = 0;
           SLy = 0;
           context.moveTo(0, 0);
           context.stroke();
           nowCounter = counter;
         }
         else if(nowCounter  == counter){
         context.clearRect(0,0,WIDTH,HEIGHT);
         context.strokeStyle = nowColor.style.backgroundColor;
         context.lineWidth = 2;
         var SLx = 0;
         var SLy = 0;
         context.beginPath();
          I += kimenokomakasa;
          console.log(I);
       for ( var n=0; n<I; n++) {   
         var SLx = n;
         var SLy = HEIGHT/2- 2*Math.sin((((nowSoundFR*PI*2*n*time/WIDTH+lightFR*PI*2*n*time/WIDTH)*2*PI)/2))*HEIGHT/2*Math.cos((((lightFR*PI*2*n*time/WIDTH-nowSoundFR*PI*2*n*time/WIDTH)*2*PI)/2));
         if (n == 0) {
           context.moveTo(SLx, SLy);
           } else {
           context.lineTo(SLx, SLy);
         }}
       context.stroke();  
       nowCounter = counter;
     }}
   },graphspeed);
     ///////////////////////////
    if(i <11){
      i += 1;
    }
    else if( i >=11){
      i = 0;
    } 

    if(status >0) {
      window.clearInterval(lotation) ;
     }
  }, 
  lotationTime);
  });
  }
  
