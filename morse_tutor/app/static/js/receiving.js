let isBegan = false
let alphabet = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
};
let excludedAlphabet = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
};

let TextLengthInput = document.getElementById("textLength");
let TextLengthValue = document.getElementById("textLengthValue");
let GroupSizeInput = document.getElementById("groupSize");
let GroupSizeValue = document.getElementById("groupSizeValue");

try{ if (localStorage.getItem('disableV')!= undefined){
    document.getElementById('disableV').checked = (localStorage.getItem('disableV') == 'true');}
    else { localStorage.setItem('disableV', document.getElementById('disableV').checked);}
}
catch(e){};

try{ if (localStorage.getItem('excludeDigits')!= undefined){
    document.getElementById('excludeDigits').checked = (localStorage.getItem('excludeDigits') == 'true');}
    else { localStorage.setItem('excludeDigits', document.getElementById('excludeDigits').checked);}
}
catch(e){};


try{ if (localStorage.getItem('TextLength')!= undefined){
    TextLengthInput.value = localStorage.getItem('TextLength');
    TextLengthValue.innerText = localStorage.getItem('TextLength');}
    else { localStorage.setItem('TextLength', TextLengthInput.value);
    TextLengthValue.innerText = TextLengthInput.value; }
}
catch(e){ TextLengthValue.innerText = TextLengthInput.value }

try{ if (localStorage.getItem('GroupSize')!= undefined){
    GroupSizeInput.value = localStorage.getItem('GroupSize');
    GroupSizeValue.innerText = localStorage.getItem('GroupSize');}
    else { localStorage.setItem('GroupSize', GroupSizeInput.value);
    GroupSizeValue.innerText = GroupSizeInput.value;}
}
catch(e){ GroupSizeValue.innerText = GroupSizeInput.value }

document.getElementById('disableV').addEventListener("click",function(){
    localStorage.setItem('disableV', document.getElementById('disableV').checked);
});

document.getElementById('excludeDigits').addEventListener("click",function(){
    localStorage.setItem('excludeDigits', document.getElementById('excludeDigits').checked);
});

TextLengthInput.addEventListener("input",function(){
    TextLengthValue.innerText = TextLengthInput.value;
    localStorage.setItem('TextLength',`${TextLengthInput.value}`);
});
    

GroupSizeInput.addEventListener("input",function(){
    GroupSizeValue.innerText = GroupSizeInput.value;
    localStorage.setItem('GroupSize',`${GroupSizeInput.value}`);
});      


let WPM = localStorage.getItem('WPM');
let pitch = localStorage.getItem('pitch');
let baseDotDuration = (60 * 1000) / (WPM * 50);
let context = new (window.AudioContext || window.webkitAudioContext)();

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
let sound = new Sound(context)

document.addEventListener('keydown', (event) => {
        if (event.key == 'Enter' && !isBegan) {
            receiveSessionStart(baseDotDuration,localStorage.getItem('TextLength'),localStorage.getItem('GroupSize'),document.getElementById('disableV').checked, document.getElementById('excludeDigits').checked)
            isBegan = true;
        }
})

function chooseRandom(obj) {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
};

async function receiveSessionStart(baseDotDuration, sizeOfText, sizeOfGroup,isDisableVVV,isExcludedDigits){
    document.getElementById('receiveWrapper').style.display = 'block';
    document.getElementById('pressEnter').style.display = 'none';
    document.getElementById('receiveSetting').style.display = 'none';
    document.getElementById('receiveContainer').style.display = 'block';
    await new Promise(r => setTimeout(r, 250));

    if(!isDisableVVV){
        for (let j =0;j<3;j++){
            for (let char in alphabet['v']) {
                if (alphabet['v'][char] == '-') {
                    sound.play();
                    await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                    sound.pause();
                }
                else if (alphabet['v'][char] == '.' || alphabet['v'][char] == '·') {
                    sound.play();
                    await new Promise(r => setTimeout(r, baseDotDuration));
                    sound.pause();
                }
                await new Promise(r => setTimeout(r, baseDotDuration));
            }
            await new Promise(r => setTimeout(r, 3*baseDotDuration ));
        }
    }

    let answer = new Array()
    
    if (isExcludedDigits){
        alphabet = excludedAlphabet
    }
    for (let i=0; i<sizeOfText; i++){
        if( i % sizeOfGroup == 0){
            await new Promise(r => setTimeout(r, 7*baseDotDuration));
        }
        sym = chooseRandom(alphabet)
        answer.push(sym)
        for (let char in alphabet[sym]) {
            if (alphabet[sym][char] == '-') {
                sound.play();
                await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                sound.pause();
            }
            else if (alphabet[sym][char] == '.' || alphabet[sym][char] == '·') {
                sound.play();
                await new Promise(r => setTimeout(r, baseDotDuration));
                sound.pause();
            }
            await new Promise(r => setTimeout(r, baseDotDuration));
        }
        await new Promise(r => setTimeout(r, 3*baseDotDuration ));

    }
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('checkBtn').addEventListener('click', function(){
        document.getElementById('receivingResults1').classList.add('activE');
        document.getElementById('receivingResults2').classList.add('activE');
        document.getElementById('receiveContainer').style.transform = 'translate(0, 200%)';
        document.getElementById('GoAgainDiv').style.transform = 'translate(0, 0%)';
        document.getElementById('P_receivingResults1').innerText = document.getElementById('story').value;
        document.getElementById('P_receivingResults2').innerText = answer.join('')
    })
    
}



