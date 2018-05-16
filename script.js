

(function () {

    var doc = document,
        ball = doc.querySelector('.ball'),
        playground = doc.querySelector('.playground'),
        counterX = 0,
        moveRight = true,
        counterY = 0,
        moveDown = true,
        player1 = doc.querySelector('.player1'),
        player2 = doc.querySelector('.player2'),
        speed = 0.1,
        hardLevel = 28;


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


    function bot(){


      if(moveRight && counterX <= playground.offsetWidth / 2){
        return;
      }

      var direct = Math.floor(Math.random() * 2),
          mistake = Math.floor(Math.random() * (hardLevel - 1)),
          willMistake = Math.floor(Math.random() * hardLevel / 10);


      mistake = direct === 0 ? mistake *= -1 : mistake;
      mistake *= willMistake;


      if(parseInt(ball.style.top) >= 
        parseInt(player2.style.top) + player2.offsetHeight / 2 + mistake){
        platformDown(player2, 'bot');
      }
      else if(parseInt(ball.style.top) <= 
        parseInt(player2.style.top) + player2.offsetHeight / 2 + mistake){
        platformUp(player2, 'bot');
      }

    }




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
       && (counterY >= player2.offsetTop && counterY <= player2.offsetTop + player2.offsetHeight)){
           moveRight = !moveRight;
       }


       else if(counterX === player1.offsetLeft + player1.offsetWidth
       && (counterY >= player1.offsetTop && counterY <= player1.offsetTop + player1.offsetHeight)){
           moveRight = !moveRight;
       }

       ball.style.left = counterX + 'px';
       ball.style.top = counterY + 'px';
    }

    


    function platformUp(platform, playerType){

        var y = platform.offsetTop;

        if(y - 1 < 0){
            return;
        }

        if(playerType === 'bot'){
          platform.style.top = (y - 1 + 'px');
        }

        else{
          for(var i = 0; i < 10; i++){
            if(platform.offsetTop <= 0){
              break;
            }
          platform.style.top = (y - i + 'px');
          }

        }
    }

    


    function platformDown(platform, playerType){
        var y = platform.offsetTop;


        if(y + 1 + platform.offsetHeight >= playground.offsetHeight - 2){
            return
        }

        if(playerType === 'bot'){
          platform.style.top = (y + 1 + 'px');
        }
        else{
          for(var i = 0; i < 10; i++){
            if(platform.offsetTop + platform.offsetHeight >= playground.offsetHeight - 2){
              break;
            }
          platform.style.top = (y + i + 'px');
          }
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
        setInterval(ballMove, speed);
        setInterval(bot, speed);
      }

    });


})();