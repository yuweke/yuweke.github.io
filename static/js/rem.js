(function(doc, win) {
    setRem();
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            setRem();
        };
    if (!doc.addEventListener)
        return;
    win.addEventListener(resizeEvt, recalc, false);
    // doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function setRem() {
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) {
        return;
    }
    if (clientWidth<750){
        docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
    }else {
        docEl.style.fontSize = "100px";
    }
}