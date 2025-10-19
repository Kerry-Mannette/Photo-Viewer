// Elements
var zoomed = document.getElementById('zoom');
var zoomedImg = document.getElementById('imgHover');
var captionText = document.getElementById('caption');
var descText = document.getElementById('desc');
var span = document.getElementsByClassName('close')[0];
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');

// Build slides from DOM using a for loop
var thumbNodes = document.querySelectorAll('.thumb');
var slides = [];
for (var i = 0; i < thumbNodes.length; i++) {
  var imgEl = thumbNodes[i].querySelector('img');
  var descEl = thumbNodes[i].querySelector('.desc');
  slides.push({ src: imgEl.src, alt: imgEl.alt || '', desc: descEl ? descEl.innerHTML : '' });
}

var currentIndex = 0;

function render(index) {
  currentIndex = (index + slides.length) % slides.length; // wrap around
  var s = slides[currentIndex];
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
    zoomed.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
}


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

