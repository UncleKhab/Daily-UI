function d(selector){
    return document.querySelector(selector);
}
function da(selector){
    return document.querySelectorAll(selector);
}

function slider_play(){
    d(".btn-slider").style.animationPlayState = 'running'
}
da(".btn-sign").forEach(element => {
    element.addEventListener('click', (e) => {
        slider_play();
        let s = d(".btn-sign-in").getAttribute("data-switch")
        if(s === "sign-in"){
            d(".btn-sign-up").classList.add("active")
            d(".btn-sign-in").classList.remove("active")
            d(".btn-sign-in").setAttribute("data-switch", "sign-up")
            d(".log-in").style.animationPlayState = 'running'
        } 
        if(s === "sign-up"){
            d(".btn-sign-in").classList.add("active")
            d(".btn-sign-up").classList.remove("active")
            d(".btn-sign-in").setAttribute("data-switch", "sign-in")
            d(".register").style.animationPlayState = 'running'

        } 
        console.log(s);
        setTimeout(function(){
            d(".btn-slider").style.animationPlayState = 'paused'
            d(".register").style.animationPlayState = 'paused'
            d(".log-in").style.animationPlayState = 'paused'
            if (s === "sign-up"){
                d(".register").style.display = "none"
                d(".log-in").style.display = "block"
            }
            else{
                d(".log-in").style.display = "none"
                d(".register").style.display = "block"
            }
        },1500)
    })
})
