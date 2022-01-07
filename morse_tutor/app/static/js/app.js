let data = {
    phrase : "Are you interested in learning Morse code or imrove your skill ? You are at the right place !!".split(''),
    curPhraceLength : 0,
    phraseCompleted: false,
    }
if ( typeof userName !== "undefined" ){
    data.phrase = `Welcome, ${userName}!!`
}
function changePhrase () { if(!data.phraseCompleted){
    document.getElementById('phrase').innerHTML += data.phrase[data.curPhraceLength];
    data.curPhraceLength+= 1;        
    data.phraseCompleted = ((data.curPhraceLength + 1 ) == data.phrase.length );
    setTimeout(()=>{ changePhrase() }, 37)}
    else{
        setTimeout(()=>{ document.getElementById('phrase').style = 'opacity: 0'}, 2000);
        data.curPhraceLength = 0;
     }}

try{
    changePhrase()
} catch(e){ }
