let isBegan = false
let WPM = localStorage.getItem('WPM')
let pitch = localStorage.getItem('pitch')
let baseDotDuration = (60 * 1000) / (WPM * 50)
let soundIsON = false
let context = new (window.AudioContext || window.webkitAudioContext)();
let soundOn = false
let lessonNum = Number(document.getElementsByClassName('activeCell')[0].innerText);
let errors = 0
let lessonDescription = {
    1: 'Lesson #1:<br> A, I, M, N',
    2: 'Lesson #2:<br> E, G, O, T',
    3: 'Lesson #3:<br> D, H, K, S',
    4: 'Lesson #4:<br> C, U, W, V',
    5: 'Lesson #5:<br> B, J, Q, R',
    6: 'Lesson #6:<br> L, P, Z',
    7: 'Lesson #7:<br> F, X, Y',
    8: 'Lesson #8:<br> 1, 2, 3, 4, 5',
    9: 'Lesson #9:<br> 6, 7, 8, 9, 0',
}

document.getElementById('lessonDescription').innerHTML = lessonDescription[Number(document.getElementsByClassName('activeCell')[0].innerText)];

document.addEventListener('mouseover', (event)=>{
    if (event.target.className == 'lessonCell'|| event.target.className == 'lessonCell activeCell'){
        document.getElementById('lessonDescription').innerHTML = lessonDescription[Number(event.target.innerText)]
    }
})
document.addEventListener('mouseout', (event)=>{
    if (event.target.className == 'lessonCell'|| event.target.className == 'lessonCell activeCell'){
        document.getElementById('lessonDescription').innerHTML = lessonDescription[Number(document.getElementsByClassName('activeCell')[0].innerText)];
    }
})

class Sound {

    constructor(context) {
        this.context = context;
    }

    init() {
        this.oscillator = this.context.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.connect(this.context.destination);
        this.oscillator.frequency.value = pitch;
    }

    play() {
        this.init()
        this.oscillator.start()
    }

    pause() {
        this.oscillator.stop()
    }
}

function randomEl(arr){
    return arr[Math.floor(Math.random()*arr.length)] 
}

let sound = new Sound(context)

async function lessonIntro(lessonMaterial) {
    for (let sym in lessonMaterial['main_lesson_material']) {
        await new Promise(r => setTimeout(r, 7 * baseDotDuration));
        document.getElementById('letter').innerHTML = lessonMaterial['main_lesson_material'][sym]['symbol'].toUpperCase();
        document.getElementById('chant').innerHTML = lessonMaterial['main_lesson_material'][sym]['chant'];
        document.getElementById('code').innerHTML = lessonMaterial['main_lesson_material'][sym]['code'];
        document.getElementById('pressEnter').innerHTML = '<h1>Part 1: Listen and remember</h1>'
        for (let i = 0; i < 2; i++) {
            for (let char in lessonMaterial['main_lesson_material'][sym]['code']) {
                if (lessonMaterial['main_lesson_material'][sym]['code'][char] == '-') {
                    sound.play();
                    await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                    sound.pause();
                }
                else if (lessonMaterial['main_lesson_material'][sym]['code'][char] == '.' ||
                    lessonMaterial['main_lesson_material'][sym]['code'][char] == '·') {
                    sound.play();
                    await new Promise(r => setTimeout(r, baseDotDuration));
                    sound.pause();
                }
                await new Promise(r => setTimeout(r, baseDotDuration));
            }
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}


async function receiveMainMaterial(lessonMaterial) {
    for (let sym in lessonMaterial['main_lesson_material']) {
        await new Promise(r => setTimeout(r, 1000));
        document.getElementById('pressEnter').innerHTML = "<h1>Part 2: Check what you've learned</h1><p>Don't forget to switch the keyboard layout to English</p>"
        document.getElementById('letter').innerHTML = '?';
        document.getElementById('chant').innerHTML = 'press "space" to repeat';
        document.getElementById('code').innerHTML = '';
        document.getElementById('lessonWrapper').classList.remove('wrong');
        document.getElementById('lessonWrapper').classList.remove('right');

        for (let char in lessonMaterial['main_lesson_material'][sym]['code']) {
            if (lessonMaterial['main_lesson_material'][sym]['code'][char] == '-') {
                sound.play();
                await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                sound.pause();
            }
            else if (lessonMaterial['main_lesson_material'][sym]['code'][char] == '.' ||
                lessonMaterial['main_lesson_material'][sym]['code'][char] == '·') {
                sound.play();
                await new Promise(r => setTimeout(r, baseDotDuration));
                sound.pause();
            }
            await new Promise(r => setTimeout(r, baseDotDuration));
        } await new Promise(function (resolve, reject) {
            document.addEventListener('keyup', function resolvee(event) {
                if (event.key == lessonMaterial['main_lesson_material'][sym]['symbol']
                    || event.key == lessonMaterial['main_lesson_material'][sym]['symbol'].toUpperCase()) {
                    document.getElementById('letter').innerHTML = lessonMaterial['main_lesson_material'][sym]['symbol'].toUpperCase();
                    document.getElementById('chant').innerHTML = lessonMaterial['main_lesson_material'][sym]['chant'];
                    document.getElementById('code').innerHTML = lessonMaterial['main_lesson_material'][sym]['code'];
                    document.getElementById('lessonWrapper').classList.add('right')

                    resolve(document.removeEventListener('keyup', resolvee));
                } else if (event.key == ' ') {

                    async function f(lessonMaterial) {
                        soundOn = true
                        for (let char in lessonMaterial['main_lesson_material'][sym]['code']) {
                            if (lessonMaterial['main_lesson_material'][sym]['code'][char] == '-') {
                                sound.play();
                                await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                                sound.pause();
                            }
                            else if (lessonMaterial['main_lesson_material'][sym]['code'][char] == '.' ||
                                lessonMaterial['main_lesson_material'][sym]['code'][char] == '·') {
                                sound.play();
                                await new Promise(r => setTimeout(r, baseDotDuration));
                                sound.pause();
                            }
                            await new Promise(r => setTimeout(r, baseDotDuration));   
                        }
                        soundOn = false
                    }
                    if(soundOn == false){
                        f(lessonMaterial)
                    }
                } else if( event.key !='`'){
                    document.getElementById('letter').innerHTML = lessonMaterial['main_lesson_material'][sym]['symbol'].toUpperCase();
                    document.getElementById('chant').innerHTML = lessonMaterial['main_lesson_material'][sym]['chant'];
                    document.getElementById('code').innerHTML = lessonMaterial['main_lesson_material'][sym]['code'];
                    document.getElementById('lessonWrapper').classList.add('wrong')

                    resolve(document.removeEventListener('keyup', resolvee));

                }
            });
        });

    }
}

async function receiveAll(lessonMaterial) {
    errors = 0
    for (let i = 0; i<20; i++) {
        let sym = randomEl(lessonMaterial['all_lesson_material']);
        await new Promise(r => setTimeout(r, 1000));
        document.getElementById('letter').innerHTML = '?';
        document.getElementById('chant').innerHTML = 'press "space" to repeat';
        document.getElementById('code').innerHTML = '';
        document.getElementById('lessonWrapper').classList.remove('wrong');
        document.getElementById('lessonWrapper').classList.remove('right');
        document.getElementById('pressEnter').innerHTML = "<h1>Part 3: Let's repeat all together</h1>"

        for (let char in sym['code']) {
            if (sym['code'][char] == '-') {
                sound.play();
                await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                sound.pause();
            }
            else if (sym['code'][char] == '.' ||
                sym['code'][char] == '·') {
                sound.play();
                await new Promise(r => setTimeout(r, baseDotDuration));
                sound.pause();
            }
            await new Promise(r => setTimeout(r, baseDotDuration));
        } await new Promise(function (resolve, reject) {
            document.addEventListener('keyup', function resolvee(event) {
                if (event.key == sym['symbol']
                    || event.key == sym['symbol'].toUpperCase()) {
                    document.getElementById('letter').innerHTML = sym['symbol'].toUpperCase();
                    document.getElementById('chant').innerHTML = sym['chant'];
                    document.getElementById('code').innerHTML = sym['code'];
                    document.getElementById('lessonWrapper').classList.add('right')

                    resolve(document.removeEventListener('keyup', resolvee));
                } else if (event.key == ' ') {

                    async function f2(sym) {
                        soundOn = true
                        for (let char in sym['code']) {
                            if (sym['code'][char] == '-') {
                                sound.play();
                                await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                                sound.pause();
                            }
                            else if (sym['code'][char] == '.' ||
                                sym['code'][char] == '·') {
                                sound.play();
                                await new Promise(r => setTimeout(r, baseDotDuration));
                                sound.pause();
                            }
                            await new Promise(r => setTimeout(r, baseDotDuration));   
                        }
                        soundOn = false
                    }
                    if(soundOn == false){
                        f2(sym)
                    }
                } else if( event.key !='`' ) {
                    document.getElementById('letter').innerHTML = sym['symbol'].toUpperCase();
                    document.getElementById('chant').innerHTML = sym['chant'];
                    document.getElementById('code').innerHTML = sym['code'];
                    document.getElementById('lessonWrapper').classList.add('wrong')
                    errors+=1

                    resolve(document.removeEventListener('keyup', resolvee));

                }
            });
        });

    }
}
async function showLessonResult(){
    if (lessonNum > 8){
        document.getElementById('Next').style.display = 'none'
    }
    document.getElementById('lessonResultWrapper').style.display = 'block'
    document.getElementById('lessonResult').style.display = 'block'
    document.getElementById('mistakesMade').innerText = `Mistakes made: ${errors}`
    function lsnRslt(errors){
        if (errors == 0){ return 'Perfect'}
        else if (errors < 3){ return 'Good'}
        else if (errors < 5){return 'Bad'}
        else {return 'Terrible'}
    }
    let lessonResult = lsnRslt(errors)
    document.getElementById('lessonResult').className = `lessonResult ${lessonResult}`
    document.getElementById('yourResults').innerText = lessonResult
    document.getElementById('lessonTitle').innerText = `Lesson #${lessonNum}`
    async function tryAgain() {
        document.getElementById('lessonResultWrapper').style.display = 'none';
        document.getElementById('lessonResult').style.display = 'none';
        document.getElementById('tryAgain').removeEventListener('click', tryAgain);
        document.getElementById('Next').removeEventListener('click', next);
        await startLesson(lessonNum);
            }
    async function next(){
        lessonNum+=1;
        document.getElementById('lessonResultWrapper').style.display = 'none';
        document.getElementById('lessonResult').style.display = 'none';
        document.getElementById('tryAgain').removeEventListener('click', tryAgain);
        document.getElementById('Next').removeEventListener('click', next);
        await startLesson(lessonNum);

    }
    document.getElementById('tryAgain').addEventListener('click', tryAgain)
    document.getElementById('Next').addEventListener('click', next)
            


}

async function startLesson(lessonNumber) {
    if (lessonNumber <= 9) {
        document.getElementById('lessonDescription').style.display = 'none';
        document.getElementById('pressEnter').innerHTML = '';
        document.getElementById('lessonWrapper').style.display = 'block';
        
        let lessonMaterial = await fetch(`/api/lesson/get/${lessonNumber}/`, {
            method: 'Get'
        }).then((response) => {
            return response.json();
        })
        document.getElementById('onLessonInfo').innerText = lessonMaterial['info'];
        document.getElementById('onLessonInfo').style.display = 'block';
        document.getElementById('lessonWrapper').classList.remove('wrong');
        document.getElementById('lessonWrapper').classList.remove('right');
        await lessonIntro(lessonMaterial)
        await receiveMainMaterial(lessonMaterial)
        await receiveAll(lessonMaterial)
        await showLessonResult()
    }
}

document.getElementById('chooseLesson')
.addEventListener('click', event => { 
  if (event.target.className === 'lessonCell') { 
    let active = document.getElementsByClassName('activeCell')[0];
    active.classList.remove('activeCell');
    event.target.classList.add('activeCell');
  }
});

document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter' && !isBegan) {
        lessonNum = Number(document.getElementsByClassName('activeCell')[0].innerText);
        document.getElementById('chooseLesson').style.display = 'none';
        startLesson(lessonNum);
        isBegan = true;
    }
})

