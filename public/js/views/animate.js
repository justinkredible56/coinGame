define([], function(){


function start(){
    var canvas = $('.gameCanvas');
    var context = canvas[0].getContext('2d');

    // canvas object function goes like this (xpos, ypos, width, height);

    //var rect = context.fillRect(50, 50, 100, 50);
    var myRectangle = {
        x: 250,
        y: 250,
        width: 100,
        height: 50,
        color: '#ff0000'
    };

    var time = new Date().getTime();
    animateX(myRectangle, context);
    //Draw(myRectangle, context);


};

function drawMe(thisObject, context){
    context.beginPath();
    context.rect(thisObject.x, thisObject.y, thisObject.width, thisObject.height);
    context.fillStyle = thisObject.color;
    context.fill();
};

function animateY(thisObject, context, flag, time ){


};

function animateX(thisObject, context){
    
    window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();


        // var now = new Date().getTime();
        // var elapsedTime = now - time;

    }
};

return{
    start: start
}


});

      // function animate(lastTime, myRectangle, runAnimation, canvas, context) {
      //   if(runAnimation.value) {
      //     // update
      //     var time = (new Date()).getTime();
      //     var timeDiff = time - lastTime;

      //     // pixels / second
      //     var linearSpeed = 100;
      //     var linearDistEachFrame = linearSpeed * timeDiff / 1000;
      //     var currentX = myRectangle.x;

      //     if(currentX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
      //       var newX = currentX + linearDistEachFrame;
      //       myRectangle.x = newX;
      //     }

      //     // clear
      //     context.clearRect(0, 0, canvas.width, canvas.height);

      //     // draw
      //     drawRect(myRectangle, context);

      //     // request new frame
      //     requestAnimFrame(function() {
      //       animate(time, myRectangle, runAnimation, canvas, context);
      //     });
      //   }
      // }