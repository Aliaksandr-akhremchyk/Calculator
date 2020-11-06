function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

function playSound(e) {
    let audio, key;
    if (e.type == "click") {
        try {
            e.target.attributes["data-key"].value;
        } catch (err) {
            return;
        }
        audio = document.querySelector(`audio[data-key="${e.target.attributes["data-key"].value}"]`);
        key = document.querySelector(`div[data-key="${e.target.attributes["data-key"].value}"]`);
    } else {
        audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    }
        
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  
 window.addEventListener('keydown', playSound);
 window.addEventListener("click", playSound);