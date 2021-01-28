function initGallery() {
  fetch('http://localhost:3000/paths')
    .then((resImagePaths) => {
      resImagePaths.json().then(makeGallery);
    })
    .catch(console.error);
}

function makeGallery(paths) {
  paths.forEach((imagePath) => {
    const imgHolder = makeImageHolder(imagePath);
    const galleryImage = document.createElement('div');
    galleryImage.classList.add('gallery-image');
    galleryImage.append(imgHolder);

    document.getElementById('gallery').appendChild(galleryImage);
  });
}

function addLikedEvent(likeButton, imagePath) {
  likeButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(imagePath)}`)
      .then(subscribeLoveWithPictureNotification)
      .catch(console.error);
  });
}

function makeImageHolder(imagePath) {
  const aElement = document.createElement('a');

  aElement.classList.add('full');
  aElement.classList.add('progressive');
  aElement.classList.add('replace');

  aElement.setAttribute('href', imagePath);

  const tinyImagePath = tinyImagesPaths.filter((tinyPath) => {
    const splittedImagePath = imagePath.split('/');
    const imageName = splittedImagePath[splittedImagePath.length - 1];
    return tinyPath.includes(imageName);
  })[0];

  aElement.innerHTML = `<img src="${tinyImagePath}" class="preview" loading="lazy" width="20" height="15" alt="preview"/>`;

  const likeButton = document.createElement('button');
  likeButton.innerHTML = '❤️';
  likeButton.classList.add('img');
  likeButton.setAttribute('id', `${tinyImagePath}`);
  addLikedEvent(likeButton, tinyImagePath);

  const imgHolder = document.createElement('div');
  imgHolder.classList.add('img-holder');

  imgHolder.append(aElement);
  imgHolder.append(likeButton);
  return imgHolder;
}


