

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


       var topBall = counterY,
           bottomBall = counterY + ball.offsetHeight;

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

    setInterval(ballMove, 10);


    function platformUp(platform){

        var y = platform.offsetTop;

        if(y - 1 < 0){
            return;
        }

        platform.style.top = (y - 1 + 'px');
    }


    function platformDown(platform){
        var y = platform.offsetTop;

        if(y + 1 + platform.offsetHeight > playground.offsetHeight - 2){
            return
        }

        platform.style.top = (y + 1 + 'px');

    }


    document.addEventListener('keydown', function (event) {
        console.log(event.key);
        if(event.key === 'ArrowUp'){
            platformUp(player1);
        }
        else if(event.key === "ArrowDown"){
            platformDown(player1);
        }
        else if(event.key === 'w' || event.key === 'W'){
            platformUp(player2);
        }
        else if(event.key === 'S' || event.key === 's'){
            platformDown(player2);
        }
    });





})();