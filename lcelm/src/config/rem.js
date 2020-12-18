(function(){
    function resize(){
        var baseFontSize = 100; //设计稿100px相当于1rem,750px -->7.5rem--->各种屏幕的100%的宽度。1000px
        var designWidth = 750;//设计稿宽度
        var width = window.innerWidth;//屏幕宽度
        var currentFontSize = (width/designWidth)* baseFontSize;
        document.querySelector('html').style.fontSize = currentFontSize +'px';
    }
    
    window.onresize = function(){
        resize()
    }

    document.addEventListener('DOMContentLoaded',resize)

}())