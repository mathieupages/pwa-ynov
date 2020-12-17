window.onload = function () {
	imagesPaths.forEach(imagePath => {
		const a = document.createElement("a");

		a.classList.add("full");
		a.classList.add("progressive");
		a.classList.add("replace")
		a.classList.add("gallery-image")

		a.setAttribute("href", imagePath);

		const tinyImagePath = tinyImagesPaths.filter(
			tinyPath => {
				const splittedImagePath = imagePath.split('/');
				var imageName = splittedImagePath[splittedImagePath.length - 1];
				console.log(imageName);
				return tinyPath.includes(imageName);
			}
		);

		a.innerHTML = `<img src="${tinyImagePath[0]}" class="preview" loading="lazy" width="20" height="15" alt="squirrel" />`

		document.getElementById("gallery").appendChild(a);
	})
};