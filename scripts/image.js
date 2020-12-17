window.onload = function () {
	imagesPaths.forEach(imagePath => {
		var elem = document.createElement("img");
		elem.setAttribute("src", imagePath);
		elem.setAttribute("alt", imagePath);
		elem.classList.add("gallery-image");
		document.getElementById("gallery").appendChild(elem);
		elem.onload = () => {
			elem.setAttribute("width", elem.width);
			elem.setAttribute("height", elem.height);
		}
	})
};