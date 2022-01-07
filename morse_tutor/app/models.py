from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(blank=False)


class Symbol(models.Model):
    symbol = models.CharField(max_length=1, unique=True)
    code = models.CharField(max_length=6)
    chant = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.symbol
"""
const alphabet = {
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
}
                <div>a-GAIN</div>
                <div>BOB-is-the-man</div>
                <div>CO-ca-CO-la</div>
                <div>DAN-ger-ous</div>
                <div>e</div>
                <div>did-you-FIND-it</div>
                <div>GREAT-GATS-by</div>
                <div>hit-hit-hit-hit</div>
                <div>did-it</div>
                <div>in-JU-LY-DAY</div>
                <div>KICK-the-DUDE</div>
                <div>los-AN-ge-les</div>
                <div>MA-MA</div>
                <div>NU-dist</div>
                <div>OH-MY-GOD</div>
                <div>a-POO-PY-smell</div>
                <div>GOD-SAVE-the-QUEEN</div>
                <div>ro-TA-tion</div>
                <div>si-si-si</div>
                <div>TALL</div>
                <div>u-ni-FORM</div>
                <div>vic-to-ri-A</div>
                <div>the-WORLD-WAR</div>
                <div>X-marks-the-SPOT</div>
                <div>WHY-did-I-DIE</div>
                <div>ZE-BRA-a-gain</div>
                <div>one-BET-TER-THAN-TWO</div>
                <div>two-on-WAY-TO-TOP</div>
                <div>three-must-be-COOL-ER</div>
                <div>four-is-not-for-YOU</div>
                <div>tra-ta-ta-ta-ta</div>
                <div>SIX-should-be-the-king</div>
                <div>GIVE-GIVE-me-the-chance</div>
                <div>EIGHT-WINS-MORE-to-day</div>
                <div>PAY-NINE-BUCKS-FOR-it</div>
                <div>THE-LONG-EST-ZE-RO</div>
"""


class Lesson(models.Model):
    info = models.TextField(blank=True)
    main_lesson_material = models.ManyToManyField(Symbol, related_name='main')
    all_lesson_material = models.ManyToManyField(Symbol, related_name='all')
