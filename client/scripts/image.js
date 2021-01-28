window.onload = function () {
	Promise.resolve(imagePaths).then(resImagePaths => {
			resImagePaths.forEach((imagePath, index) => {
				const aElement = document.createElement("a");

				aElement.classList.add("full");
				aElement.classList.add("progressive");
				aElement.classList.add("replace");

				aElement.setAttribute("href", imagePath);

				const tinyImagePath = tinyImagesPaths.filter(
					tinyPath => {
						const splittedImagePath = imagePath.split('/');
						const imageName = splittedImagePath[splittedImagePath.length - 1];
						return tinyPath.includes(imageName);
					}
				);

				aElement.innerHTML = `<img src="${tinyImagePath[0]}" class="preview" loading="lazy" width="20" height="15" alt="preview"/>`

				const likeButton = document.createElement('button');
				likeButton.innerHTML = '♡';
				likeButton.classList.add("img");
				likeButton.setAttribute("id", `${tinyImagePath[0]}`);

				const galleryImage = document.createElement('div');
				galleryImage.classList.add("gallery-image")
				const imgHolder = document.createElement('div');
				imgHolder.classList.add("img-holder");
				
				imgHolder.append(aElement);
				imgHolder.append(likeButton);

				galleryImage.append(imgHolder);

				document.getElementById("gallery").appendChild(galleryImage);

				likeButton.addEventListener("click", () => {
					fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(tinyImagePath[0])}` )
					.then((response) => {
						console.log(response);
						navigator.serviceWorker.ready.then(
							(serviceWorkerRegistration) => {
								serviceWorkerRegistration.pushManager.subscribe(
									{
										userVisibleOnly: true,
										applicationServerKey: "BOz-y7a0En0i6slG6L-jMR6EmwTel18PAO8CLX0ECOIWeNGYo3DKXdMwN0LrmpulqE1CKl6VUMCQRW9-_7iXU8Y"//urlB64ToUint8Array(publicVapidKey)
									}
								).then(_subscription => { 
									console.log(_subscription);
									Notification.requestPermission(permission => {
										if (permission === "granted") { 
										  const notification = new Notification("You're falling in love"); 
										} 
									}); 
								});
							}
						);
					})
					.catch(console.error);
				})

				
			})
		})
		.catch(err => {
			const messageElement = document.createElement("p");
			messageElement.innerText = err;
			document.getElementById("gallery").appendChild(messageElement)
	})

	const submit = document.getElementById("subbtn");

	submit.addEventListener("click", () => {
		
		
		const myInput = document.getElementById("name").value;
		alert(myInput);
		var req = new XMLHttpRequest();
		
		req.open('POST', "http://localhost:3000/add", true);
		req.setRequestHeader("Access-Control-Allow-Headers","no-cors");
		req.send(myInput);
			
		
	})


};