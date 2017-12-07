$(document).ready(function() {
    var $unicorn = $('#unicorn');
    var $brownHorse = $('#brownHorse');


    // var audiocarrot = new Audio('#');
    // audiocarrot.addEventListener('ended', function() {
    // this.currentTime = 0;
    // this.play();
    // }, false);
    // audiocarrot.play();

    // //toggle button turns *CARROT* sound on/off
    // $('#audio').click(function() {
    //     if (audiocarrot.paused == false) {
    //         audiocarrot.pause();
    //     } else {
    //         audiocarrot.play();
    //         }
    //     });

    //click the 'catch it' button to start the game
    $('#go').click(function() {

        var carrotWidth = $('#carrot').width();
        var trackWidth = $(document).width() - carrotWidth;

        $('#go').removeClass('infinite');
        $('img').removeClass('rollIn');
        $('#carrot').addClass('infinite bounce');
        $('#carrot').animate({left: trackWidth}, 4000);

        $(document).keydown(function(key) {

            //check for winner
            var positionOne = $($unicorn).position();
            var positionTwo = $($brownHorse).position();
      // PLAYER 2 (UNICORN) WIN EFFECTS: WITH TROPHY DISPLAY
            if (positionOne.left + $($unicorn).width() >= trackWidth) {
                $(document).off('keydown');
                $('#container').append('<img id="trophy"   src="http://www.freepngimg.com/download/trophy/6-2-trophy-free-download-png.png"></img>');
                $('h1').text('Congratulations 🏆Player 2!!!🥇');
                var audio = new Audio('#');
                audio.play();
                $('#reset').addClass('animated infinite pulse');
                return;
            }
      // PLAYER 1 (BROWN HORSE) WIN EFFECTS: WITH TROPHY DISPLAY
            if (positionTwo.left + $($brownHorse).width() >= trackWidth) {
                $(document).off('keydown');
                $('#container').append('<img id="trophy" src="http://www.freepngimg.com/download/trophy/6-2-trophy-free-download-png.png"></img>');
                $('h1').text('Congratulations 🏆Player 1!!!🥇');
                var audio = new Audio('#');
                audio.play();
                $('#reset').addClass('animated infinite pulse');
                return;
            }

            switch(key.which) {
                case 65: // PRESS A TO MAKE PLAYER 2 GO FORWARD
                    $unicorn.css('left', positionOne.left + 44 + 'px');
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
    //don't allow reset button to be clicked until carrot animation is done
    if ($('#carrot').is(':animated')) {
      return false;
    }

    $('.player').css('left', 0);
    $('#carrot').css('left', '200px');
    $('#trophy').remove();
    $('h1').html("Adam's Horse Race Game!");
    $('#go').addClass('infinite');
    $('img').removeClass('rollIn');
    $('h1').removeClass('slideInLeft');
    //to restart css animation - https://css-tricks.com/restart-css-animation/
    $('.reset-animation').each(function() {
        void this.offsetWidth;
    });
    $('img').addClass('rollIn');
    $('h1').addClass('slideInLeft');
    $('#carrot').removeClass('infinite bounce');
    $('#reset').removeClass('animated infinite pulse');
}
