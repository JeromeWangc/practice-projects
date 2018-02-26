function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof windows.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function(){
            oldonload();
            func();
        }
    }
}