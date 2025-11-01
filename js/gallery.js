// Elements
let zoomed = document.getElementById('zoom');
let zoomedImg = document.getElementById('imgHover');
let captionText = document.getElementById('caption');
let descText = document.getElementById('desc');
let span = document.getElementsByClassName('close')[0];
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let i = 0;
let time = 3000;
let slideShowTimer;

// Build slides from DOM using a for loop
let thumbNodes = document.querySelectorAll('.thumb');
let slides = [];
for (let i = 0; i < thumbNodes.length; i++) {
  let imgEl = thumbNodes[i].querySelector('img');
  let descEl = thumbNodes[i].querySelector('.desc');
  slides.push({ src: imgEl.src, alt: imgEl.alt || '', desc: descEl ? descEl.innerHTML : '' });
}

let currentIndex = 0;

function render(index) {
  currentIndex = (index + slides.length) % slides.length; // wrap around
  let s = slides[currentIndex];
  zoomedImg.src = s.src;
  zoomedImg.alt = s.alt;
  captionText.textContent = s.alt;
  descText.innerHTML = s.desc;
}

// Open on thumbnail click via for loop
for (let j = 0; j < thumbNodes.length; j++) {
  let imgEl = thumbNodes[j].querySelector('img');
  imgEl.addEventListener('click', function() {
    render(j);
    zoomed.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
}
function autoScroll() {
  render(i); 
  if (i < slides.length - 1) {
    i++;
  } else {
    i = 0;
  }
  slideShowTimer = setTimeout(autoScroll, time);
}
autoScroll();
zoomedImg.addEventListener('click', () => clearTimeout(slideShowTimer));


// Controls
if (prevBtn) prevBtn.addEventListener('click', function(){ render(currentIndex - 1); });
if (nextBtn) nextBtn.addEventListener('click', function(){ render(currentIndex + 1); });

// Close
if (span) span.addEventListener('click', function(){
  zoomed.style.display = 'none';
  document.body.style.overflow = '';
});

// Keyboard navigation
document.addEventListener('keydown', function(e){
  if (zoomed.style.display !== 'block') return;
  if (e.key === 'Escape') { span && span.click(); }
  else if (e.key === 'ArrowRight') { nextBtn && nextBtn.click(); }
  else if (e.key === 'ArrowLeft') { prevBtn && prevBtn.click(); }
});



