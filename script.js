// select the canvas
var convas = document.getElementById("my-convas");
var contextArea= convas.getContext("2d");

// draw Rectangle function
function drawRect(x, y , w , h , color){
  contextArea.fillStyle=color;
  contextArea.fillRect(x,y,w,h);
}



// make obj of computer paddel
  const com={
    x: convas.width/2 - 50/2,
    y:10,
    width: 80,
    hight: 20,
    color: "white",
    score: 0
  }
  

  // make object of  user paddle
  const user={
    x: convas.clientWidth/2 - 50/2,
    y: convas.clientHeight -30,
    width: 80,
    hight: 20,
    color: "white",
    score: 0
  } 
  
 

  function drawMidLine(){
    contextArea.beginPath();
    contextArea.setLineDash([10]);
    contextArea.moveTo(0, convas.clientHeight/2);
    contextArea.lineTo(convas.clientWidth, convas.clientHeight/2);
    contextArea.strokStyle="lightgrey";
    contextArea.stroke();
  }

  

  // draw circal 
  function drawCircal(x,y,r, color){
    contextArea.fillStyle=color;
    contextArea.beginPath();
    contextArea.arc(x, y, r, 0, 2 * Math.PI);
    contextArea.closePath();
    contextArea.fill();
    // contextArea.stroke();

  }

  // make obj for  ball
   const ball={
    x: convas.clientWidth/2,
    y: convas.clientHeight/2,
    redius: 15, 
    speed: 1,
    VelocityX:5,
    VelocityY:5,
    color:"red"
   }



   function drawScorePoint( text, x, y , color){
    contextArea.fillStyle=color;
    contextArea.font = "35px Arial";
    contextArea.fillText(text,x, y, color);


   }
  

   // rendaer the game 
   function render(){
      
    // make canvas
      drawRect(0 ,0, 900, 500, "#232323");
      
      // computer  paddle 
      drawRect(com.x, com.y, com.width, com.hight, com.color);
      
      // user paddel 
      drawRect(user.x, user.y, user.width, user.hight, user.color);
     
     // draw the center line 
      drawMidLine();
      
      //  creat ball
       drawCircal(ball.x, ball.y, ball.redius,ball.color );

       //  computer score 
        drawScorePoint(com.score,30, convas.clientHeight/2-30,);

        // user score 
        drawScorePoint(user.score, 30, convas.clientHeight/2 +50);
   }

    // control the user paddle 
    convas.addEventListener("mousemove", paddleMove);
    
    function paddleMove(e){
      let rect = convas.getBoundingClientRect();
      user.x = e.clientX - rect.left - user.width/2;
    }
    
    // colliding detection
    function collision(b, p){ // b= ball and p = paddle 
      b.top = b.y - b.redius*2;
      b.bottom = b.y + b.redius*2;
      b.left = b.x - b.redius*2;
      b.right = b.x + b.redius*2;

      p.top = p.y;
      p.bottom = p.y + p.hight;
      p.left = p.x;
      p.right = p.x + p.width;

      return p.right > b.left && p.left < b.right && b.bottom > p.top && p.bottom > b.top;

    }


    // reset the position of ball
    function reset(){
      ball.x = convas.clientWidth/2
      ball.y = convas.clientHeight/2
      ball.speed = 1;
      ball.VelocityY = -ball.VelocityY;
    }

    // game over function 
    function showGameOver(){
      // hide the canvas
      convas.style.display= "none";
      const container = document.getElementById("container");
      container.style.display="none";
      // show the game over display

      const gameOver= document.getElementById("result");
      gameOver.style.display="block";

    }

   // update 
   function update(){

        ball.y += ball.VelocityY * ball.speed;
        ball.x += ball.VelocityX * ball.speed;

        // reflact the wall 
        if(ball.x + ball.redius > convas.clientWidth || ball.x-ball.redius < 0){
          ball.VelocityX = - ball.VelocityX;
        }

        // control the computer paddal
        let computerLevel = 0.1;
        com.x += (ball.x - (com.x + com.width)) + computerLevel;

        if(ball.speed > 2){
          com.x += ball.x + 100;
        }
        // if collide are happen 
        let player = (ball.y < convas.clientHeight/2) ? com : user;
        if(collision(ball, player)){
          ball.VelocityY = - ball.VelocityY;
          ball.speed += 0.1;
        }

        // pont score 
        if( ball.y - ball.redius < 0 ){
          user.score++;
          reset();
        }else if( ball.y + ball.redius > convas.clientHeight){
          com.score++;
          reset();
        }


        // game Over 
        if(user.score > 4 || com.score > 4){
          clearInterval(loop);
          showGameOver();
        }
      

   }

   // start the game 
   function start(){
    render();
    update();
   }

   const loop = setInterval(start, 20);