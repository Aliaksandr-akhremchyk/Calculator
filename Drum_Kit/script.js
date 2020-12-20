function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

function playSound(e) {
    const dataKey = (e.target.dataset.key) ? e.target.dataset.key : e.keyCode;
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    const key = document.querySelector(`div[data-key="${dataKey}"]`);
        
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  
 window.addEventListener('keydown', playSound);
 window.addEventListener("click", playSound);