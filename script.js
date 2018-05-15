

(function () {

    var doc = document,
        ball = doc.querySelector('.ball'),
        playground = doc.querySelector('.playground'),
        counterX = 0,
        moveRight = true,
        counterY = 0,
        moveDown = true,
        player1 = doc.querySelector('.player1'),
        player2 = doc.querySelector('.player2');


    function returnPosition(){
      player1.style.top = 0;
      player1.style.left = 0;

      player2.style.top = playground.offsetHeight - player2.offsetHeight + 'px';

      counterY = playground.offsetHeight / 2;
      counterX = playground.offsetWidth / 2;

      ball.style.top = playground.offsetHeight / 2 + 'px';
      ball.style.left = playground.offsetWidth / 2 + 'px';


    }

    returnPosition();







    function ballMove() {

       if(moveRight){
           counterX++;
       }
       else{
           counterX--;
       }

       if(counterX === playground.offsetWidth - ball.offsetWidth - 2){
           moveRight = false;
       }


       else if(counterX === 0){
           moveRight = true;
       }


       if(moveDown){
           counterY++;
       }
       else{
           counterY--;
       }

       if(counterY === playground.offsetHeight - ball.offsetHeight - 2){
           moveDown = false;
       }
       else if(counterY === 0){
           moveDown = true;
       }

       if(counterX === player2.offsetLeft - ball.offsetWidth
       && (topBall >= player2.offsetTop && topBall <= player2.offsetTop + player2.offsetHeight)){
           moveRight = !moveRight;
       }


       else if(counterX === player1.offsetLeft + player1.offsetWidth
       && (topBall >= player1.offsetTop && topBall <= player1.offsetTop + player1.offsetHeight)){
           moveRight = !moveRight;
       }

       ball.style.left = counterX + 'px';
       ball.style.top = counterY + 'px';
    }

    


    function platformUp(platform){

        var y = platform.offsetTop;

        if(y - 1 < 0){
            return;
        }

        for(var i = 0; i < 10; i++){
          if(platform.offsetTop <= 0){
            break;
          }
          platform.style.top = (y - i + 'px');
        }
    }

    


    function platformDown(platform){
        var y = platform.offsetTop;

        if(y + 1 + platform.offsetHeight >= playground.offsetHeight - 2){
            return
        }

        for(var i = 0; i < 10; i++){
          if(platform.offsetTop + platform.offsetHeight >= playground.offsetHeight - 2){
            break;
          }
          platform.style.top = (y + i + 'px');
        }

       

    }


    document.addEventListener('keydown', function (event) {
        console.log(event.key);
        if(event.key === 'ArrowUp'){
            platformUp(player2);
        }
        else if(event.key === "ArrowDown"){

            
            platformDown(player2);
        }
        else if(event.key === 'w' || event.key === 'W'){
            platformUp(player1);
        }
        else if(event.key === 'S' || event.key === 's'){
            platformDown(player1);
        }
    });



    document.addEventListener('mousemove', function(event){

      console.log(event);
      console.log(player1.getBoundingClientRect());

      if(event.clientY > player1.getBoundingClientRect().top + (player1.offsetHeight / 2)){
        platformDown(player1);
      }
      else if(event.clientY < player1.getBoundingClientRect().top + (player1.offsetHeight / 2)){
        platformUp(player1);
      }
    });


    document.addEventListener('keydown', function(event){

      if(event.key === ' '){
        setInterval(ballMove, 10);
      }

    });





})();