
const form = document.querySelector(".validateForm");
const inputs = document.querySelectorAll(".validate");
const errorMessage = document.querySelector("p.fillMessage");



console.dir(form);

form.addEventListener("submit", (event) => {

    let valid = true;

    for (let input of inputs) {
        if (!input.validity.valid) {
            valid = false;
            if (input.type === "radio") {
                input.parentNode.style.border = "red 2px solid";
            }
            else {
                input.style.border = "red 2px solid";

            }

        }
        else {
            input.style.border = "green 2px solid";
        }

        input.addEventListener("input", function (event) {
            if (this.validity.valid) {
                if (this.type === "radio") {
                    this.parentNode.style.border = "none";
                }
                else {
                    this.style.border = "green 2px solid";

                }

            }
            else {
                if (this.type === "radio") {
                    this.parentNode.style.border = "red 2px solid";
                }
                else {
                    this.style.border = "red 2px solid";

                }
            }
        })

    }
    if (!valid) {
        errorMessage.style.display = "block";
        event.preventDefault();
    }

    form.addEventListener("input", (event) => {
        let valid = true;
        for (input of inputs) {
            if (!input.validity.valid) {
                valid = false;
            }
        }

        if (valid) {
            errorMessage.style.display = "none";
        }
        else {
            errorMessage.style.display = "block";
        }

    })
})