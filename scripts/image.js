window.onload = function () {
	Promise.resolve(imagePaths).then(resImagePaths => {
			resImagePaths.forEach((imagePath, index) => {
				const aElement = document.createElement("a");

				aElement.classList.add("full");
				aElement.classList.add("progressive");
				aElement.classList.add("replace")
				aElement.classList.add("gallery-image")

				aElement.setAttribute("href", imagePath);

				const tinyImagePath = tinyImagesPaths.filter(
					tinyPath => {
						const splittedImagePath = imagePath.split('/');
						const imageName = splittedImagePath[splittedImagePath.length - 1];
						return tinyPath.includes(imageName);
					}
				);

				aElement.innerHTML = `<img src="${tinyImagePath[0]}" class="preview" loading="lazy" width="20" height="15"/>`
				document.getElementById("gallery").appendChild(aElement);
			})
		})
		.catch(err => {
			const messageElement = document.createElement("p");
			messageElement.innerText = err;
			document.getElementById("gallery").appendChild(messageElement)
	})
};