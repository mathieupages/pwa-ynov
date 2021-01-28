function loadImages() {
  fetch('http://localhost:3000/paths')
    .then((resImagePaths) => {
      resImagePaths.json().then(makeGallery);
    })
    .catch(console.error);
}

window.onload = function () {
  loadImages();
};
