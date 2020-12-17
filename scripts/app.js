if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../sw.js", {
            scope: "./"
        })
        .then(function (reg) {
            console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch(function (error) {
            console.log("Registration failed with " + error);
        });

}

window.addEventListener("load", function (event) {
    const installButton = document.getElementById("install_button");

    this.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();

        installButton.addEventListener("click", (e) => {
            installButton.style.display = "none";
            event.prompt();

            event.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
            });
        });
    });
});