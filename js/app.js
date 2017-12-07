$(document).ready(function() {
    var $unicorn = $('#unicorn');
    var $brownHorse = $('#brownHorse');

    var audiolaughingHorse = new Audio('media/Angry-laughingHorse.mp3');
    audiolaughingHorse.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    }, false);
    audiolaughingHorse.play();

    //toggle button turns laughingHorse sound on/off
    $('#audio').click(function() {
        if (audiolaughingHorse.paused == false) {
            audiolaughingHorse.pause();
        } else {
            audiolaughingHorse.play();
            }
        });

    //click the 'catch it' button to start the game
    $('#go').click(function() {

        var laughingHorseWidth = $('#laughingHorse').width();
        var trackWidth = $(document).width() - laughingHorseWidth;

        $('#go').removeClass('infinite');
        $('img').removeClass('rollIn');
        $('#laughingHorse').addClass('infinite bounce');
        $('#laughingHorse').animate({left: trackWidth}, 4000);

        $(document).keydown(function(key) {

            //check for winner
            var positionOne = $($unicorn).position();
            var positionTwo = $($brownHorse).position();
      // PLAYER 2 (UNICORN) WIN EFFECTS: WITH TROPHY DISPLAY
            if (positionOne.left + $($unicorn).width() >= trackWidth) {
                $(document).off('keydown');
                $('#container').append('<img id="trophy"   src="https://media.giphy.com/media/9cq3D4eqEKHx6/giphy.gif"></img>');
                $('h1').text('Congratulations 🏆Player 2!!!🥇');
                var audio = new Audio('media/burp.wav');
                audio.play();
                $('#reset').addClass('animated infinite pulse');
                return;
            }
      // PLAYER 1 (BROWN HORSE) WIN EFFECTS: WITH TROPHY DISPLAY
            if (positionTwo.left + $($brownHorse).width() >= trackWidth) {
                $(document).off('keydown');
                $('#container').append('<img id="trophy" src="https://media.giphy.com/media/9cq3D4eqEKHx6/giphy.gif"></img>');
                $('h1').text('Congratulations 🏆Player 1!!!🥇');
                var audio = new Audio('media/laugh.mp3');
                audio.play();
                $('#reset').addClass('animated infinite pulse');
                return;
            }

            switch(key.which) {
                case 65: // PRESS A TO MAKE PLAYER 2 GO FORWARD
                    $unicorn.css('left', positionOne.left + 40 + 'px');
                    break;
                case 76: // PRESS L TO MAKE PLAYER 1 GO FORWARD
                    $brownHorse.css('left', positionTwo.left + 40 + 'px');
                    break;
            }
        });

        //press reset button to reset the game
        $('#reset').click(reset);
    });
});

function reset() {
    //don't allow reset button to be clicked until laughingHorse animation is done
    if ($('#laughingHorse').is(':animated')) {
      return false;
    }

    $('.player').css('left', 0);
    $('#laughingHorse').css('left', '200px');
    $('#trophy').remove();
    $('h1').text("Adam's Horse Race Game");
    $('#go').addClass('infinite');
    $('img').removeClass('rollIn');
    $('h1').removeClass('slideInLeft');
    //to restart css animation - https://css-tricks.com/restart-css-animation/
    $('.reset-animation').each(function() {
        void this.offsetWidth;
    });
    $('img').addClass('rollIn');
    $('h1').addClass('slideInLeft');
    $('#laughingHorse').removeClass('infinite bounce');
    $('#reset').removeClass('animated infinite pulse');
}
