let pitchInput = document.getElementById("pitchRange");
let pitchValue = document.getElementById("pitchRangeValue");
let speedInput = document.getElementById("speedRange");
let speedValue = document.getElementById("speedRangeValue");


if (localStorage.getItem('pitch')){
    pitchInput.value = localStorage.getItem('pitch')
}else {
    pitchInput.value = 1000;
}

localStorage.setItem('pitch',`${pitchInput.value}`)
pitchValue.innerText = pitchInput.value;

if (localStorage.getItem('WPM')){
    speedInput.value = localStorage.getItem('WPM')
}else {
    speedInput.value = 15;
}

localStorage.setItem('WPM',`${speedInput.value}`)
speedValue.innerText = speedInput.value;


pitchInput.addEventListener("input",function(){
    pitchValue.innerText = pitchInput.value;
    localStorage.setItem('pitch',`${pitchInput.value}`);
    try{ pitch = localStorage.getItem('pitch')} catch(e){};
        
});
speedInput.addEventListener("input",function(){
    speedValue.innerText = speedInput.value;
    localStorage.setItem('WPM',`${speedInput.value}`);
    try{ WPM = localStorage.getItem('WPM');
        baseDotDuration = (60 * 1000) / (WPM * 50);}
        catch(e){};
});
document.getElementById('cog').addEventListener('click', function showSetting(){
    if (document.getElementById('settingMenu').className == 'settingMenu'){
        document.getElementById('settingMenu').classList.add('visibleMenu');
    }else if (document.getElementById('settingMenu').className == 'settingMenu visibleMenu'){
        document.getElementById('settingMenu').classList.remove('visibleMenu');
    }
})