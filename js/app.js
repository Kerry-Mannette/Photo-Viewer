// Get zoom elements
var zoomed = document.getElementById("zoom");
var zoomedImg = document.getElementById("imgHover");
var captionText = document.getElementById("caption");
var descText = document.getElementById("desc");
var span = document.getElementsByClassName("close")[0];

// Get all images inside .thumb and attach click event
var thumbs = document.querySelectorAll(".thumb img");
thumbs.forEach(function(img) {
  img.addEventListener("click", function() {
    zoomed.style.display = "block";
    zoomedImg.src = this.src;
    captionText.innerHTML = this.alt;
    descText.innerHTML = this.parentElement.querySelector(".desc").innerHTML;

  });
});

// Close zoom when clicking the close button
span.onclick = function() {
  zoomed.style.display = "none";
};