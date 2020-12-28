const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
const button = document.querySelector('button');

function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const mix = 4;
    const height = Math.round(percent * 100) + '%';
    bar.style.height = height;

    let playbackRate = 0;
    if (percent < 0.5) {
        playbackRate = 1/((mix - 1) / 0.5 * (0.5 - percent)  + 1);
    } else playbackRate = (mix - 1) / 0.5 * (percent - 0.5) + 1;
    
    if (playbackRate < 1){
        bar.textContent = '-' + (1/playbackRate).toFixed(1) + '×'
    }else bar.textContent = playbackRate.toFixed(1) + '×';
    
    
    
    video.playbackRate = playbackRate;
    console.log(height);
  }

speed.addEventListener('mousemove', handleMove);
button.addEventListener('click', () => {
    video.playbackRate = 1;
    bar.style.height = '50%';
    bar.textContent = '1x';
});
