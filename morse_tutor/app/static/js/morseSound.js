soundIsON = false
let context = new (window.AudioContext || window.webkitAudioContext)();
let pitch = localStorage.getItem('pitch');

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

document.addEventListener("keydown", function(event) {
    if (event.key == ' '){
        event.preventDefault();
        if ( !soundIsON ){
    sound.play()
    soundIsON = true
    }
}
});
document.addEventListener("keyup", function(event) {
    if (event.key == ' '){
    sound.pause()
    soundIsON = false
    }
});

