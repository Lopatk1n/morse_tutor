let keyHolding = false;
let pressedAt = undefined;
let releasedAt = undefined;
let duration = 0;
let betweenDuration = undefined;
let context = new (window.AudioContext || window.webkitAudioContext)();
let WPM = localStorage.getItem('WPM');
let pitch = localStorage.getItem('pitch');
let baseDotDuration = (60 * 1000) / (WPM * 50);
let isBegan = false;
let sequence = [];
let symbols = [];
let input = [];
let problems = {};
let proto = undefined;
let valuee = undefined;
let symb = undefined;

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

let permissibleErrorInput = document.getElementById("permissibleError");
let permissibleErrorValue = document.getElementById("permissibleErrorValue");

try{ if (localStorage.getItem('permissibleError')!= undefined){
    permissibleErrorInput.value = localStorage.getItem('permissibleError');
    permissibleErrorValue.innerText = localStorage.getItem('permissibleError');}
    else { localStorage.setItem('permissibleError', permissibleErrorInput.value);
    permissibleErrorValue.innerText = permissibleErrorInput.value; };
}
catch(e){ permissibleErrorValue.innerText = permissibleErrorInput.value };

permissibleErrorInput.addEventListener("input",function(){
    permissibleErrorValue.innerText = permissibleErrorInput.value;
    localStorage.setItem('permissibleError',`${permissibleErrorInput.value}`);
});
let permissibleError = Number(localStorage.getItem('permissibleError'));

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

document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter' && !isBegan) {
        isBegan = true;
        document.addEventListener('keydown', function (event) {
            if (!keyHolding && event.key == ' ') {
                pressedAt = new Date().getTime();
                if (releasedAt) {
                    betweenDuration = -(releasedAt - pressedAt);
                    input.push(betweenDuration)
                }
                keyHolding = true;
                try{sound.pause();}
                catch(e){}
                sound.play();
            }
        });

        document.addEventListener('keyup', function (event) {
            if (event.key == ' ') {
                releasedAt = new Date().getTime();
                duration = releasedAt - pressedAt;
                keyHolding = false;
                sound.pause();
                input.push(duration);
            }
        });
        startTransmitting();
    };
})

function chooseRandom(obj) {
    var keys = Object.keys(obj)
    return keys[keys.length * Math.random() << 0];
};

async function startTransmitting() {

    document.getElementById('pressEnter').style.display = 'none';
    document.getElementById('lessonWrapper').style.display = 'block';
    document.getElementById('transmitingWrapper').style.display = 'block';
    document.getElementById('transmitSetting').style.display = 'none';
    setTimeout(()=>{
        document.getElementById('pressR').style.opacity = '0';
    }, 7500);
   

    async function proceed_sym(sym) {
            document.getElementById('problems').innerHTML = ''
            document.getElementById('Letter').innerText = sym.toUpperCase();
            proto = alphabet[sym];

            for (let i = 0; i < proto.length; i++) {
                if (proto[i] == '-') {
                    sequence.push(Math.round(3 * baseDotDuration));
                    symbols.push('-');
                    if (i != (proto.length - 1)) {
                        sequence.push(Math.round(baseDotDuration));
                        symbols.push(' ');
                    }
                } else if (proto[i] == '.' || proto[i] == '·') {
                    sequence.push(Math.round(baseDotDuration));
                    symbols.push('·');
                    if (i != (proto.length - 1)) {
                        sequence.push(Math.round(baseDotDuration));
                        symbols.push(' ');
                    }
                };
            };
            async function cheking() {
                if (input.length < sequence.length) {
                    setTimeout(() => { cheking() }, 10)
                } else {
                    for (let i = 0; i < sequence.length; i++) {
                        if (input[i] > sequence[i] * (1 + permissibleError) && symbols[i] == '-') {
                            valuee = 'Dits is too long';
                            if (!(Object.values(problems).includes(valuee))) {
                                problems[i] = valuee;
                            }
                        } else if (input[i] > sequence[i] * (1 + permissibleError) && symbols[i] == '·') {
                            valuee = 'Dots is too long';
                            if (!(Object.values(problems).includes(valuee))) {
                                problems[i] = valuee;
                            }
                        } else if (input[i] > sequence[i] * (1 + permissibleError) && symbols[i] == ' ') {
                            valuee = 'Spaces between is too long';
                            if (!(Object.values(problems).includes(valuee))) {
                                problems[i] = valuee;
                            }
                        } else if (input[i] < sequence[i] / (1 + permissibleError) && symbols[i] == '-') {
                            valuee = 'Dits is too short';
                            if (!(Object.values(problems).includes(valuee))) {
                                problems[i] = valuee;
                            }
                        } else if (input[i] < sequence[i] / (1 + permissibleError) && symbols[i] == '·') {
                            valuee = 'Dots is too short';
                            if (!(Object.values(problems).includes(valuee))) {
                                problems[i] = valuee;
                            }
                        } else if (input[i] < sequence[i] / (1 + permissibleError) && symbols[i] == ' ') {
                            valuee = 'Spaces between is too short';
                            if (!(Object.values(problems).includes(valuee))) {
                                problems[i] = valuee;
                            }
                        }

                    }
                    for (let problem in problems) {
                        document.getElementById('problems').innerHTML += `${problems[problem]}<br>`
                    }
                    if (Object.keys(problems).length == 0) {
                        document.getElementById('lessonWrapper').classList.add('right');
                        await new Promise(r => setTimeout(r, 800));
                    } else {
                        document.getElementById('lessonWrapper').classList.add('wrong');
                        await new Promise(r => setTimeout(r, 2200));
                    }
                    console.log(input);
                    console.log(sequence);
                    console.log(problems);
                    console.log(symbols);

                    document.getElementById('lessonWrapper').classList.remove('wrong');
                    document.getElementById('lessonWrapper').classList.remove('right');
                    pressedAt = undefined;
                    releasedAt = undefined;
                    duration = 0;
                    betweenDuration = undefined;
                    input = [];
                    sequence = [];
                    problems = {};
                    symbols = [];

                    symb = chooseRandom(alphabet);
                    await proceed_sym(symb);
                }
            }
            await cheking();
        }

    
        symb = chooseRandom(alphabet);
        document.addEventListener('keyup', (event) => {
            if (event.key == 'r' && !keyHolding) {
                async function f2(sym) {
                    for (let char in sym) {
                        if (sym[char] == '-') {
                            try{sound.pause();}
                            catch(e){}
                            sound.play();
                            await new Promise(r => setTimeout(r, 3 * baseDotDuration));
                            sound.pause();
                        }
                        else if (sym[char] == '.' ||
                            sym[char] == '·') {
                            try{sound.pause();}
                            catch(e){};
                            sound.play();
                            await new Promise(r => setTimeout(r, baseDotDuration));
                            sound.pause();
                        }
                        await new Promise(r => setTimeout(r, baseDotDuration));
                    }
                    keyHolding = false
                }
                if (keyHolding == false) {
                    f2(alphabet[symb])
                }
            }
        });
        await proceed_sym(symb)
}



