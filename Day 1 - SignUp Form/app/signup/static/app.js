advice_number = d(".advice-number")
advice_uppercase = d(".advice-uppercase")
advice_special = d(".advice-special")
advice_strength = d(".advice-strength")
specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
upperCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
slidebar_pointer = d(".slidebar-pointer")

function slidebar_property(left, border, text, color){
        slidebar_pointer.style.left = left;
        slidebar_pointer.style.borderTop = border;
        advice_strength.innerText = text;
        advice_strength.style.color = color;
}
function showpass() {
    pass = d("#password")
    conf = d("#confirmation")
    if(pass.type === "password"){
        pass.type = "text";
        conf.type = "text";
        
    }
    else
    {
        pass.type = "password";
        conf.type = "password";
        
    }
}
function d(selector){
    return document.querySelector(selector);
}
function da(selector){
    return document.querySelectorAll(selector);
}

function slider_play(){
    d(".btn-slider").style.animationPlayState = 'running'
}

function check_special(str){
    for(i = 0; i < specialChars.length;i++){
        if(str.indexOf(specialChars[i]) > -1){
            advice_special.style.color = "Green"
            return 1;
        }
    }
    advice_special.style.color = "Black"
    return 0;
}

function check_uppercase(str){
    for(i = 0; i < upperCase.length;i++){
        if(str.indexOf(upperCase[i]) > -1){
            advice_uppercase.style.color = "Green"
            return 1;
        }
    }
    advice_uppercase.style.color = "Black"
    return 0;
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

d("#password").addEventListener("keyup", function(){
    pass = d("#password").value;
    has_number = /\d/.test(pass);
    special = check_special(pass);
    upper = check_uppercase(pass);
    pass_length = pass.length;
    
    if(has_number === true){
        advice_number.style.color = "Green"
        number_index = 1;
    }else{
        advice_number.style.color = "Black"
        number_index = 0;
    }
    
    if(pass_length > 10){
        pass_index = 1;
    }else{
        pass_index = 0;
    }

    strength = special + upper + pass_index + number_index;
    console.log(strength);
    switch(strength){
        case 1:
            slidebar_property('25%', '10px solid #f27a33', "Your Password strength is weak, we suggest to make it stronger", "red")
            break;
        case 2:
            slidebar_property('50%', '10px solid #d98c00', "Your Password strength is medium, we suggest to make it stronger", "#d98c00")
            break;
        case 3:
            slidebar_property('75%', '10px solid #7cbe1a', "Your Password strength is high", "Green")
            break;
        case 4:
            slidebar_property('97%', '10px solid #44820b', "Your Password strength is high", "Green")
            break;
        default:
            slidebar_property('-2%', '10px solid #f00', "Your Password strength is weak, we suggest to make it stronger", "red")
         

    }
})