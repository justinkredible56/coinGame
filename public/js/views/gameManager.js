define([
    'backbone',
    'tmpl!templates/mainMenu',
    'tmpl!templates/newGame',
    'tmpl!templates/highScores',
    'tmpl!templates/credits',
    'tmpl!templates/difficulty',
    'tmpl!templates/finish',
    'tmpl!templates/newCanvas',
    'views/animate'

], function (
    Backbone,
    mainMenuTmpl,
    newGameTmpl,
    highScoresTmpl,
    creditsTmpl,
    difficultyTmpl,
    finishTmpl,
    canvasTmpl,
    animateCanvas
) {
    return Backbone.View.extend({

        highScores: undefined,
        timeout: .5,
        score: 0,
        coins: [],
        count: 0,
        difficulty: undefined,

        //capture keyboard input
        // initialize: function () {
        //     _.bindAll(this, 'keyInput');
        //     $(document).bind('keydown', this.keyInput);
        // },

        events: {
            'click .newGame': 'newGame',
            'click .highScores': 'showHighScores',
            'click .credits': 'showCredits',
            'click .exit': 'closeWindow',
            'click .back': 'back',
            'click .startGame': 'showStart',
            'click .easy': 'setEasy',
            'click .medium': 'setMed',
            'click .hard': 'setHard',
            'click .playAgain': 'resetAndPlayAgain',
            'mousedown .coin': 'captureCoin',
            'webkitTransitionEnd .coin': 'removeCoin'
        },

        setEasy: function(){
            this.difficulty = 'easy';
            this.score = 0;
            this.$el.html(newGameTmpl(this.coins));
            $('.coin').css({
                '-webkit-transition': 'top 3s linear',
                transition: 'top 3s'
            });
        },

        setMed: function(){
            this.difficulty = 'medium';
            this.score = 0;
            this.$el.html(newGameTmpl(this.coins));
            $('.coin').css({
                '-webkit-transition': 'top 2s linear',
                transition: 'top 2s'
            });
        },

        setHard: function(){
            this.difficulty = 'hard';
            this.score = 0;
            console.log("hard");
            this.$el.html(canvasTmpl());
            animateCanvas.start();
            $('.coin').css({
                '-webkit-transition': 'top 1s linear',
                transition: 'top 1s'
            });
        },

        closeWindow: function(){
            window.open('', '_self', '');
            window.close();
        },

        showHighScores: function(){
            this.$el.html(highScoresTmpl(this.highScores));
        },

        showCredits: function(){
            this.$el.html(creditsTmpl());
        },

        newGame: function(){
            this.count = 0;
            this.score = 0;
            this.coins.length = 0;
            this.setupCoins();
            this.$el.html(difficultyTmpl());
        },

        back: function(){
            this.$el.html(mainMenuTmpl());
        },

        setupCoins: function(){
            for(var n = 0; n < 20; ++n){
                this.coins.push(Math.floor(Math.random() * 750));
            }
        },
        captureCoin: function(e){
            $(e.target).css('display', 'none');
            this.count++;
            console.log("inside captureCoin", this.count);
            this.score += 100;
            $('.scoreNum').html(this.score);
        },

        moveCoin: function(thisCoin){
            $(thisCoin).css('visibility', 'visible');
            $(thisCoin).css('top', '550px');
        },

        removeCoin: function(e){
            $(e.target).css('display', 'none');
            this.count ++;
            console.log("inside removeCoin", this.count);
            if(this.count == 20 || this.coins.length == 0){   
                    console.log("Finished");
                    $('.gameBox').html(finishTmpl(this.score));
                }
        },

        showStart: function(){
            var that = this;
            var timer = setInterval(function(){
                var thisCoin = '.coin-' + that.coins.pop();
                that.moveCoin(thisCoin);
                if(that.coins.length == 0){
                    console.log("Killing interval");
                    clearInterval(timer);
                }
            }, this.timeout * 1000);
        },

        resetAndPlayAgain: function(){
            this.score = 0;
            this.count = 0;
            this.setupCoins();
            $('.scoreNum').html(this.score);

            if(this.difficulty == 'easy')
                this.setEasy();
            if(this.difficutly == 'medium')
                this.setMed();
            if(this.difficutly == 'hard')
                this.setHard();
        },

        render: function () {
            var that = this;
            $.get('/highScores', function(data){
                that.highScores = data;
            });
            this.$el.html(mainMenuTmpl());
            return this;
        }
    });
});