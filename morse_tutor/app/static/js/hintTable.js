let hintIsActive = false
document.addEventListener('keydown', function (event){
    if ((event.key == '`' || event.key == '~'|| event.key == 'ё') && !hintIsActive ){
        document.getElementById('hintTable').style.display = 'block'
        hintIsActive = true
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key == '`' || event.key == '~'|| event.key == 'ё') {
        document.getElementById('hintTable').style.display = 'none';
        hintIsActive = false
    }
})
