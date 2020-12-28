/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn = player.querySelector('.fullScreenBtn');


/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function goToFullScreen(e) {
  if(e.clientX === 0) return;// What is it????
  console.log(e);
  if (document.fullscreenElement) {
    player.classList.remove('toFullScreen');
    document.exitFullscreen();
  } else if (player.classList.contains('toFullScreen')) {
    player.classList.remove('toFullScreen');
  } else {
    player.requestFullscreen();
    player.classList.add('toFullScreen');
  }
}
/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', goToFullScreen);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullScreenBtn.addEventListener('click', goToFullScreen)

window.addEventListener('keydown', (e) => {
  if(e.code !== 'Space') return;
  togglePlay();
}); 



let to = 4000, ts = 0;

addEventListener('mousemove', () => {
  ts = Date.now();
  player.classList.remove('cursorOnFullScreen');
});

setInterval(() => {
  if (Date.now() - ts > to)
  player.classList.add('cursorOnFullScreen');
}, 1000)